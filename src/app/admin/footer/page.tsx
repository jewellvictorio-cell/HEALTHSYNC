"use client"

import * as React from "react"
import { getFooterSettings, saveFooterSettings, type FooterSettings } from "@/lib/store"
import { useToast } from "@/components/admin/AdminToast"
import { Check, Loader2, Plus, X, Phone, Mail, MapPin } from "lucide-react"

// ── Small reusable component for a dynamic list field ──────────────────────────
function DynamicListField({
  label,
  icon: Icon,
  items,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string
  icon: React.ElementType
  items: string[]
  placeholder: string
  type?: string
  onChange: (items: string[]) => void
}) {
  function updateItem(idx: number, val: string) {
    const next = [...items]
    next[idx] = val
    onChange(next)
  }

  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx))
  }

  function addItem() {
    onChange([...items, ""])
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground/80">
        {label} <span className="text-destructive">*</span>
      </label>

      <div className="space-y-2">
        {items.map((val, idx) => (
          <div key={idx} className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2 flex-1 bg-muted border border-input rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type={type}
                value={val}
                onChange={e => updateItem(idx, e.target.value)}
                placeholder={placeholder}
                required={idx === 0}
                className="flex-1 bg-transparent text-foreground text-sm placeholder-muted-foreground outline-none font-body min-w-0"
              />
            </div>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all shrink-0"
                aria-label="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-1"
      >
        <Plus className="h-3.5 w-3.5" />
        Add {label}
      </button>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AdminFooterPage() {
  const [form, setForm] = React.useState<FooterSettings>({
    address: "",
    phones: [""],
    emails: [""],
  })
  const [saving, setSaving] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    const s = getFooterSettings()
    setForm({
      address: s.address,
      phones: s.phones?.length ? s.phones : [""],
      emails: s.emails?.length ? s.emails : [""],
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const cleanPhones = form.phones.filter(p => p.trim())
    const cleanEmails = form.emails.filter(e => e.trim())

    if (!form.address.trim() || cleanPhones.length === 0 || cleanEmails.length === 0) return

    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    const success = saveFooterSettings({ ...form, phones: cleanPhones, emails: cleanEmails })
    setSaving(false)

    if (success) toast("Footer details successfully saved!")
  }

  const isValid =
    form.address.trim() &&
    form.phones.some(p => p.trim()) &&
    form.emails.some(e => e.trim())

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-headline font-bold text-secondary">Footer Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Customize the contact and location details displayed on the website's footer.
          You can add multiple phone numbers and email addresses.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-5">

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground/80">
                Location / Office Address <span className="text-destructive">*</span>
              </label>
              <div className="flex items-start gap-2 bg-muted border border-input rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <textarea
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="e.g. Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines"
                  rows={3}
                  required
                  className="flex-1 bg-transparent text-foreground text-sm placeholder-muted-foreground outline-none font-body resize-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Phones */}
            <DynamicListField
              label="Contact Number"
              icon={Phone}
              items={form.phones}
              placeholder="e.g. +63 915 392 5794"
              type="tel"
              onChange={phones => setForm(f => ({ ...f, phones }))}
            />

            {/* Emails */}
            <DynamicListField
              label="Email Address"
              icon={Mail}
              items={form.emails}
              placeholder="e.g. healthsync.med@gmail.com"
              type="email"
              onChange={emails => setForm(f => ({ ...f, emails }))}
            />
          </div>

          {/* Preview panel */}
          {(form.phones.some(p => p.trim()) || form.emails.some(e => e.trim())) && (
            <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-2 text-xs text-muted-foreground animate-in fade-in duration-300">
              <p className="font-semibold text-secondary text-[11px] uppercase tracking-wider mb-3">Footer Preview</p>
              {form.phones.filter(p => p.trim()).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
              {form.emails.filter(e => e.trim()).map((em, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{em}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end border-t border-border pt-5">
            <button
              type="submit"
              disabled={saving || !isValid}
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
