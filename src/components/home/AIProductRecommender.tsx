"use client"

import { Sparkles, ArrowRight, Microscope, Stethoscope, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const sampleCategories = [
  { icon: Stethoscope, label: "Medical Equipment", desc: "Diagnostic & surgical systems" },
  { icon: Microscope, label: "Laboratory Solutions", desc: "Precision instruments & reagents" },
  { icon: Package, label: "Medical Supplies", desc: "Consumables & accessories" },
]

export function AIProductRecommender() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr] items-center">
            {/* Left: Description */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                <span>AI Clinical Advisor</span>
              </div>
              <h2 className="text-3xl font-headline font-bold text-secondary">
                Intelligent Product Matching — <span className="text-primary">Coming Soon</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Describe your hospital's clinical needs and our AI will recommend the most suitable solutions from our catalog. 
                This feature is currently in development and will be available soon.
              </p>
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-semibold text-primary mb-1">In the meantime, reach out directly:</p>
                <p className="text-sm text-muted-foreground">
                  Our product specialists are ready to help you find exactly what your facility needs.
                </p>
              </div>
              <Button className="gap-2 h-12 px-6 font-semibold transition-all hover:scale-105 active:scale-95" asChild>
                <Link href="/contact">
                  Talk to a Specialist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right: Product category preview */}
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Browse by Category</p>
              {sampleCategories.map(({ icon: Icon, label, desc }, i) => (
                <Card
                  key={i}
                  className="group hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary transition-colors duration-300 shrink-0">
                      <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-secondary text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </CardContent>
                </Card>
              ))}
              <div className="pt-2">
                <Button variant="outline" className="w-full gap-2 font-semibold" asChild>
                  <Link href="/products">
                    View Full Catalog
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  )
}