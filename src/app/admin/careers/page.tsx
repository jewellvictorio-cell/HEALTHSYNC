"use client"

import * as React from "react"
import { getJobs, addJob, updateJob, deleteJob, type Job } from "@/lib/store"
import { Plus, Pencil, Trash2, X, Check, Briefcase, MapPin, Calendar } from "lucide-react"

const today = new Date().toISOString().split("T")[0]

const EMPTY: Omit<Job, "id"> = {
  title: "", location: "", type: "Full-time",
  postedDate: today, shortDescription: "", longDescription: ""
}

function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl shadow-secondary/20 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
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

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
      {children} {required && <span className="text-destructive">*</span>}
    </label>
  )
}

function AdminInput({ value, onChange, placeholder, type = "text", className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body ${className}`}
    />
  )
}

export default function AdminCareersPage() {
  const [jobs,     setJobs]     = React.useState<Job[]>([])
  const [form,     setForm]     = React.useState(EMPTY)
  const [editing,  setEditing]  = React.useState<Job | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  function reload() { setJobs(getJobs()) }
  React.useEffect(reload, [])

  function openAdd() { setEditing(null); setForm({ ...EMPTY, postedDate: today }); setShowForm(true) }
  function openEdit(j: Job) {
    setEditing(j)
    setForm({ title: j.title, location: j.location, type: j.type, postedDate: j.postedDate, shortDescription: j.shortDescription, longDescription: j.longDescription })
    setShowForm(true)
  }
  function handleSave() {
    if (!form.title.trim() || !form.shortDescription.trim()) return
    editing ? updateJob({ ...editing, ...form }) : addJob(form)
    setShowForm(false); reload()
  }
  function handleDelete(id: string) { deleteJob(id); setDeleteId(null); reload() }

  function formatDate(d: string) {
    try { return new Date(d).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" }) } catch { return d }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-headline font-bold text-secondary">Career Postings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage job openings displayed on the Careers page.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" /> Post a Job
        </button>
      </div>

      {/* Job List */}
      <div className="space-y-3">
        {jobs.map((j, i) => (
          <div key={j.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="font-headline font-bold text-secondary text-lg">{j.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${j.type === "Full-time" ? "bg-accent/20 text-primary" : "bg-primary/10 text-primary"}`}>
                    {j.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-muted-foreground font-medium text-xs mb-3">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> {j.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-primary" /> {formatDate(j.postedDate)}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{j.shortDescription}</p>
              </div>
              <div className="flex gap-2 shrink-0 self-start mt-1">
                <button onClick={() => openEdit(j)} className="flex items-center gap-1.5 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-border hover:border-primary/30">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteId(j.id)} className="flex items-center gap-1.5 bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-border hover:border-destructive/30">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-20 bg-card border-2 border-dashed border-border rounded-2xl">
          <Briefcase className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-semibold text-muted-foreground">No job postings yet.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Post your first job opening to attract candidates.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <AdminModal title={editing ? "Edit Job Posting" : "Post a New Job"} onClose={() => setShowForm(false)}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel required>Job Title</FieldLabel>
                <AdminInput value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Biomedical Technician" />
              </div>
              <div>
                <FieldLabel required>Location</FieldLabel>
                <AdminInput value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="e.g. Binangonan, Rizal" />
              </div>
              <div>
                <FieldLabel>Employment Type</FieldLabel>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Job["type"] }))} className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body appearance-none cursor-pointer">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
              <div>
                <FieldLabel>Posted Date</FieldLabel>
                <AdminInput type="date" value={form.postedDate} onChange={v => setForm(f => ({ ...f, postedDate: v }))} />
              </div>
            </div>
            <div>
              <FieldLabel required>Short Description</FieldLabel>
              <textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} placeholder="Brief summary shown on the job card (1–2 sentences)." rows={2} className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none" />
            </div>
            <div>
              <FieldLabel>Full Job Description</FieldLabel>
              <p className="text-muted-foreground/60 text-xs mb-2 mt-0.5">Shown in the "View Details" modal. Include responsibilities, qualifications, etc.</p>
              <textarea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} placeholder="Detailed job description, responsibilities, qualifications..." rows={8} className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-y" />
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setShowForm(false)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={handleSave} disabled={!form.title.trim() || !form.shortDescription.trim()} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20">
              <Check className="h-4 w-4" /> {editing ? "Save Changes" : "Post Job"}
            </button>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <AdminModal title="Delete Job Posting?" onClose={() => setDeleteId(null)}>
          <div className="px-6 py-5 text-center">
             <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-muted-foreground text-sm">This will remove the job from the Careers page permanently.</p>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setDeleteId(null)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Delete</button>
          </div>
        </AdminModal>
      )}
    </div>
  )
}
