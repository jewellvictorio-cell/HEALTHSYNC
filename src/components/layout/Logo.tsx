
"use client"

import * as React from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  const logoData = PlaceHolderImages.find(img => img.id === "app-logo")

  return (
    <div className={className}>
      <Image 
        src={logoData?.imageUrl || "https://picsum.photos/seed/healthsync-logo/400/400"} 
        alt="HealthSync Logo"
        width={200}
        height={200}
        className="object-contain"
        data-ai-hint="medical logo teal blue"
      />
    </div>
  )
}
