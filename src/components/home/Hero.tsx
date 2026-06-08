import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              <ShieldCheck className="h-4 w-4" />
              <span>Certified Healthcare Partner</span>
            </div>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-secondary sm:text-6xl mb-6">
              Where Faith Meets <br />
              <span className="text-primary">Excellence</span> in Healthcare
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Providing quality medical equipment, laboratory solutions, healthcare supplies, and professional support for hospitals, clinics, and laboratories across the Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:h-[600px]">
            <div className="relative aspect-[4/3] lg:aspect-auto h-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://picsum.photos/seed/healthsync1/800/600"
                alt="Modern Medical Laboratory"
                fill
                className="object-cover"
                priority
                data-ai-hint="modern hospital"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden sm:block border border-border">
              <div className="flex items-center gap-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">500+ Clients</p>
                  <p className="text-xs text-muted-foreground">Trusted Nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </section>
  )
}

import { Activity } from "lucide-react"