// ─────────────────────────────────────────────────────────────────────────────
//  useStore — React hooks for live-synced localStorage data
//  Pages using these hooks automatically re-render whenever the Admin saves
//  changes, even across browser tabs (via the 'storage' event).
// ─────────────────────────────────────────────────────────────────────────────

"use client"

import * as React from "react"
import {
  getTeam, getProducts, getJobs, getClients, getFooterSettings, getSlideshow, getSlideshow2, markHydrated,
  type TeamMember, type Product, type Job, type HospitalClient, type FooterSettings, type SlideshowImage,
} from "./store"

// Generic hook: reads from localStorage immediately, then listens for changes
function useLiveStore<T>(loader: () => T, storageKey: string): T {
  const [data, setData] = React.useState<T>(loader)

  React.useEffect(() => {
    // Perform hydration sync on initial client mount
    markHydrated()
    setData(loader())

    // Re-read whenever THIS tab saves (custom event fired by store)
    function onCustom() { setData(loader()) }
    // Re-read whenever ANOTHER tab saves (native browser storage event)
    function onStorage(e: StorageEvent) {
      if (!storageKey || e.key === storageKey || e.key === null) {
        setData(loader())
      }
    }

    window.addEventListener("hs_store_updated", onCustom)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener("hs_store_updated", onCustom)
      window.removeEventListener("storage", onStorage)
    }
  }, [loader, storageKey])

  return data
}

export function useTeam():     TeamMember[]    { return useLiveStore(getTeam,     "hs_team") }
export function useProducts(): Product[]       { return useLiveStore(getProducts, "hs_products") }
export function useJobs():     Job[]           { return useLiveStore(getJobs,     "hs_jobs") }
export function useClients():  HospitalClient[] { return useLiveStore(getClients,  "hs_clients") }
export function useFooterSettings(): FooterSettings { return useLiveStore(getFooterSettings, "hs_footer") }
export function useSlideshow(): SlideshowImage[] { return useLiveStore(getSlideshow, "hs_slideshow") }
export function useSlideshow2(): SlideshowImage[] { return useLiveStore(getSlideshow2, "hs_slideshow2") }



