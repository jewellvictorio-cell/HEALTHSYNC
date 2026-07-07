"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, BadgeCheck, Truck, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { useSlideshow } from "@/lib/useStore"

const trustBadges = [
  { icon: ShieldCheck, label: "DOH Accredited" },
  { icon: BadgeCheck, label: "ISO 9001:2015" },
  { icon: Truck, label: "Nationwide Delivery" },
]

export function Hero() {
  const slideshow = useSlideshow()
  const [index, setIndex] = React.useState(0)

  const [speed, setSpeed] = React.useState(5000)

  const slides = slideshow.length > 0 ? slideshow : [{ id: "fallback", url: "/images/hero-medical.png" }]

  React.useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, speed)
    return () => clearInterval(timer)
  }, [slides.length, speed])

  const speedUp = () => setSpeed(1200)
  const resetSpeed = () => setSpeed(5000)

  function handleDotClick(idx: number) {
    setIndex(idx)
  }

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

          {/* Right: Image / Slideshow */}
          <div className="relative lg:h-[520px] xl:h-[580px] flex flex-col justify-between animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 ease-out fill-mode-both">
            <div className="relative aspect-[4/3] lg:aspect-auto h-full overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02] group/slide">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide.url}
                    alt="Healthsync Medical Solutions — Professional Healthcare Supply Distribution"
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    unoptimized
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent z-20" />

              {/* Prev / Next Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                    onMouseEnter={speedUp}
                    onMouseLeave={resetSpeed}
                    onTouchStart={speedUp}
                    onTouchEnd={resetSpeed}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-border flex items-center justify-center text-secondary hover:text-primary transition-all shadow-md active:scale-95 opacity-80 md:opacity-0 md:group-hover/slide:opacity-100 focus:opacity-100"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
                    onMouseEnter={speedUp}
                    onMouseLeave={resetSpeed}
                    onTouchStart={speedUp}
                    onTouchEnd={resetSpeed}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-border flex items-center justify-center text-secondary hover:text-primary transition-all shadow-md active:scale-95 opacity-80 md:opacity-0 md:group-hover/slide:opacity-100 focus:opacity-100"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots */}
            {slides.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 z-30">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-350 ${
                      idx === index
                        ? "bg-primary w-5"
                        : "bg-secondary/30 hover:bg-secondary/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-xl shadow-xl hidden xl:block border border-border z-30 animate-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both">
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
            <div className="absolute -top-5 -right-5 bg-primary p-4 rounded-xl shadow-xl hidden xl:block z-30 animate-in slide-in-from-top-12 duration-1000 delay-900 fill-mode-both">
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

