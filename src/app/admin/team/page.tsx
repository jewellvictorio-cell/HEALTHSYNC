"use client"

import * as React from "react"
import Image from "next/image"
import { getTeam, addTeamMember, updateTeamMember, deleteTeamMember, type TeamMember } from "@/lib/store"
import { Plus, Pencil, Trash2, X, Check, User, Upload, Eye } from "lucide-react"
import AdminImageCropper from "@/components/admin/AdminImageCropper"
import { supabase } from "@/lib/supabase"

const EMPTY: Omit<TeamMember, "id"> = { name: "", role: "", photo: "", email: "", password: "" }

function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl shadow-secondary/20 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-headline font-bold text-secondary">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
      {children} {required && <span className="text-destructive">*</span>}
    </label>
  )
}

function AdminInput({ value, onChange, placeholder, className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body ${className}`}
    />
  )
}

export default function AdminTeamPage() {
  const [members,  setMembers]  = React.useState<TeamMember[]>([])
  const [form,     setForm]     = React.useState(EMPTY)
  const [editing,  setEditing]  = React.useState<TeamMember | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [imgError, setImgError] = React.useState(false)
  const [cropImageSrc, setCropImageSrc] = React.useState<string | null>(null)

  function reload() { getTeam().then(setMembers) }
  React.useEffect(reload, [])

  function openAdd()          { setEditing(null); setForm(EMPTY); setImgError(false); setShowForm(true) }
  function openEdit(m: TeamMember) { setEditing(m); setForm({ name: m.name, role: m.role, photo: m.photo, email: m.email || "", password: m.password || "" }); setImgError(false); setShowForm(true) }
  async function handleSave() {
    if (!form.name.trim() || !form.role.trim()) return
    const success = editing ? await updateTeamMember({ ...editing, ...form }) : await addTeamMember(form)
    if (success) {
      setShowForm(false)
      reload()
    }
  }
  async function handleDelete(id: string) { await deleteTeamMember(id); setDeleteId(null); reload() }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setCropImageSrc(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  async function handleSaveCrop(croppedBlob: Blob) {
    // Ensure bucket env variable is set
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;
    if (!bucket) {
      console.error('Supabase storage bucket not configured');
      // Fallback: use base64 preview without uploading
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(croppedBlob);
      });
      setForm(prev => ({ ...prev, photo: base64 }));
      setImgError(false);
      setCropImageSrc(null);
      return;
    }

    try {
      const fileName = `team/${Date.now()}.jpg`;
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, croppedBlob, {
        contentType: 'image/jpeg',
      });

      if (error) {
        console.error('Supabase upload error:', error);
        // Fallback to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(croppedBlob);
        });
        setForm(prev => ({ ...prev, photo: base64 }));
      } else {
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
        console.log('Supabase upload successful! Public URL:', urlData.publicUrl);
        setForm(prev => ({ ...prev, photo: urlData.publicUrl }));
      }
    } catch (e) {
      console.error('Unexpected error during image upload:', e);
      // Fallback to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(croppedBlob);
      });
      setForm(prev => ({ ...prev, photo: base64 }));
    }

    setImgError(false);
    setCropImageSrc(null);
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-headline font-bold text-secondary">Management & Leadership</h1>
          <p className="text-muted-foreground text-sm mt-1">Team members shown on the About Us page.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <div key={m.id} className="bg-card border border-border rounded-2xl overflow-visible group hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both relative" style={{ animationDelay: `${i * 60}ms` }}>
            
            {/* Tooltip Hover Box */}
            {m.email && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-50 w-64 p-4 bg-[#0b0f24] border border-[#226b6b]/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none">
                <div className="text-[10px] text-[#226b6b] font-bold uppercase tracking-widest mb-1.5">User Login Details</div>
                <div className="mb-3">
                  <div className="text-xs text-white/50 mb-0.5">Email Address</div>
                  <div className="text-sm text-white font-medium break-all">{m.email}</div>
                </div>
                {m.password && (
                  <div>
                    <div className="text-xs text-white/50 mb-0.5">Password</div>
                    <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-lg p-2 pointer-events-auto group/pw cursor-pointer hover:bg-black/60 transition-colors">
                      <span className="text-sm text-white/70 font-mono tracking-[0.2em] group-hover/pw:hidden">••••••••</span>
                      <span className="text-sm text-white font-mono hidden group-hover/pw:inline-block tracking-normal">{m.password}</span>
                      <Eye className="h-4 w-4 text-white/40 group-hover/pw:text-[#226b6b] transition-colors" />
                    </div>
                  </div>
                )}
                {/* Tooltip Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-[#0b0f24] border-r border-b border-[#226b6b]/50 rotate-45" />
              </div>
            )}

            <div className="relative h-44 bg-muted overflow-hidden rounded-t-2xl">
              {m.photo ? (
                <Image src={m.photo} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <User className="h-16 w-16 text-muted-foreground/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-headline font-bold text-secondary">{m.name}</h3>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mt-0.5">{m.role}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(m)} className="flex-1 flex items-center justify-center gap-1.5 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary text-xs font-semibold py-2 rounded-lg transition-all border border-border hover:border-primary/30">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteId(m.id)} className="flex-1 flex items-center justify-center gap-1.5 bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs font-semibold py-2 rounded-lg transition-all border border-border hover:border-destructive/30">
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-20 bg-card border-2 border-dashed border-border rounded-2xl">
          <User className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-semibold text-muted-foreground">No team members yet</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Add your first team member to get started.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <AdminModal title={editing ? "Edit Member" : "Add Team Member"} onClose={() => setShowForm(false)}>
          <div className="px-6 py-5 space-y-4">
            {form.photo && (
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl border border-border">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden border-2 border-border shrink-0 bg-background flex items-center justify-center">
                  {!imgError ? (
                    <Image src={form.photo} alt="Preview" fill className="object-cover" unoptimized onError={() => { console.error('Image failed to load:', form.photo); setImgError(true); }} />
                  ) : (
                    <div className="text-xs text-destructive text-center p-1 font-semibold leading-tight">Image Load Error</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground/70">Photo Preview</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{imgError ? "Check if Supabase bucket is public." : "Upload a new photo to replace this."}</p>
                </div>
              </div>
            )}
            <div><FieldLabel required>Full Name</FieldLabel><AdminInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. Juan Dela Cruz" /></div>
            <div><FieldLabel required>Job Position</FieldLabel><AdminInput value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} placeholder="e.g. Chief Executive Officer" /></div>
            <div>
              <FieldLabel>Profile Photo</FieldLabel>
              <div className="relative mt-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center justify-center gap-2 w-full bg-muted border border-input border-dashed rounded-xl px-4 py-3 text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:border-primary/50 transition-colors font-body relative overflow-hidden">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm font-semibold">{form.photo ? "Change Photo" : "Upload Photo"}</span>
                </div>
              </div>
              <p className="text-muted-foreground/60 text-xs mt-2">Leave blank to show a placeholder avatar.</p>
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setShowForm(false)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={handleSave} disabled={!form.name.trim() || !form.role.trim()} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20">
              <Check className="h-4 w-4" /> {editing ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </AdminModal>
      )}

      {/* Crop Modal */}
      {cropImageSrc && (
        <AdminImageCropper
          src={cropImageSrc}
          onComplete={handleSaveCrop}
          onCancel={() => setCropImageSrc(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <AdminModal title="Remove Member?" onClose={() => setDeleteId(null)}>
          <div className="px-6 py-5 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-muted-foreground text-sm">This will remove the member from the About Us page. This action cannot be undone.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setDeleteId(null)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">Remove</button>
          </div>
        </AdminModal>
      )}
    </div>
  )
}
