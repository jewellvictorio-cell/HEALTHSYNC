import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Landmark, Building2, Globe } from "lucide-react"

const categories = [
  { title: "Government Hospitals", icon: Landmark, count: "6" },
  { title: "Private Medical Centers", icon: Building2, count: "120+" },
  { title: "Clinical Laboratories", icon: Globe, count: "200+" }
]

const testimonials = [
  {
    name: "Dr. Maria Santos",
    role: "Chief of Hospital",
    text: "HealthSync provided a seamless transition when we upgraded our MRI systems. Their technical support is unmatched.",
    institution: "St. Lukes Medical Center"
  },
  {
    name: "Mark Villanueva",
    role: "Laboratory Director",
    text: "Reliable supplies and precision equipment. We've been partnering with them for over 5 years now with zero issues.",
    institution: "General Hospital Rizal"
  }
]

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-secondary text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Partners in Care</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            We are proud to partner with trusted healthcare institutions dedicated to providing quality care and improving lives.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((c, i) => (
              <Card key={i} className="text-center p-8 border-none shadow-lg bg-muted/30">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <c.icon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-headline font-extrabold text-secondary mb-2">{c.count}</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{c.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Trusted Institutions</h2>
            <p className="text-muted-foreground">A few of the hospitals and partners we proudly serve.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0 opacity-70 hover:opacity-100 flex items-center justify-center h-24">
                <div className="relative w-full h-full">
                  <Image 
                    src={`https://picsum.photos/seed/partner${i}/200/100`} 
                    alt="Partner Logo" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Client Feedback</h2>
            <p className="text-muted-foreground">What healthcare leaders say about HealthSync.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-none shadow-xl bg-secondary text-white relative overflow-hidden">
                <CardContent className="p-12">
                  <Quote className="h-12 w-12 text-primary/30 absolute -top-4 -left-4" />
                  <p className="text-lg italic leading-relaxed mb-8 relative z-10">"{t.text}"</p>
                  <div>
                    <h4 className="font-bold text-xl">{t.name}</h4>
                    <p className="text-primary text-sm font-semibold">{t.role}</p>
                    <p className="text-secondary-foreground/50 text-xs mt-1">{t.institution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
