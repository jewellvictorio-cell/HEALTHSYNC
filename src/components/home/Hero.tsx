import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, BadgeCheck, Truck, Phone } from "lucide-react"

const trustBadges = [
  { icon: ShieldCheck, label: "DOH Accredited" },
  { icon: BadgeCheck, label: "ISO 9001:2015" },
  { icon: Truck, label: "Nationwide Delivery" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Copy */}
          <div className="relative z-10 max-w-2xl text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary mb-6 animate-in zoom-in-50 duration-700 delay-300 fill-mode-both">
              <ShieldCheck className="h-4 w-4" />
              <span>Certified Healthcare Partner — Philippines</span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-secondary mb-6 leading-tight">
              Where Faith Meets <br className="hidden sm:block" />
              <span className="text-primary">Excellence</span> in Healthcare
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Providing quality medical equipment, laboratory solutions, healthcare supplies, and professional support for hospitals, clinics, and laboratories across the Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto transition-transform hover:scale-105 active:scale-95" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto transition-transform hover:scale-105 active:scale-95" asChild>
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Get a Quote
                </Link>
              </Button>
            </div>

            {/* Inline trust badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-in fade-in duration-700 delay-700 fill-mode-both">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-muted border border-border px-3 py-1.5 text-xs font-semibold text-secondary/80"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative lg:h-[520px] xl:h-[580px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 ease-out fill-mode-both">
            <div className="relative aspect-[4/3] lg:aspect-auto h-full overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/images/hero-medical.png"
                alt="Healthsync Medical Solutions — Professional Healthcare Supply Distribution"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-xl shadow-xl hidden xl:block border border-border animate-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">500+ Clients</p>
                  <p className="text-xs text-muted-foreground">Trusted Nationwide</p>
                </div>
              </div>
            </div>

            {/* Floating experience card */}
            <div className="absolute -top-5 -right-5 bg-primary p-4 rounded-xl shadow-xl hidden xl:block animate-in slide-in-from-top-12 duration-1000 delay-900 fill-mode-both">
              <p className="text-2xl font-headline font-extrabold text-white leading-none">15+</p>
              <p className="text-[11px] font-semibold text-white/80 uppercase tracking-wider mt-0.5">Years of Trust</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl opacity-60 animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl opacity-40 animate-pulse duration-[15000ms]" />
    </section>
  )
}
