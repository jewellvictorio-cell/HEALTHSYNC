"use client"

import * as React from "react"
import { db } from "./firebase"
import { collection, doc, onSnapshot } from "firebase/firestore"
import { ensureSeeded, type TeamMember, type Product, type Job, type HospitalClient, type FooterSettings, type SlideshowImage } from "./store"

// Seed data once on load
if (typeof window !== "undefined") {
  ensureSeeded()
}

export function useTeam(): TeamMember[] {
  const [data, setData] = React.useState<TeamMember[]>([])
  React.useEffect(() => {
    return onSnapshot(collection(db, "team"), (snap) => {
      setData(snap.docs.map(d => d.data() as TeamMember))
    })
  }, [])
  return data
}

export function useProducts(): Product[] {
  const [data, setData] = React.useState<Product[]>([])
  React.useEffect(() => {
    return onSnapshot(collection(db, "products"), (snap) => {
      setData(snap.docs.map(d => d.data() as Product))
    })
  }, [])
  return data
}

export function useJobs(): Job[] {
  const [data, setData] = React.useState<Job[]>([])
  React.useEffect(() => {
    return onSnapshot(collection(db, "jobs"), (snap) => {
      setData(snap.docs.map(d => d.data() as Job))
    })
  }, [])
  return data
}

export function useClients(): HospitalClient[] {
  const [data, setData] = React.useState<HospitalClient[]>([])
  React.useEffect(() => {
    return onSnapshot(collection(db, "clients"), (snap) => {
      setData(snap.docs.map(d => d.data() as HospitalClient))
    })
  }, [])
  return data
}

const DEFAULT_FOOTER: FooterSettings = {
  address: "Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines",
  phone: "+63 915 392 5794",
  email: "healthsync.med@gmail.com",
}

export function useFooterSettings(): FooterSettings {
  const [data, setData] = React.useState<FooterSettings>(DEFAULT_FOOTER)
  React.useEffect(() => {
    return onSnapshot(doc(db, "settings", "footer"), (snap) => {
      if (snap.exists()) setData(snap.data() as FooterSettings)
    })
  }, [])
  return data
}

export function useSlideshow(): SlideshowImage[] {
  const [data, setData] = React.useState<SlideshowImage[]>([])
  React.useEffect(() => {
    return onSnapshot(doc(db, "settings", "slideshow"), (snap) => {
      if (snap.exists() && snap.data().items) setData(snap.data().items as SlideshowImage[])
    })
  }, [])
  return data
}

export function useSlideshow2(): SlideshowImage[] {
  const [data, setData] = React.useState<SlideshowImage[]>([])
  React.useEffect(() => {
    return onSnapshot(doc(db, "settings", "slideshow2"), (snap) => {
      if (snap.exists() && snap.data().items) setData(snap.data().items as SlideshowImage[])
    })
  }, [])
  return data
}
