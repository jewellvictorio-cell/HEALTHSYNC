"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login, isAdmin } from "@/lib/auth"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Logo } from "@/components/layout/Logo"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,      setEmail]      = React.useState("")
  const [password,   setPassword]   = React.useState("")
  const [showPw,     setShowPw]     = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [error,      setError]      = React.useState("")
  const [loading,    setLoading]    = React.useState(false)
  const [forgotOpen, setForgotOpen] = React.useState(false)

  React.useEffect(() => {
    if (isAdmin()) router.replace("/admin")
    // Load remembered email
    const saved = typeof window !== "undefined" ? localStorage.getItem("hs_remember_email") : null
    if (saved) { setEmail(saved); setRememberMe(true) }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email || !password) { setError("Please enter your email and password."); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (login(email, password)) {
      if (rememberMe) {
        localStorage.setItem("hs_remember_email", email)
      } else {
        localStorage.removeItem("hs_remember_email")
      }
      router.replace("/admin")
    } else {
      setError("Invalid credentials. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(180,20%,98%)" }}>

      {/* ── Left Brand Panel ────────────────────────── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-[42%] relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, hsl(240,67%,10%) 0%, hsl(180,58%,18%) 100%)" }}
      >
        {/* Decorative rings */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/5" />
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-white/5" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/5" />
        <div className="absolute bottom-0 right-0 w-52 h-52" style={{ background: "radial-gradient(circle, hsl(171,43%,60%,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 text-center px-10 max-w-xs">
          <Logo className="h-20 w-20 mx-auto mb-8 drop-shadow-xl" />
          <h1 className="font-headline font-bold text-white text-2xl leading-snug mb-3">
            Healthsync Medical<br />Solutions Corporation
          </h1>
          <div className="w-10 h-0.5 mx-auto my-5 rounded-full" style={{ background: "hsl(171,43%,60%)" }} />
          <p className="text-white/40 text-sm leading-relaxed">
            Secure admin portal for managing your platform content and operations.
          </p>
        </div>
      </div>

      {/* ── Right Login Panel ────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <Logo className="h-10 w-10" />
          <div>
            <p className="font-headline font-bold text-sm" style={{ color: "hsl(240,67%,12%)" }}>Healthsync Medical</p>
            <p className="text-xs" style={{ color: "hsl(240,18%,55%)" }}>Solutions Corporation</p>
          </div>
        </div>

        <div className="w-full max-w-[380px] animate-in fade-in slide-in-from-bottom-4 duration-600">

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="font-headline font-bold text-2xl sm:text-3xl mb-1"
              style={{ color: "hsl(240,67%,12%)" }}
            >
              Log In
            </h2>
            <p className="text-sm" style={{ color: "hsl(240,18%,50%)" }}>
              Enter your credentials to access the admin panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300"
                style={{ background: "hsl(0,84%,60%,0.08)", border: "1px solid hsl(0,84%,60%,0.25)", color: "hsl(0,72%,48%)" }}
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold"
                style={{ color: "hsl(240,67%,18%)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError("") }}
                placeholder="Your Email Address"
                autoComplete="email"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-body"
                style={{
                  background: "hsl(180,12%,95%)",
                  border: "1.5px solid hsl(180,12%,86%)",
                  color: "hsl(240,67%,10%)",
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = "hsl(180,58%,27%)"
                  e.currentTarget.style.boxShadow = "0 0 0 3px hsl(180,58%,27%,0.12)"
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "hsl(180,12%,86%)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="block text-sm font-semibold"
                style={{ color: "hsl(240,67%,18%)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError("") }}
                  placeholder="Your Password"
                  autoComplete="current-password"
                  className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all font-body"
                  style={{
                    background: "hsl(180,12%,95%)",
                    border: "1.5px solid hsl(180,12%,86%)",
                    color: "hsl(240,67%,10%)",
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "hsl(180,58%,27%)"
                    e.currentTarget.style.boxShadow = "0 0 0 3px hsl(180,58%,27%,0.12)"
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "hsl(180,12%,86%)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
                  style={{ color: "hsl(240,18%,55%)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "hsl(180,58%,27%)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "hsl(240,18%,55%)")}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded flex items-center justify-center transition-all border"
                  style={{
                    background: rememberMe ? "hsl(180,58%,27%)" : "transparent",
                    borderColor: rememberMe ? "hsl(180,58%,27%)" : "hsl(180,12%,72%)",
                  }}
                >
                  {rememberMe && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-medium" style={{ color: "hsl(240,18%,50%)" }}>Remember me</span>
              </label>

              {/* Forgot Password */}
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-xs font-semibold transition-colors"
                style={{ color: "hsl(180,58%,27%)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(180,58%,20%)")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(180,58%,27%)")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-headline font-bold py-3 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2 mt-1"
              style={{
                background: loading ? "hsl(180,58%,32%)" : "hsl(180,58%,27%)",
                color: "#fff",
                boxShadow: "0 4px 16px hsl(180,58%,27%,0.30)",
                opacity: loading ? 0.8 : 1,
                transform: "scale(1)",
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "hsl(180,58%,22%)" }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "hsl(180,58%,27%)" }}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </>
              ) : (
                "Log In"
              )}
            </button>

          </form>

          {/* Footer link */}
          <p className="text-center mt-7">
            <Link
              href="/"
              className="text-xs transition-colors"
              style={{ color: "hsl(240,18%,55%)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "hsl(180,58%,27%)")}
              onMouseLeave={e => (e.currentTarget.style.color = "hsl(240,18%,55%)")}
            >
              ← Return to main website
            </Link>
          </p>

          {/* Forgot Password Modal */}
          {forgotOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,15,36,0.55)", backdropFilter: "blur(4px)" }}>
              <div
                className="w-full max-w-sm rounded-2xl p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{ background: "#fff", border: "1.5px solid hsl(180,12%,86%)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-base" style={{ color: "hsl(240,67%,12%)" }}>Reset Password</h3>
                  <button
                    onClick={() => setForgotOpen(false)}
                    className="p-1 rounded-lg transition-colors"
                    style={{ color: "hsl(240,18%,55%)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "hsl(180,12%,93%)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <p className="text-sm mb-5" style={{ color: "hsl(240,18%,50%)" }}>
                  To reset your admin password, please contact your system administrator or reach out via your registered corporate email.
                </p>
                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3 mb-5"
                  style={{ background: "hsl(180,58%,27%,0.07)", border: "1px solid hsl(180,58%,27%,0.18)" }}
                >
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 16 16" style={{ color: "hsl(180,58%,27%)" }}>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(180,58%,27%)" }}>
                    Admin credentials are managed internally. Contact <strong>healthsync.med@gmail.com</strong> for assistance.
                  </p>
                </div>
                <button
                  onClick={() => setForgotOpen(false)}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "hsl(180,58%,27%)", color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "hsl(180,58%,22%)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "hsl(180,58%,27%)")}
                >
                  Got it
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="absolute bottom-5 text-xs" style={{ color: "hsl(240,18%,70%)" }}>
          Restricted access · Healthsync Medical Solutions Corporation
        </p>
      </div>
    </div>
  )
}
