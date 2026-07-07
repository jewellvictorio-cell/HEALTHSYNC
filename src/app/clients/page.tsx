"use client"

import * as React from "react"
import { type HospitalClient } from "@/lib/store"
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
      {/* 1. Hero: Our Partners in Care */}
      <section className="bg-secondary text-white py-24 text-center relative">
        <div className="container mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Partners in Care</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto font-body">
            We are proud to partner with trusted healthcare institutions dedicated to providing quality care and improving lives.
          </p>
        </div>
      </section>

      {/* 2. Teal banner: Partner Characteristics */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {characteristics.map((char, i) => (
              <div key={i} className="text-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center text-primary mx-auto transition-transform hover:rotate-12">
                  <char.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-headline font-bold">{char.title}</h4>
                <p className="text-sm text-primary-foreground/70 font-body leading-relaxed">{char.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Clients & Partners — horizontal logo row */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading with decorative lines */}
          <div className="text-center mb-16 animate-in fade-in duration-1000">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-16 bg-primary/30" />
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] font-headline">Trusted by</span>
              <span className="h-px w-16 bg-primary/30" />
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-secondary uppercase tracking-tight">
              Our Clients <span className="text-primary">&</span> Partners
            </h2>
          </div>

          {clients.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16 animate-in fade-in duration-1000 delay-200 fill-mode-both">
              {clients.map((client, i) => (
                <div
                  key={client.id}
                  className="group flex items-center justify-center animate-in zoom-in-95 fill-mode-both"
                  style={{ animationDelay: `${i * 80}ms` }}
                  title={client.name}
                >
                  {client.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-20 md:h-24 w-auto max-w-[140px] object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-muted/50 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-muted-foreground/40 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                      <Building2 className="h-10 w-10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/10 border border-dashed border-border rounded-2xl">
              <Building2 className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="font-semibold text-muted-foreground font-headline">No clients added yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1 font-body">Add clients from the admin side to get started.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}