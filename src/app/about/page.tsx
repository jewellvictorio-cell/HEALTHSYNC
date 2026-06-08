import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye, Heart, Shield, Lightbulb, UserCheck, Star } from "lucide-react"

const values = [
  { icon: Shield, title: "Integrity", desc: "We uphold the highest ethical standards in all our medical dealings." },
  { icon: Star, title: "Excellence", desc: "Striving for superior quality in every product and clinical service." },
  { icon: Lightbulb, title: "Innovation", desc: "Constantly seeking better healthcare technologies for our clients." },
  { icon: Heart, title: "Commitment", desc: "Dedicated to the long-term success of healthcare providers." },
  { icon: UserCheck, title: "Customer Focus", desc: "Prioritizing the needs of clinics, hospitals, and medical staff." }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="bg-secondary text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Mission to Heal</h1>
            <p className="text-xl text-secondary-foreground/70 leading-relaxed">
              Discover why HealthSync Medical Solutions is the preferred partner for healthcare excellence in the Philippines.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-secondary">ABOUT US</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Healthsync Medical Equipment and Supplies Trading is a trusted partner in the world of medical equipment supply.
                </p>
                <p>
                  Established with a vision to revolutionize the local healthcare landscape, we specialize in high-end laboratory gear, surgical equipment, and essential medical consumables that meet international safety standards.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/about_profile/800/800" 
                alt="HealthSync Team at Work" 
                fill 
                className="object-cover"
                data-ai-hint="medical laboratory"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                "To become one of the leading providers of innovative healthcare and medical solutions that contribute to better patient care and healthcare excellence."
              </p>
            </div>
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                "To deliver reliable, high-quality, and cost-effective medical products and services while building long-term partnerships with healthcare institutions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The foundation of everything we do at HealthSync.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow border-none bg-muted/30">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-secondary mb-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Management & Leadership</h2>
            <p className="text-muted-foreground">The experts driving healthcare innovation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md mx-auto max-w-[250px]">
                <Image src="https://picsum.photos/seed/leader1/400/400" alt="Executive" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-secondary">Owner Name</h4>
                <p className="text-sm text-primary font-semibold uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md mx-auto max-w-[250px]">
                <Image src="https://picsum.photos/seed/leader2/400/400" alt="Executive" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-secondary">Executive Name</h4>
                <p className="text-sm text-primary font-semibold uppercase tracking-widest">COO</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md mx-auto max-w-[250px]">
                <Image src="https://picsum.photos/seed/leader3/400/400" alt="Executive" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-secondary">Executive Name</h4>
                <p className="text-sm text-primary font-semibold uppercase tracking-widest">Head of Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
