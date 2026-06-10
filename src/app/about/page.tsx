import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye, Heart, Shield, Lightbulb, Star, Zap } from "lucide-react"

const values = [
  { 
    icon: Shield, 
    title: "HONORABILITY", 
    desc: "Conducting business with integrity, honesty, and ethical principles." 
  },
  { 
    icon: Star, 
    title: "SERVICE EXCELLENCE", 
    desc: "Striving for excellence in service to healthcare professionals and institutions." 
  },
  { 
    icon: Lightbulb, 
    title: "MINDFUL INNOVATION", 
    desc: "Embracing continuous improvement and innovative solutions." 
  },
  { 
    icon: Zap, 
    title: "EFFICIENCY", 
    desc: "Operating with efficiency to streamline the procurement process." 
  },
  { 
    icon: Heart, 
    title: "SATISFACTION", 
    desc: "Prioritizing customer satisfaction through quality products and service." 
  }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Profile Section */}
      <section className="py-24 bg-secondary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-in slide-in-from-left-12 duration-1000 fill-mode-both">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">ABOUT US</h1>
              <div className="space-y-6 text-white/90 leading-relaxed text-lg">
                <p>
                  Healthsync Medical Solutions Corporation is a trusted partner in the world of medical equipment supply.
                </p>
                <ul className="space-y-4">
                  {[
                    "With a focus on quality and reliability, we are dedicated to providing healthcare professionals and institutions with cutting-edge solutions.",
                    "Our commitment is to enhance patient care by delivering a diverse range of high-quality medical equipment tailored to meet the unique needs of modern healthcare practices.",
                    "We prioritize customer satisfaction, ensuring seamless access to essential resources for healthcare delivery.",
                    "Choose us for dependable service, top-notch products, and a commitment to advancing healthcare standards."
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${400 + (i * 150)}ms` }}>
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-8 ring-white/10 animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
              <Image 
                src="/images/about_hero_medical.png" 
                alt="HealthSync Team at Work" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
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
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 animate-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce duration-[3000ms]">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                "To build a legacy faith, excellence, and service in medical equipment and supplies trading, guided by God's purpose while contributing to better healthcare for generations."
              </p>
            </div>
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 animate-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce duration-[3000ms] delay-500">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                "To provide top-grade medical equipment and supplies with integrity and excellence, guided by faith in God and a commitment to serve with honesty, reliability, and care."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in duration-1000">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The foundation of everything we do at HealthSync.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition-all duration-300 border-none bg-muted/30 group animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mx-auto mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in duration-1000">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Management & Leadership</h2>
            <p className="text-muted-foreground">The experts driving healthcare innovation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { name: "Renz Marlon Buban", role: "President" },
              { name: "Riena Mae Buban", role: "Corporate Secretary" },
              { name: "John Michael Siochi", role: "Chief Finance Officer" },
              { name: "Jobelle Velasquez", role: "Finance Analyst" },
              { name: "Donmark Capispisan", role: "Technical Coordinator" },
              { name: "Marwinn Vicente", role: "Sales Coordinator" }
            ].map((member, i) => (
              <div key={member.name} className="text-center space-y-4 animate-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md mx-auto max-w-[250px] group">
                  <Image src={`https://picsum.photos/seed/${member.name.replace(/\s+/g, '')}/400/400`} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-all duration-500" />
                </div>
                <div className="transition-transform duration-300 hover:translate-y-[-4px]">
                  <h4 className="font-bold text-lg text-secondary">{member.name}</h4>
                  <p className="text-sm text-primary font-semibold uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}