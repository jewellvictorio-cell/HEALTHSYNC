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

      {/* 3. Our Clients & Partners (dynamically rendered from Admin state) */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in duration-1000">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4 uppercase tracking-tight">Our Clients & Partners</h2>
            <p className="text-muted-foreground font-body">Strategic collaborations driving healthcare forward.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clients.map((client, i) => (
              <div key={client.id} className="flex flex-col items-center justify-between text-center group h-44 py-2 animate-in zoom-in-95 fill-mode-both" style={{ animationDelay: `${i * 50}ms` }}>
                {client.logo ? (
                  <div className="flex-grow flex items-center justify-center w-full h-28 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-28 w-auto max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center text-primary mb-2">
                      <Building2 className="h-8 w-8" />
                    </div>
                  </div>
                )}
                <span className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider line-clamp-1 mt-auto w-full font-headline px-1">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {clients.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-border rounded-2xl">
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