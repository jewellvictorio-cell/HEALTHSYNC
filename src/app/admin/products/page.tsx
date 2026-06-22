"use client"

import * as React from "react"
import Image from "next/image"
import { getProducts, addProduct, updateProduct, deleteProduct, PRODUCT_CATEGORIES, type Product } from "@/lib/store"
import { Plus, Pencil, Trash2, X, Check, Package, Search, Filter, Upload, FileText } from "lucide-react"

const EMPTY: Omit<Product, "id"> = { name: "", description: "", image: "", category: PRODUCT_CATEGORIES[0], brochure: "" }

function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-secondary/20 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
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

export default function AdminProductsPage() {
  const [products,  setProducts]  = React.useState<Product[]>([])
  const [form,      setForm]      = React.useState(EMPTY)
  const [editing,   setEditing]   = React.useState<Product | null>(null)
  const [showForm,  setShowForm]  = React.useState(false)
  const [deleteId,  setDeleteId]  = React.useState<string | null>(null)
  const [search,    setSearch]    = React.useState("")
  const [catFilter, setCatFilter] = React.useState("All")
  const [imgError,  setImgError]  = React.useState(false)

  function reload() { setProducts(getProducts()) }
  React.useEffect(reload, [])

  const displayed = products.filter(p => {
    const matchCat = catFilter === "All" || p.category === catFilter
    const matchQ   = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  function openAdd()            { setEditing(null); setForm(EMPTY); setImgError(false); setShowForm(true) }
  function openEdit(p: Product) { setEditing(p); setForm({ name: p.name, description: p.description, image: p.image, category: p.category, brochure: p.brochure || "" }); setImgError(false); setShowForm(true) }
  function handleSave() {
    if (!form.name.trim()) return
    const success = editing ? updateProduct({ ...editing, ...form }) : addProduct(form)
    if (success !== false) {
      setShowForm(false)
      reload()
    }
  }
  function handleDelete(id: string) { deleteProduct(id); setDeleteId(null); reload() }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let { width, height } = img
        const max = 800
        if (width > height && width > max) { height *= max / width; width = max }
        else if (height > max) { width *= max / height; height = max }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8) // Compress to 80% JPEG
        setForm(prev => ({ ...prev, image: dataUrl }))
        setImgError(false)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  function handleBrochureUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, brochure: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-headline font-bold text-secondary">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the product catalog displayed on the Products page.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-primary appearance-none cursor-pointer transition-all font-body"
          >
            <option value="All">All Categories</option>
            {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{displayed.length} of {products.length} products</p>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((p, i) => (
          <div key={p.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300 group animate-in fade-in zoom-in-95 fill-mode-both" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="relative h-36 bg-muted">
              {p.image ? (
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="h-10 w-10 text-muted-foreground/20" />
                </div>
              )}
            </div>
            <div className="p-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md mb-2">{p.category}</span>
              <h3 className="font-headline font-semibold text-secondary text-sm line-clamp-1">{p.name}</h3>
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary text-xs font-semibold py-1.5 rounded-lg transition-all border border-border hover:border-primary/30">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => setDeleteId(p.id)} className="flex-1 flex items-center justify-center gap-1 bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs font-semibold py-1.5 rounded-lg transition-all border border-border hover:border-destructive/30">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-20 bg-card border-2 border-dashed border-border rounded-2xl">
          <Package className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-semibold text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <AdminModal title={editing ? "Edit Product" : "Add Product"} onClose={() => setShowForm(false)}>
          <div className="px-6 py-5 space-y-4">
            {form.image && !imgError && (
              <div className="relative h-36 rounded-xl overflow-hidden border border-border">
                <Image src={form.image} alt="Preview" fill className="object-cover" unoptimized onError={() => setImgError(true)} />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Product Name <span className="text-destructive">*</span></label>
              <input
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Patient Monitor"
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Product Photo</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center justify-center gap-2 w-full bg-muted border border-input border-dashed rounded-xl px-4 py-3 text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:border-primary/50 transition-colors font-body relative overflow-hidden">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm font-semibold">{form.image ? "Change Photo" : "Upload Photo"}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the product"
                rows={3}
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
              />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Category <span className="text-destructive">*</span></label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body">
                  {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Product Brochure (PDF)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleBrochureUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center justify-center gap-2 w-full bg-muted border border-input border-dashed rounded-xl px-4 py-2.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:border-primary/50 transition-colors font-body relative overflow-hidden">
                    {form.brochure ? <Check className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4" />}
                    <span className="text-sm font-semibold truncate px-2">{form.brochure ? "Brochure Attached" : "Upload PDF"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button onClick={() => setShowForm(false)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-xl transition-all text-sm border border-border">Cancel</button>
            <button onClick={handleSave} disabled={!form.name.trim()} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20">
              <Check className="h-4 w-4" /> {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <AdminModal title="Remove Product?" onClose={() => setDeleteId(null)}>
          <div className="px-6 py-5 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-muted-foreground text-sm">This will permanently remove the product from the catalog.</p>
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
