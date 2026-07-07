"use client"

import * as React from "react"
import {
  addClient, updateClient, deleteClient, saveClients,
  type HospitalClient
} from "@/lib/store"
import { useClients } from "@/lib/useStore"
import { Plus, Pencil, Trash2, X, Check, Building2, Landmark, Image as ImageIcon, Loader2 } from "lucide-react"
import { useToast } from "@/components/admin/AdminToast"
import { AdminImageCropper, ImageUploadButton } from "@/components/admin/AdminImageCropper"
import Image from "next/image"

const EMPTY: { name: string; logo: string; type: "government" | "private" } = { name: "", logo: "", type: "private" }

function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl shadow-secondary/20 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-headline font-bold text-secondary">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function AdminClientsPage() {
  const clients = useClients()
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  
  // Add/Edit states
  const [showForm, setShowForm] = React.useState(false)
  const [editing, setEditing] = React.useState<HospitalClient | null>(null)
  const [form, setForm] = React.useState(EMPTY)
  const [cropSrc, setCropSrc] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  // Selection states
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = React.useState(false)
  const [deletingBulk, setDeletingBulk] = React.useState(false)

  const { toast } = useToast()

  const allSelected = clients.length > 0 && clients.every(c => selectedIds.includes(c.id))

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(clients.map(c => c.id))
    }
  }

  function openAdd() {
    setEditing(null)
    setForm({ name: "", logo: "", type: "private" })
    setShowForm(true)
  }

  function openEdit(c: HospitalClient) {
    setEditing(c)
    setForm({ name: c.name, logo: c.logo || "", type: c.type })
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) return
    setSaving(true)
    const success = editing 
      ? await updateClient({ ...editing, ...form }) 
      : await addClient(form)
    setSaving(false)
    if (success !== null && success !== false) {
      setShowForm(false)
      toast("Client data successfully saved!")
    }
  }

  async function handleDelete(id: string) {
    await deleteClient(id)
    setSelectedIds(prev => prev.filter(x => x !== id))
    setDeleteId(null)
    toast("Hospital client removed.", "error")
  }

  async function handleBulkDelete() {
    setDeletingBulk(true)
    const remaining = clients.filter(c => !selectedIds.includes(c.id))
    await saveClients(remaining)
    setSelectedIds([])
    setDeletingBulk(false)
    setBulkDeleteConfirm(false)
    toast("Selected clients removed.")
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-headline font-bold text-secondary">Clients & Partners</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the client and partner logo lists shown on the Clients page.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> Add Client/Partner
        </button>
      </div>

      {/* Stat pill */}
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 flex-1 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
           <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
             <Building2 className="h-5 w-5 text-primary" />
           </div>
           <div>
             <p className="font-headline font-bold text-secondary text-2xl leading-none">{clients.length}</p>
             <p className="text-muted-foreground text-xs font-semibold mt-1 uppercase tracking-wider">Total Clients & Partners</p>
           </div>
        </div>
      </div>

      {/* Selection / Bulk Actions Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-muted/50 border border-border p-4 rounded-xl animate-in fade-in duration-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="select-all-clients"
            checked={clients.length > 0 && allSelected}
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="select-all-clients" className="text-xs font-semibold text-secondary select-none cursor-pointer">
            Select All Displayed ({clients.length})
          </label>
          {selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-primary hover:underline font-bold ml-2"
            >
              Unselect All ({selectedIds.length})
            </button>
          )}
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={() => setBulkDeleteConfirm(true)}
            className="flex items-center gap-1.5 bg-destructive hover:bg-destructive/95 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all hover:scale-[1.02] shadow-md shadow-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2 animate-in fade-in duration-500 delay-100">
        {clients.map((c, i) => (
          <div key={c.id} className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-3 hover:border-primary/30 hover:shadow-sm transition-all group fill-mode-both animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 30}ms` }}>
            {/* Selection Checkbox */}
            <input
              type="checkbox"
              checked={selectedIds.includes(c.id)}
              onChange={() => {
                setSelectedIds(prev =>
                  prev.includes(c.id)
                    ? prev.filter(id => id !== c.id)
                    : [...prev, c.id]
                )
              }}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
            />

            {/* Logo Preview */}
            <div className="relative w-10 h-10 rounded-lg border border-border/80 bg-muted overflow-hidden flex items-center justify-center shrink-0">
              {c.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={c.logo} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-5 w-5 text-muted-foreground/30" />
              )}
            </div>

            <span className="flex-1 text-secondary text-sm font-semibold truncate">{c.name}</span>

            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(c)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 rounded-lg transition-all"><Pencil className="h-3.5 w-3.5" /></button>
              <button onClick={() => setDeleteId(c.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 rounded-lg transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-16 bg-card border-2 border-dashed border-border rounded-2xl">
          <Building2 className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="font-semibold text-muted-foreground">No client partners yet.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Add your first partner to display them on the site.</p>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showForm && (
        <AdminModal title={editing ? "Edit Client/Partner" : "Add Client/Partner"} onClose={() => setShowForm(false)}>
          <div className="px-6 py-5 space-y-4">
            {form.logo && (
              <div className="relative h-28 w-28 mx-auto rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.logo} alt="Logo preview" className="max-h-full max-w-full object-contain p-2" />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5 font-headline">Client Name <span className="text-destructive">*</span></label>
              <input
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Antipolo City Hospital System"
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5 font-headline">Hospital/Partner Logo</label>
              <ImageUploadButton
                hasImage={!!form.logo}
                onFileSelected={setCropSrc}
              />
              <p className="text-xs text-muted-foreground/60 mt-1.5 font-body">Upload client logos so they wrap in our landing page grid.</p>
            </div>
          </div>

          <div className="flex gap-3 px-6 pb-6 border-t border-border/40 pt-4">
            <button onClick={() => setShowForm(false)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button 
              onClick={handleSave} 
              disabled={!form.name.trim() || saving} 
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {saving ? "Saving…" : (editing ? "Save Changes" : "Add Client")}
            </button>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <AdminModal title="Remove Hospital?" onClose={() => setDeleteId(null)}>
          <div className="px-6 py-5 text-center">
             <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-muted-foreground text-sm">This will remove it from the Clients page. This action cannot be undone.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setDeleteId(null)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Remove</button>
          </div>
        </AdminModal>
      )}

      {/* Bulk Delete Confirm */}
      {bulkDeleteConfirm && (
        <AdminModal title="Remove Selected Clients?" onClose={() => setBulkDeleteConfirm(false)}>
          <div className="px-6 py-5 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-secondary font-bold text-base mb-1 font-headline">Remove {selectedIds.length} Clients?</p>
            <p className="text-muted-foreground text-sm font-body">This will permanently remove the selected clients from the catalog.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setBulkDeleteConfirm(false)} disabled={deletingBulk} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border disabled:opacity-40">Cancel</button>
            <button onClick={handleBulkDelete} disabled={deletingBulk} className="flex-1 bg-destructive hover:bg-destructive/95 text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-40 flex items-center justify-center gap-1.5">
              {deletingBulk && <Loader2 className="h-4 w-4 animate-spin" />}
              {deletingBulk ? "Removing..." : "Remove Clients"}
            </button>
          </div>
        </AdminModal>
      )}

      {/* Image Cropper */}
      {cropSrc && (
        <AdminImageCropper
          imageSrc={cropSrc}
          title="Crop Hospital/Partner Logo"
          onSave={(b64) => { setForm(f => ({ ...f, logo: b64 })); setCropSrc(null) }}
          onCancel={() => setCropSrc(null)}
        />
      )}
    </div>
  )
}
