"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: ""
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if any required field is empty
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.department) {
      setErrorMsg("PLEASE FILL THE REQUIRED FIELD.")
      setSuccessMsg("")
      return
    }

    // Success
    setErrorMsg("")
    setSuccessMsg("MESSAGE SENT SUCCESSFULLY!")
    setFormData({ name: "", email: "", phone: "", department: "", message: "" })
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMsg("")
    }, 5000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Have a question or need a formal quote? Our team is ready to assist your healthcare institution.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl" />
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-none animate-in slide-in-from-left-8 duration-1000 fill-mode-both">
              <CardHeader className="bg-primary/5 border-b p-8">
                <CardTitle className="text-2xl font-headline text-secondary flex items-center gap-3">
                  <Send className="h-6 w-6 text-primary" /> Request a Quote
                </CardTitle>
                <CardDescription>Fill out the form below and we'll route it to the appropriate department.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Department Dropdown */}
                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '100ms' }}>
                    <Label>Inquiry Type (Department)</Label>
                    <Select value={formData.department} onValueChange={(val) => handleChange("department", val)}>
                      <SelectTrigger className="focus:ring-primary border-2 h-11">
                        <SelectValue placeholder="Select a department to contact..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quotation">Quotation (Official Email)</SelectItem>
                        <SelectItem value="sales">Sales (Products Inquiry)</SelectItem>
                        <SelectItem value="hr">Human Resources (Careers)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '200ms' }}>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11" 
                    />
                  </div>

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '300ms' }}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your Email Address" 
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11" 
                    />
                  </div>

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '400ms' }}>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+63" 
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11" 
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '500ms' }}>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..." 
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="min-h-[150px] focus-visible:ring-primary border-2" 
                    />
                  </div>

                  {/* Validation Messages */}
                  <div className="sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '600ms' }}>
                    {errorMsg && (
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20 animate-in fade-in zoom-in-95">
                        <AlertCircle className="h-5 w-5" />
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-500/10 p-4 rounded-md border border-emerald-500/20 animate-in fade-in zoom-in-95">
                        <CheckCircle className="h-5 w-5" />
                        {successMsg}
                      </div>
                    )}
                    <Button type="submit" className="w-full h-12 text-base font-bold uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-primary/20">
                      SEND MESSAGE
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-1000 fill-mode-both">
              <div className="grid gap-6">
                {[
                  { icon: MapPin, title: "Office Address", content: "Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines" },
                  { icon: Phone, title: "Call Us", content: "+63 915 392 5794" },
                  { icon: Mail, title: "Email Us", content: "healthsync.med@gmail.com" },
                  { icon: Clock, title: "Business Hours", content: "Mon - Fri: 8:00 AM - 5:00 PM" }
                ].map((item, i) => (
                  <Card key={i} className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-[300px] shadow-lg border relative animate-in zoom-in-95 duration-1000 delay-700 fill-mode-both group">
                <iframe 
                  src="https://maps.google.com/maps?q=Healthsync+Medical+equipment+and+Supplies+Trading,+Binangonan,+Rizal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="transition-opacity group-hover:opacity-90"
                ></iframe>
              </div>

              {/* QR Code Section */}
              <Card className="bg-secondary text-white border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-both">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold">Scan Business Profile</h4>
                    <p className="text-xs text-secondary-foreground/60">Instant access to our business profile</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg w-20 h-20 transition-transform hover:scale-110">
                     <div className="w-full h-full bg-muted/20 rounded-md" />
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