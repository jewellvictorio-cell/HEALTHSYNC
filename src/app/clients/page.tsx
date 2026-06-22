"use client"

import * as React from "react"
import { getClients, type HospitalClient } from "@/lib/store"
import { useClients } from "@/lib/useStore"
import { Card, CardContent } from "@/components/ui/card"
import { Landmark, Building2, Globe, Heart, ShieldCheck, Users } from "lucide-react"
import Image from "next/image"

const characteristics = [
  { title: "Trusted Partner",        desc: "Building lasting relationships through quality and service.", icon: ShieldCheck },
  { title: "Wide Network",           desc: "Serving a diverse range of healthcare institutions.",         icon: Globe },
  { title: "Committed to Excellence",desc: "Supporting better healthcare through reliable solutions.",    icon: Heart },
]

const keyPartners = [
  { name: "STERITEX MEDICAL SYSTEM",                         seed: "p1" },
  { name: "MEDTEX BIOMEDICAL SERVICES",                      seed: "p2" },
  { name: "TOPFORM MEDICAL ENTERPRISES",                     seed: "p3" },
  { name: "VICTORIA'S PHARMACEUTICAL PRODUCT DISTRIBUTION",  seed: "p4" },
  { name: "3G MEDICAL ENTERPRISES",                          seed: "p5" },
  { name: "BIOMEDICAL SERVICES",                             seed: "p6" },
]

export default function ClientsPage() {
  const clients = useClients()


  const govHospitals  = clients.filter(c => c.type === "government")
  const privHospitals = clients.filter(c => c.type === "private")

  const stats = [
    { title: "Government Hospitals", icon: Landmark,  count: govHospitals.length.toString() },
    { title: "Private Hospitals",    icon: Building2, count: privHospitals.length.toString() },
  ]

  return (
    <div className="flex flex-col overflow-hidden">
      <section className="bg-secondary text-white py-24 text-center relative">
        <div className="container mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Partners in Care</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            We are proud to partner with trusted healthcare institutions dedicated to providing quality care and improving lives.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {stats.map((c, i) => (
              <Card key={i} className="text-center p-8 border-none shadow-lg bg-muted/30 animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 transition-transform hover:scale-110">
                  <c.icon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-headline font-extrabold text-secondary mb-2">{c.count}</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{c.title}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Government */}
            <div className="space-y-6 animate-in slide-in-from-left-8 duration-1000 fill-mode-both">
              <h3 className="text-2xl font-headline font-bold text-secondary flex items-center gap-2">
                <Landmark className="text-primary h-6 w-6" /> Government Institutions
              </h3>
              <ul className="space-y-4">
                {govHospitals.map((h, i) => (
                  <li key={h.id} className="flex items-start gap-3 p-4 bg-muted/20 rounded-xl border border-border/50 transition-all hover:bg-white hover:shadow-md hover:translate-x-2 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-secondary font-medium">{h.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Private */}
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-1000 fill-mode-both">
              <h3 className="text-2xl font-headline font-bold text-secondary flex items-center gap-2">
                <Building2 className="text-primary h-6 w-6" /> Private Hospitals
              </h3>
              <ul className="space-y-4">
                {privHospitals.map((h, i) => (
                  <li key={h.id} className="flex items-start gap-3 p-4 bg-muted/20 rounded-xl border border-border/50 transition-all hover:bg-white hover:shadow-md hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-secondary font-medium">{h.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Characteristics */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {characteristics.map((char, i) => (
              <div key={i} className="text-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center text-primary mx-auto transition-transform hover:rotate-12">
                  <char.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">{char.title}</h4>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{char.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Partners Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in duration-1000">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4 uppercase tracking-tight">KEY CLIENT / PARTNERS</h2>
            <p className="text-muted-foreground">Strategic collaborations driving healthcare forward.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyPartners.map((partner, i) => (
              <Card key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border-none group overflow-hidden animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <Image src={`https://picsum.photos/seed/${partner.seed}/600/400`} alt={partner.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" data-ai-hint="medical partner" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white font-bold text-sm leading-tight uppercase tracking-wider">{partner.name}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <Users className="h-4 w-4 transition-transform group-hover:scale-125" /> Strategic Partner
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}