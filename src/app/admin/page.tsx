"use client"

import * as React from "react"
import Link from "next/link"
import { useTeam, useProducts, useJobs, useClients } from "@/lib/useStore"
import { Users, Package, Briefcase, Building2, ArrowRight, Activity, Layout } from "lucide-react"

export default function AdminDashboard() {
  const teamData = useTeam()
  const productsData = useProducts()
  const jobsData = useJobs()
  const clientsData = useClients()

  const [stats, setStats] = React.useState({ team: 0, products: 0, jobs: 0, gov: 0, priv: 0 })

  React.useEffect(() => {
    setStats({
      team:     teamData.length,
      products: productsData.length,
      jobs:     jobsData.length,
      gov:      clientsData.filter(c => c.type === "government").length,
      priv:     clientsData.filter(c => c.type === "private").length,
    })
  }, [teamData, productsData, jobsData, clientsData])

  const cards = [
    { label: "Team Members",       value: stats.team,             icon: Users,      href: "/admin/team",     bg: "bg-primary",   shadow: "shadow-primary/20" },
    { label: "Products",           value: stats.products,         icon: Package,    href: "/admin/products", bg: "bg-secondary", shadow: "shadow-secondary/20" },
    { label: "Job Openings",       value: stats.jobs,             icon: Briefcase,  href: "/admin/careers",  bg: "bg-accent",    shadow: "shadow-accent/20" },
    { label: "Clients & Partners", value: stats.gov + stats.priv, icon: Building2,  href: "/admin/clients",  bg: "bg-primary",   shadow: "shadow-primary/20" },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-2xl font-headline font-bold text-secondary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's a live overview of your platform content.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        {cards.map((card, i) => (
          <Link
            key={card.label}
            href={card.href}
            style={{ animationDelay: `${i * 80}ms` }}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-in zoom-in-95 fill-mode-both"
          >
            <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.shadow} shadow-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
              <card.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-3xl font-headline font-bold text-secondary mb-0.5">{card.value}</p>
            <p className="text-muted-foreground text-xs font-medium">{card.label}</p>
            <div className="flex items-center gap-1 text-[11px] text-primary font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Manage <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions — full width */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm animate-in fade-in duration-500 delay-300 fill-mode-both">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-headline font-bold text-secondary text-base">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Add Team Member",        href: "/admin/team",     icon: Users },
            { label: "Add Product",            href: "/admin/products", icon: Package },
            { label: "Post a Job",             href: "/admin/careers",  icon: Briefcase },
            { label: "Add Clients & Partners", href: "/admin/clients",  icon: Building2 },
            { label: "Home Visuals",           href: "/admin/home",     icon: Layout },
          ].map(a => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col gap-3 p-4 bg-muted/50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                <a.icon className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-semibold text-secondary group-hover:text-primary transition-colors leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
