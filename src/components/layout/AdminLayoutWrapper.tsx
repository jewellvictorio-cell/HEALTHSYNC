"use client"

import { usePathname } from "next/navigation"

interface Props {
  publicSlot: React.ReactNode
  adminSlot:  React.ReactNode
}

export default function AdminLayoutWrapper({ publicSlot, adminSlot }: Props) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")
  return <>{isAdminRoute ? adminSlot : publicSlot}</>
}
