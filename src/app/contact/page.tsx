import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-secondary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Have a question or need a formal quote? Our team is ready to assist your healthcare institution.
          </p>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-none">
              <CardHeader className="bg-primary/5 border-b p-8">
                <CardTitle className="text-2xl font-headline text-secondary">Request a Quote</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+63 912 345 6789" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" placeholder="Describe your equipment needs or inquiry..." className="min-h-[150px]" />
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="w-full h-12 text-base font-bold uppercase tracking-widest">
                      Request Quote
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="grid gap-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Office Address</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Darangan Bridge, Binangonan, 1940 Rizal, Philippines
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Call Us</h4>
                      <p className="text-sm text-muted-foreground">+63 (000) 000-0000</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Business Hours</h4>
                      <p className="text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-[300px] shadow-lg border relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.97159938971!2d121.18141416977539!3d14.499092499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d8c58066f2b7%3A0x8898980877995f51!2sHealthsync+Medical+equipment+and+Supplies+Trading!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>

              {/* QR Code Section */}
              <Card className="bg-secondary text-white border-none shadow-lg">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold">Scan Business Card</h4>
                    <p className="text-xs text-secondary-foreground/60">Instant access to our digital profile</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg w-20 h-20">
                     <div className="w-full h-full bg-muted animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}