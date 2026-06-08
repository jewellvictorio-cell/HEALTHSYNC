"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle / Shield */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          className={cn(
            variant === "light" ? "fill-white/10" : "fill-primary/5"
          )} 
        />
        
        {/* Main Logo Mark - Stylized H with Medical Pulse */}
        <path
          d="M30 25V75M70 25V75M30 50H70"
          stroke={variant === "light" ? "white" : "currentColor"}
          strokeWidth="12"
          strokeLinecap="round"
          className={cn(variant === "default" && "text-secondary")}
        />
        
        {/* Medical Accent / Heartbeat Link */}
        <path
          d="M25 50L35 50L42 35L58 65L65 50L75 50"
          stroke={variant === "light" ? "hsl(171 43% 60%)" : "hsl(180 100% 23.7%)"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Secondary Accent Dot */}
        <circle 
          cx="50" 
          cy="15" 
          r="6" 
          className={cn(
            variant === "light" ? "fill-white" : "fill-accent"
          )} 
        />
      </svg>
    </div>
  )
}
