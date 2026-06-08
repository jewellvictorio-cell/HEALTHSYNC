import { Hero } from "@/components/home/Hero"
import { FinancialCalculator } from "@/components/home/FinancialCalculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Stethoscope, Microscope, Package, Settings, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Medical Equipment",
    desc: "State-of-the-art imaging and surgical systems for modern hospitals.",
    icon: Stethoscope
  },
  {
    title: "Laboratory Solutions",
    desc: "Advanced diagnostic equipment and precision laboratory instruments.",
    icon: Microscope
  },
  {
    title: "Medical Supplies",
    desc: "High-quality consumables and essential healthcare accessories.",
    icon: Activity
  },
  {
    title: "Packaging Solutions",
    desc: "Specialized sterilization and protective medical packaging.",
    icon: Package
  },
  {
    title: "Technical Support",
    desc: "Professional maintenance and biomedical technical services.",
    icon: Settings
  },
  {
    title: "Consultancy",
    desc: "Healthcare management and institution development advisory.",
    icon: Users
  }
]

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <Hero />
      
      {/* Overview Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-left-12 duration-1000 ease-out fill-mode-both">
              <Image 
                src="https://picsum.photos/seed/healthsync_about/800/450" 
                alt="Healthcare Excellence" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-110"
                data-ai-hint="medical doctor"
              />
            </div>
            <div className="space-y-6 animate-in slide-in-from-right-12 duration-1000 ease-out fill-mode-both">
              <h2 className="text-3xl font-headline font-bold text-secondary">A Legacy of Trust in Healthcare Solutions</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                HealthSync Medical Solutions Corporation is a premier provider dedicated to elevating the standard of patient care across the Philippines. We combine clinical innovation with reliable service to empower healthcare institutions with the tools they need to save lives.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <h4 className="text-4xl font-headline font-bold text-primary">15+</h4>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-4xl font-headline font-bold text-primary">1k+</h4>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Products Catalog</p>
                </div>
              </div>
              <Button size="lg" variant="ghost" className="px-0 text-primary font-bold hover:bg-transparent group" asChild>
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Our Journey <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Comprehensive Medical Solutions</h2>
            <p className="text-muted-foreground">From laboratory setups to daily medical consumables, we provide end-to-end support for your medical facility.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-secondary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">{service.desc}</p>
                  <Button variant="link" className="px-0 h-auto text-primary font-bold group/btn" asChild>
                    <Link href="/products" className="flex items-center gap-1">
                      View Catalog <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FinancialCalculator />

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-1000 fill-mode-both">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
              Ready to Upgrade Your <br className="hidden md:block" /> Healthcare Facility?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Partner with HealthSync today for reliable, cost-effective, and high-quality medical solutions. Let's work together for better patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold transition-all hover:scale-105">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-10 text-lg font-bold hover:text-white transition-all hover:scale-105">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 animate-pulse duration-[12000ms]" />
      </section>
    </div>
  )
}
