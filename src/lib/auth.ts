// ─────────────────────────────────────────────────────────────────────────────
//  Admin Auth Helpers
//  Uses localStorage so login persists across browser restarts and server
//  restarts. The session is only cleared when the admin explicitly logs out.
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = "hs_admin_session"

// Credentials — in production these should come from env vars.
// Set NEXT_PUBLIC_ADMIN_EMAIL and NEXT_PUBLIC_ADMIN_PASSWORD in .env.local
const ADMIN_EMAIL    = process.env.NEXT_PUBLIC_ADMIN_EMAIL    ?? "admin@healthsync.com"
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "HealthSync@2025"

export function login(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      // Store in localStorage so session survives browser/server restarts
      localStorage.setItem(SESSION_KEY, btoa(`${email}:${Date.now()}`))
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
    // Also clear remembered email on explicit logout
    localStorage.removeItem("hs_remember_email")
  }
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(SESSION_KEY)
}
