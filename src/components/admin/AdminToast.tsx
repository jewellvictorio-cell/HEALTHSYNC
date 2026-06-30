"use client"

// ─────────────────────────────────────────────────────────────────────────────
//  AdminToast – Global Toast Notification System for the Admin Dashboard
//  Provides a Context + Hook + Renderer all in one file.
//  Usage in any admin page:
//    const { toast } = useToast()
//    toast("Team member successfully updated!")
//    toast("Item deleted.", "error")
// ─────────────────────────────────────────────────────────────────────────────

import * as React from "react"
import { CheckCircle2, AlertTriangle, X } from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error"

interface ToastItem {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = React.createContext<ToastContextValue | null>(null)

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside <AdminToastProvider>")
  return ctx
}

// ── Individual Toast ──────────────────────────────────────────────────────────

function Toast({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    // Trigger enter animation
    const enter = requestAnimationFrame(() => setVisible(true))
    // Auto-dismiss after 3.5s
    const dismiss = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(item.id), 400)
    }, 3500)
    return () => {
      cancelAnimationFrame(enter)
      clearTimeout(dismiss)
    }
  }, [item.id, onRemove])

  const isSuccess = item.type === "success"

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border w-full max-w-sm
        transition-all duration-400 ease-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
        ${isSuccess
          ? "bg-[hsl(145,63%,12%)] border-[hsl(145,50%,25%)]"
          : "bg-[hsl(0,60%,12%)] border-[hsl(0,50%,30%)]"
        }
      `}
    >
      {/* Icon */}
      <div className={`shrink-0 mt-0.5 ${isSuccess ? "text-emerald-400" : "text-red-400"}`}>
        {isSuccess
          ? <CheckCircle2 className="h-5 w-5" />
          : <AlertTriangle className="h-5 w-5" />
        }
      </div>

      {/* Message */}
      <p className="text-sm font-semibold text-white/90 flex-1 leading-snug">{item.message}</p>

      {/* Close button */}
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(item.id), 400) }}
        className="shrink-0 text-white/30 hover:text-white/70 transition-colors mt-0.5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const remove = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Stack — fixed top-right */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(item => (
          <div key={item.id} className="pointer-events-auto">
            <Toast item={item} onRemove={remove} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
