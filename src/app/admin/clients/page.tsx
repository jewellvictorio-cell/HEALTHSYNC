"use client"

import * as React from "react"
import {
  getClients, addClient, updateClient, deleteClient,
  type HospitalClient
} from "@/lib/store"
import { Plus, Pencil, Trash2, X, Check, Building2, Landmark } from "lucide-react"

type Tab = "government" | "private"

function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-sm shadow-2xl shadow-secondary/20 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
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
  const [clients,   setClients]   = React.useState<HospitalClient[]>([])
  const [activeTab, setActiveTab] = React.useState<Tab>("government")
  const [editId,    setEditId]    = React.useState<string | null>(null)
  const [editName,  setEditName]  = React.useState("")
  const [newName,   setNewName]   = React.useState("")
  const [deleteId,  setDeleteId]  = React.useState<string | null>(null)
  const [adding,    setAdding]    = React.useState(false)

  function reload() { setClients(getClients()) }
  React.useEffect(reload, [])

  const govClients  = clients.filter(c => c.type === "government")
  const privClients = clients.filter(c => c.type === "private")
  const displayed   = activeTab === "government" ? govClients : privClients

  function startEdit(c: HospitalClient) { setEditId(c.id); setEditName(c.name) }
  function saveEdit() {
    if (!editName.trim() || !editId) return
    updateClient({ id: editId, name: editName.trim(), type: clients.find(c => c.id === editId)!.type })
    setEditId(null); reload()
  }
  function handleAdd() {
    if (!newName.trim()) return
    addClient({ name: newName.trim(), type: activeTab })
    setNewName(""); setAdding(false); reload()
  }
  function handleDelete(id: string) { deleteClient(id); setDeleteId(null); reload() }

  const tabs: { key: Tab; label: string; icon: typeof Landmark; count: number }[] = [
    { key: "government", label: "Government Hospitals", icon: Landmark,  count: govClients.length },
    { key: "private",    label: "Private Hospitals",    icon: Building2, count: privClients.length },
  ]

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-headline font-bold text-secondary">Hospital Clients</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage the hospital partner lists shown on the Clients page.</p>
      </div>

      {/* Stat pills */}
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {tabs.map((t, i) => (
          <div key={t.key} className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 flex-1 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? "bg-primary/10" : "bg-accent/20"}`}>
               <t.icon className={`h-5 w-5 ${i === 0 ? "text-primary" : "text-primary"}`} />
             </div>
             <div>
               <p className="font-headline font-bold text-secondary text-2xl leading-none">{t.count}</p>
               <p className="text-muted-foreground text-xs font-semibold mt-1 uppercase tracking-wider">{t.label}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-muted border border-border rounded-xl p-1 w-fit animate-in fade-in duration-500 delay-100">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); setAdding(false); setEditId(null) }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === t.key ? "bg-card text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"}`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* Add form toggle */}
      <div className="animate-in fade-in duration-500 delay-200">
        {adding ? (
          <div className="flex gap-2 max-w-md">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") { setAdding(false); setNewName("") } }}
              placeholder={`Enter ${activeTab} hospital name…`}
              autoFocus
              className="flex-1 bg-card border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body shadow-sm"
            />
            <button onClick={handleAdd} disabled={!newName.trim()} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-sm">
              <Check className="h-4 w-4" /> Add
            </button>
            <button onClick={() => { setAdding(false); setNewName("") }} className="bg-muted hover:bg-muted/80 border border-border text-foreground px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" /> Add {activeTab === "government" ? "Government" : "Private"} Hospital
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2 animate-in fade-in duration-500 delay-300">
        {displayed.map((c, i) => (
          <div key={c.id} className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-3.5 hover:border-primary/30 hover:shadow-sm transition-all group fill-mode-both animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 30}ms` }}>
            <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${activeTab === "government" ? "bg-primary" : "bg-accent"}`} />

            {editId === c.id ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditId(null) }}
                  autoFocus
                  className="flex-1 bg-muted border border-primary rounded-lg px-3 py-1.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/20 font-body"
                />
                <button onClick={saveEdit} className="text-primary hover:text-primary/80 transition-colors bg-primary/10 p-1.5 rounded-md"><Check className="h-4 w-4" /></button>
                <button onClick={() => setEditId(null)} className="text-muted-foreground hover:text-foreground transition-colors bg-muted p-1.5 rounded-md border border-border"><X className="h-4 w-4" /></button>
              </>
            ) : (
              <>
                <span className="flex-1 text-secondary text-sm font-semibold">{c.name}</span>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(c)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 rounded-lg transition-all"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDeleteId(c.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 rounded-lg transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-16 bg-card border-2 border-dashed border-border rounded-2xl">
          <Building2 className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="font-semibold text-muted-foreground">No {activeTab} hospitals yet.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Add your first partner to display them on the site.</p>
        </div>
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
    </div>
  )
}
