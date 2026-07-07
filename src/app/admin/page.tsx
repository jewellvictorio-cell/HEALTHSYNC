"use client"

import * as React from "react"
import Link from "next/link"
import { useTeam, useProducts, useJobs, useClients } from "@/lib/useStore"
import { Users, Package, Briefcase, Building2, ArrowRight, Landmark, TrendingUp, Activity } from "lucide-react"

export default function AdminDashboard() {
  const teamData = useTeam()
  const productsData = useProducts()
  const jobsData = useJobs()
  const clientsData = useClients()

  const [stats, setStats] = React.useState({ team: 0, products: 0, jobs: 0, gov: 0, priv: 0 })

  React.useEffect(() => {
    setStats({
      team: teamData.length,
      products: productsData.length,
      jobs: jobsData.length,
      gov: clientsData.filter(c => c.type === "government").length,
      priv: clientsData.filter(c => c.type === "private").length,
    })
  }, [teamData, productsData, jobsData, clientsData])

  const cards = [
    { label: "Team Members",     value: stats.team,          icon: Users,      href: "/admin/team",     bg: "bg-primary",     shadow: "shadow-primary/20" },
    { label: "Products",         value: stats.products,      icon: Package,    href: "/admin/products", bg: "bg-secondary",   shadow: "shadow-secondary/20" },
    { label: "Job Openings",     value: stats.jobs,          icon: Briefcase,  href: "/admin/careers",  bg: "bg-accent",      shadow: "shadow-accent/20" },
    { label: "Hospital Clients", value: stats.gov + stats.priv, icon: Building2, href: "/admin/clients", bg: "bg-primary",  shadow: "shadow-primary/20" },
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

      {/* Two-col grid */}
      <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in duration-500 delay-300 fill-mode-both">

        {/* Client Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-headline font-bold text-secondary text-base">Client Breakdown</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Government Hospitals", count: stats.gov,  icon: Landmark,  color: "bg-primary" },
              { label: "Private Hospitals",    count: stats.priv, icon: Building2, color: "bg-accent" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border/50">
                <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-secondary">{item.label}</p>
                </div>
                <span className="font-headline font-bold text-2xl text-secondary">{item.count}</span>
              </div>
            ))}
          </div>

          <Link href="/admin/clients" className="flex items-center gap-1 text-primary text-xs font-semibold mt-4 hover:gap-2 transition-all">
            Manage clients <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-headline font-bold text-secondary text-base">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Team Member", href: "/admin/team",     icon: Users },
              { label: "Add Product",     href: "/admin/products", icon: Package },
              { label: "Post a Job",      href: "/admin/careers",  icon: Briefcase },
              { label: "Add Hospital",    href: "/admin/clients",  icon: Building2 },
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
    </div>
  )
}
