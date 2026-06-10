import { Hero } from "@/components/home/Hero"
import { TrustBar } from "@/components/home/TrustBar"
import { FinancialCalculator } from "@/components/home/FinancialCalculator"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Medical Equipment",
    desc: "State-of-the-art imaging and surgical systems for modern hospitals.",
    icon: Stethoscope,
  },
  {
    title: "Laboratory Solutions",
    desc: "Advanced diagnostic equipment and precision laboratory instruments.",
    icon: Microscope,
  },
  {
    title: "Medical Supplies",
    desc: "High-quality consumables and essential healthcare accessories.",
    icon: Activity,
  },
  {
    title: "Packaging Solutions",
    desc: "Specialized sterilization and protective medical packaging.",
    icon: Package,
  },
  {
    title: "Technical Support",
    desc: "Professional maintenance and biomedical technical services.",
    icon: Settings,
  },
  {
    title: "Consultancy",
    desc: "Healthcare management and institution development advisory.",
    icon: Users,
  },
]

const overviewHighlights = [
  "Direct supplier partnerships with leading global brands",
  "After-sales technical support and maintenance",
  "Flexible payment & financing options for institutions",
  "Timely nationwide delivery across the Philippines",
]

export default function Home() {
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
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-left-12 duration-1000 ease-out fill-mode-both">
              <Image
                src="/images/about-team.png"
                alt="Healthsync Medical Solutions — Healthcare Excellence in the Philippines"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />
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
                  <h4 className="text-4xl font-headline font-bold text-primary">15+</h4>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="space-y-1 p-4 rounded-xl bg-muted border border-border">
                  <h4 className="text-4xl font-headline font-bold text-primary">1k+</h4>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Products Catalog</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card
                key={i}
                className="group hover:shadow-lg transition-all duration-300 border border-border/60 bg-white animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-7">
                  <div className="bg-primary/10 w-13 h-13 w-[52px] h-[52px] rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-400 group-hover:rotate-6">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-headline font-bold text-secondary mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">{service.desc}</p>
                  <Button variant="link" className="px-0 h-auto text-primary font-bold text-sm group/btn" asChild>
                    <Link href="/products" className="flex items-center gap-1">
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

      {/* Equipment Financing Estimator */}
      <FinancialCalculator />

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
