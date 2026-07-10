"use client"

import * as React from "react"
import { Hero } from "@/components/home/Hero"
import { TrustBar } from "@/components/home/TrustBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  Stethoscope,
  Microscope,
  Package,
  Settings,
  Users,
  ArrowRight,
  CheckCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSlideshow2 } from "@/lib/useStore"

const services = [
  {
    title: "Medical Equipment",
    desc: "State-of-the-art imaging and surgical systems for modern hospitals.",
    icon: Stethoscope,
    link: "/products?category=Medical Equipment",
  },
  {
    title: "Biomedical Equipment",
    desc: "Sophisticated diagnostic instruments and patient monitoring technology.",
    icon: Activity,
    link: "/products?category=Biomedical Equipment",
  },
  {
    title: "Laboratory Solutions",
    desc: "Advanced diagnostic equipment and precision laboratory instruments.",
    icon: Microscope,
    link: "/products?category=Laboratory Equipment",
  },
  {
    title: "Medical Supplies",
    desc: "High-quality consumables and essential healthcare accessories.",
    icon: Heart,
    link: "/products?category=Consumables | Medical Supplies",
  },
  {
    title: "Packaging Solutions",
    desc: "Specialized sterilization and protective medical packaging.",
    icon: Package,
    link: "/products?category=Packaging Solutions",
  },
  {
    title: "Technical Support",
    desc: "Professional maintenance and biomedical technical services.",
    icon: Settings,
    link: "/contact?inquiry=Technical Support",
  },
  {
    title: "Consultancy",
    desc: "Healthcare management and institution development advisory.",
    icon: Users,
    link: "/contact?inquiry=Consultancy",
  },
]

const overviewHighlights = [
  "Direct supplier partnerships with leading global brands",
  "After-sales technical support and maintenance",
  "Flexible payment & financing options for institutions",
  "Timely nationwide delivery across the Philippines",
]

export default function Home() {
  const slideshow = useSlideshow2()
  const [index, setIndex] = React.useState(0)

  const [speed, setSpeed] = React.useState(5000)

  const slides = slideshow.length > 0 ? slideshow : [{ id: "fallback", url: "/images/about-team.png" }]

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
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Trust Bar */}
      <TrustBar />

      {/* Overview Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative lg:h-[520px] xl:h-[580px] flex flex-col justify-between animate-in slide-in-from-left-12 duration-1000 ease-out fill-mode-both">
              <div className="relative aspect-[4/3] lg:aspect-auto h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02] group/slide">
                {slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={slide.url}
                      alt="Healthsync Medical Solutions — Healthcare Excellence in the Philippines"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent z-20" />

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
            </div>
            <div className="space-y-6 animate-in slide-in-from-right-12 duration-1000 ease-out fill-mode-both">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                About Us
              </div>
              <h2 className="text-3xl font-headline font-bold text-secondary leading-snug">
                A Legacy of Trust in Healthcare Solutions
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Healthsync Medical Solutions Corporation is a premier provider dedicated to elevating the standard
                of patient care across the Philippines. We combine clinical innovation with reliable service to
                empower healthcare institutions with the tools they need to save lives.
              </p>

              {/* Highlights */}
              <ul className="space-y-3">
                {overviewHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-secondary/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="space-y-1 p-4 rounded-xl bg-muted border border-border">
                  <h4 className="text-4xl font-headline font-bold text-primary">10+</h4>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="space-y-1 p-4 rounded-xl bg-muted border border-border">
                  <h4 className="text-4xl font-headline font-bold text-primary">100+</h4>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Satisfied Clients</p>
                </div>
              </div>

              <Button
                size="lg"
                variant="ghost"
                className="px-0 text-primary font-bold hover:bg-transparent group"
                asChild
              >
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Our Journey{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary mb-4">
              What We Offer
            </div>
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">
              Comprehensive Medical Solutions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              From laboratory setups to daily medical consumables, we provide end-to-end support for your
              medical facility — delivered with expertise and care.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, i) => (
              <Card
                key={i}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group hover:shadow-lg transition-all duration-300 border border-border/60 bg-white animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-7">
                  <div className="bg-primary/10 w-13 h-13 w-[52px] h-[52px] rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-400 group-hover:rotate-6">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-headline font-bold text-secondary mb-2">
                    <Link href={service.link} className="hover:text-primary transition-colors">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">{service.desc}</p>
                  <Button variant="link" className="px-0 h-auto text-primary font-bold text-sm group/btn" asChild>
                    <Link href={service.link} className="flex items-center gap-1">
                      View Catalog{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(180 58% 50%) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, hsl(171 43% 60%) 0%, transparent 40%)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80 border border-white/10">
              Ready to Partner With Us?
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
              Upgrade Your Healthcare <br className="hidden md:block" /> Facility Today
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Partner with Healthsync for reliable, cost-effective, and high-quality medical solutions.
              Let&apos;s work together for better patient care across the Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 h-14 px-10 text-base font-bold transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white h-14 px-10 text-base font-bold hover:text-white transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute -bottom-20 -right-20 w-[480px] h-[480px] rounded-full border border-white/5" />
        <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full border border-white/5" />
      </section>
    </div>
  )
}
