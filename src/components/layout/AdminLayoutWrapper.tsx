"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { markHydrated } from "@/lib/store"

interface Props {
  publicSlot: React.ReactNode
  adminSlot:  React.ReactNode
}

export default function AdminLayoutWrapper({ publicSlot, adminSlot }: Props) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  React.useEffect(() => {
    markHydrated()
    window.dispatchEvent(new Event("hs_store_updated"))
  }, [])

  return <>{isAdminRoute ? adminSlot : publicSlot}</>
}
