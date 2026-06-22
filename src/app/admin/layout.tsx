"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { isAdmin, logout } from "@/lib/auth"
import {
  Users, Package, Briefcase, Building2,
  LayoutDashboard, LogOut, Menu, X, ShieldCheck, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/Logo"
import { Shield } from "lucide-react"

const sidebarLinks = [
  { href: "/admin",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/team",     label: "Team",        icon: Users },
  { href: "/admin/products", label: "Products",    icon: Package },
  { href: "/admin/careers",  label: "Careers",     icon: Briefcase },
  { href: "/admin/clients",  label: "Clients",     icon: Building2 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [checked,  setChecked]  = React.useState(false)
  const [sideOpen, setSideOpen] = React.useState(false)

  const isLoginPage = pathname === "/admin/login"

  React.useEffect(() => {
    if (isLoginPage) return
    if (!isAdmin()) {
      router.replace("/admin/login")
    } else {
      setChecked(true)
    }
  }, [router, isLoginPage])

  if (isLoginPage) return <>{children}</>

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <ShieldCheck className="h-8 w-8 animate-pulse text-primary" />
          <p className="text-sm font-medium">Verifying access…</p>
        </div>
      </div>
    )
  }

  function handleLogout() {
    logout()
    router.replace("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile overlay */}
      {sideOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSideOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-secondary flex flex-col transition-transform duration-300 shadow-2xl",
        "lg:translate-x-0 lg:static lg:z-auto",
        sideOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand header */}
        <div className="relative flex items-center gap-3 px-5 py-5 shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(240,67%,14%) 0%, hsl(240,67%,10%) 100%)" }}>
          {/* Decorative glow blob */}
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full blur-2xl opacity-30" style={{ background: "hsl(180,58%,27%)" }} />
          {/* Logo pill */}
          <div className="relative h-10 w-10 shrink-0 rounded-xl flex items-center justify-center p-1.5" style={{ background: "hsl(180,58%,27%,0.15)", border: "1.5px solid hsl(180,58%,27%,0.35)" }}>
            <Logo className="h-full w-full" />
          </div>
          <div className="relative min-w-0">
            <p className="font-headline font-bold text-white text-sm leading-tight truncate">Healthsync Medical</p>
            <p className="text-[11px] truncate font-medium" style={{ color: "hsl(171,43%,60%)" }}>Admin Panel</p>
          </div>
          <button
            className="ml-auto lg:hidden transition-colors shrink-0 relative"
            style={{ color: "hsl(0,0%,100%,0.4)" }}
            onClick={() => setSideOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px]" style={{ background: "linear-gradient(90deg, hsl(180,58%,27%,0.8) 0%, transparent 100%)" }} />
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">Management</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSideOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-white/50 hover:text-white hover:bg-white/8"
                )}
              >
                <link.icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200", !isActive && "group-hover:scale-110")} />
                <span className="flex-1">{link.label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 shrink-0 space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white/50 hover:bg-white/8 hover:text-red-400 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-8 py-4 bg-card border-b border-border sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setSideOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page breadcrumb — auto from pathname */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-muted-foreground text-sm hidden sm:block">Admin</span>
            <span className="text-muted-foreground text-sm hidden sm:block">/</span>
            <span className="font-headline font-bold text-secondary text-sm capitalize">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/admin/")[1] ?? ""}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-primary/8 border border-primary/20 text-primary rounded-full px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Administrator</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
