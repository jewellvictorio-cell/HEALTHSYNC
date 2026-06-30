"use client"

import * as React from "react"
import { getFooterSettings, saveFooterSettings, type FooterSettings } from "@/lib/store"
import { useToast } from "@/components/admin/AdminToast"
import { Check, Loader2 } from "lucide-react"

export default function AdminFooterPage() {
  const [form, setForm] = React.useState<FooterSettings>({ address: "", phone: "", email: "" })
  const [saving, setSaving] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    setForm(getFooterSettings())
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.address.trim() || !form.phone.trim() || !form.email.trim()) return

    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    const success = saveFooterSettings(form)
    setSaving(false)

    if (success) {
      toast("Footer details successfully saved!")
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-headline font-bold text-secondary">Footer Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Customize the contact and location details displayed on the website's footer.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                Location / Office Address <span className="text-destructive">*</span>
              </label>
              <textarea
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                placeholder="e.g. Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines"
                rows={3}
                required
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                Contact Number <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="e.g. +63 915 392 5794"
                required
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="e.g. healthsync.med@gmail.com"
                required
                className="w-full bg-muted border border-input rounded-xl px-4 py-2.5 text-foreground text-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-border pt-5">
            <button
              type="submit"
              disabled={saving || !form.address.trim() || !form.phone.trim() || !form.email.trim()}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 shadow-lg shadow-primary/20"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
