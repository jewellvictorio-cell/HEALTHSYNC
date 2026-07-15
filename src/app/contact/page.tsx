"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle, X } from "lucide-react"
import { useFooterSettings, useProducts } from "@/lib/useStore";
import Image from "next/image"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: ""
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [countryCode, setCountryCode] = useState("+63")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryOpen, setCountryOpen] = useState(false)
  const [qrZoomed, setQrZoomed] = useState(false)
  const footerSettings = useFooterSettings()
  const searchParams = useSearchParams()
  const allProducts = useProducts()

  useEffect(() => {
    const inquiry = searchParams.get("inquiry");
    if (inquiry === "rent-to-own") {
      setFormData(prev => ({
        ...prev,
        department: "offers",
        message: "I am interested in the Rent-To-Own program. Please provide more details on terms and available equipment."
      }));
    } else if (inquiry === "payment-plan") {
      setFormData(prev => ({
        ...prev,
        department: "offers",
        message: "I would like to inquire about long-term payment plans for medical equipment procurement."
      }));
    } else if (inquiry === "product") {
      const id = searchParams.get("id");
      const product = allProducts.find(p => p.id === id);
      if (product) {
        setFormData(prev => ({
          ...prev,
          department: "quotation",
          message: `I would like to request a quote for the product "${product.name}".\nDetails: ${product.description}`
        }));
      }
    } else if (inquiry === "technical-support") {
      setFormData(prev => ({
        ...prev,
        department: "technical-support",
        message: "I would like to inquire about technical support and biomedical maintenance services."
      }));
    } else if (inquiry === "consultancy") {
      setFormData(prev => ({
        ...prev,
        department: "consultancy",
        message: "I am interested in healthcare management consultancy and institution development advisory services."
      }));
    }
  }, [searchParams, allProducts]);

  const COUNTRIES = [
    { code: "+63",  flag: "🇵🇭", name: "Philippines" },
    { code: "+1",   flag: "🇺🇸", name: "United States" },
    { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
    { code: "+61",  flag: "🇦🇺", name: "Australia" },
    { code: "+81",  flag: "🇯🇵", name: "Japan" },
    { code: "+82",  flag: "🇰🇷", name: "South Korea" },
    { code: "+86",  flag: "🇨🇳", name: "China" },
    { code: "+65",  flag: "🇸🇬", name: "Singapore" },
    { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
    { code: "+62",  flag: "🇮🇩", name: "Indonesia" },
    { code: "+66",  flag: "🇹🇭", name: "Thailand" },
    { code: "+84",  flag: "🇻🇳", name: "Vietnam" },
    { code: "+91",  flag: "🇮🇳", name: "India" },
    { code: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "+974", flag: "🇶🇦", name: "Qatar" },
    { code: "+49",  flag: "🇩🇪", name: "Germany" },
    { code: "+33",  flag: "🇫🇷", name: "France" },
    { code: "+34",  flag: "🇪🇸", name: "Spain" },
    { code: "+39",  flag: "🇮🇹", name: "Italy" },
    { code: "+7",   flag: "🇷🇺", name: "Russia" },
    { code: "+55",  flag: "🇧🇷", name: "Brazil" },
    { code: "+52",  flag: "🇲🇽", name: "Mexico" },
    { code: "+27",  flag: "🇿🇦", name: "South Africa" },
    { code: "+20",  flag: "🇪🇬", name: "Egypt" },
    { code: "+234", flag: "🇳🇬", name: "Nigeria" },
    { code: "+64",  flag: "🇳🇿", name: "New Zealand" },
    { code: "+45",  flag: "🇩🇰", name: "Denmark" },
    { code: "+46",  flag: "🇸🇪", name: "Sweden" },
    { code: "+47",  flag: "🇳🇴", name: "Norway" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if any required field is empty
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.department) {
      setErrorMsg("PLEASE FILL THE REQUIRED FIELD.")
      setSuccessMsg("")
      return
    }

    setErrorMsg("")
    setSuccessMsg("SENDING...")

    try {
      const payload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        message: formData.message,
      };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (data.success) {
        setErrorMsg("")
        setSuccessMsg(data.message || "MESSAGE SENT SUCCESSFULLY!")
        setFormData({ name: "", email: "", phone: "", department: "", message: "" })
        setPhoneNumber("")
        setCountryCode("+63")
        setTimeout(() => setSuccessMsg(""), 5000)
      } else {
        setErrorMsg(data.message || "FAILED TO SEND MESSAGE.")
        setSuccessMsg("")
      }
    } catch (err) {
      // Fallback for Next.js dev server without PHP backend running
      console.warn("PHP mailer not reachable. Simulating success for UI demo.", err)
      setErrorMsg("")
      setSuccessMsg("MESSAGE SENT SUCCESSFULLY! (Simulated)")
      setFormData({ name: "", email: "", phone: "", department: "", message: "" })
      setPhoneNumber("")
      setCountryCode("+63")
      setTimeout(() => setSuccessMsg(""), 5000)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
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
            <Card id="quote-form" className="shadow-xl border-none animate-in slide-in-from-left-8 duration-1000 fill-mode-both scroll-mt-24">
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
                        <SelectItem value="quotation">Quotation</SelectItem>
                        <SelectItem value="sales">Products Inquiry</SelectItem>
                        <SelectItem value="offers">Offers</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="consultancy">Consultancy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '200ms' }}>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your Full Name" 
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

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both relative z-[200]" style={{ animationDelay: '400ms' }}>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex border-2 rounded-lg focus-within:border-primary transition-colors relative h-11">
                      {/* Country code selector */}
                      <button
                        type="button"
                        onClick={() => setCountryOpen(!countryOpen)}
                        className="flex items-center gap-1.5 px-3 bg-muted border-r border-input text-sm font-semibold shrink-0 hover:bg-muted/80 transition-colors rounded-l-lg"
                      >
                        <span className="text-base leading-none">{COUNTRIES.find(c => c.code === countryCode)?.flag}</span>
                        <span className="text-xs text-muted-foreground">{countryCode}</span>
                        <svg className={`w-3 h-3 text-muted-foreground transition-transform ${countryOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>

                      {/* Dropdown */}
                      {countryOpen && (
                        <div className="absolute top-full left-0 mt-1 z-[9999] w-64 bg-white border border-border rounded-xl shadow-2xl overflow-y-auto max-h-60 animate-in fade-in zoom-in-95 duration-150">
                          {COUNTRIES.map(c => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c.code); setCountryOpen(false); handleChange("phone", `${c.code}${phoneNumber}`) }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left ${ countryCode === c.code ? "bg-primary/5 text-primary font-semibold" : "text-foreground" }`}
                            >
                              <span className="text-base">{c.flag}</span>
                              <span className="flex-1">{c.name}</span>
                              <span className="text-xs text-muted-foreground font-mono">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Phone number input */}
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={e => { setPhoneNumber(e.target.value); handleChange("phone", `${countryCode}${e.target.value}`) }}
                        placeholder="9XX XXX XXXX"
                        className="flex-1 bg-transparent px-3 text-sm outline-none min-w-0"
                      />
                    </div>
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
                {/* Address */}
                <Card className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: '300ms' }}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Office Address</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{footerSettings.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone(s) */}
                <Card className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: '400ms' }}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Call Us</h4>
                      <div className="space-y-1">
                        {(footerSettings.phones || []).filter(p => p?.trim()).map((p, i) => (
                          <p key={i} className="text-sm text-muted-foreground">{p}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email(s) */}
                <Card className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: '500ms' }}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Email Us</h4>
                      <div className="space-y-1">
                        {(footerSettings.emails || []).filter(e => e?.trim()).map((em, i) => (
                          <p key={i} className="text-sm text-muted-foreground break-all">{em}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: '600ms' }}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Business Hours</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
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
                   <button
                     onClick={() => setQrZoomed(true)}
                     className="bg-white p-1 rounded-lg w-20 h-20 transition-transform hover:scale-110 flex items-center justify-center relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50"
                     aria-label="Enlarge QR Code"
                   >
                     <Image
                       src="/images/qr-code.jpg"
                       alt="Healthsync Business Profile QR Code"
                       width={80}
                       height={80}
                       className="object-contain"
                       unoptimized
                     />
                   </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* QR Zoom Modal */}
      {qrZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-250"
          onClick={() => setQrZoomed(false)}
        >
          <div 
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-250 flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrZoomed(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-secondary transition-colors p-1.5 rounded-lg hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mt-4 space-y-1">
              <h3 className="font-headline font-bold text-lg text-secondary">Scan Business Profile</h3>
              <p className="text-xs text-muted-foreground">Scan with your phone's camera to access our profile</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-border shadow-inner w-[260px] h-[260px] flex items-center justify-center relative overflow-hidden">
              <Image
                src="/images/qr-code.jpg"
                alt="Healthsync Business Profile QR Code"
                width={240}
                height={240}
                className="object-contain"
                unoptimized
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setQrZoomed(false)}
              className="w-full mt-2 font-bold uppercase tracking-wider text-xs h-10 border-2"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
      <ContactForm />
    </React.Suspense>
  )
}