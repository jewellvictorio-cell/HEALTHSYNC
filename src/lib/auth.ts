// ─────────────────────────────────────────────────────────────────────────────
//  Admin Auth Helpers
//  Uses Firebase Authentication for Firestore write access, plus localStorage
//  so the admin session flag persists for client-side route guards.
// ─────────────────────────────────────────────────────────────────────────────

import { auth } from "./firebase"
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth"

const SESSION_KEY = "hs_admin_session"

/**
 * Signs in with Firebase Auth and stores a local session flag.
 * Returns true on success, false on invalid credentials.
 */
export async function login(email: string, password: string): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, btoa(`${email}:${Date.now()}`))
    }
    return true
  } catch (error) {
    console.error("Login failed:", error)
    return false
  }
}

/**
 * Signs out of Firebase Auth and clears local session.
 */
export async function logout(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (e) {
    console.error("Firebase sign-out error:", e)
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem("hs_remember_email")
  }
}

/**
 * Quick synchronous check used by route guards.
 */
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(SESSION_KEY)
}
