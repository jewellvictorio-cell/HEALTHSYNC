"use client"

import * as React from "react"
import { type Job } from "@/lib/store"
import { useJobs } from "@/lib/useStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Upload, X, Calendar, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react"

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }) } catch { return d }
}

function JobDetailModal({ job, onClose }: { job: Job; onClose: () => void }) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-primary px-8 py-6 rounded-t-2xl relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <Badge variant="secondary" className={`uppercase text-[10px] tracking-widest font-bold ${job.type === "Full-time" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {job.type}
                </Badge>
              </div>
              <h2 className="text-2xl font-headline font-bold text-white mb-2">{job.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Posted {formatDate(job.postedDate)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 flex-shrink-0 mt-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          {job.longDescription ? (
            <div className="prose prose-sm max-w-none text-secondary/80 leading-relaxed whitespace-pre-line">
              {job.longDescription}
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">{job.shortDescription}</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t bg-muted/30 rounded-b-2xl flex-shrink-0 flex gap-3">
          <Button variant="outline" onClick={onClose} className="px-6">Close</Button>
          <Button className="flex-1 font-bold uppercase tracking-widest text-xs transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
            Apply for This Position
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CareersPage() {
  const jobs = useJobs()
  const [selectedJob,  setSelectedJob]  = React.useState<Job | null>(null)
  const [successMsg,   setSuccessMsg]   = React.useState("")
  const [errorMsg,     setErrorMsg]     = React.useState("")
  const [formData,     setFormData]     = React.useState({ name: "", email: "", phone: "", position: "", message: "" })
  const [countryCode,  setCountryCode]  = React.useState("+63")
  const [phoneNumber,  setPhoneNumber]  = React.useState("")
  const [countryOpen,  setCountryOpen]  = React.useState(false)

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



  function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || (!formData.position && !selectedJob)) {
      setErrorMsg("PLEASE FILL OUT ALL REQUIRED FIELDS.")
      setSuccessMsg("")
      return
    }
    setErrorMsg("")
    setSuccessMsg("APPLICATION SUBMITTED SUCCESSFULLY!")
    setFormData({ name: "", email: "", phone: "", position: "", message: "" })
    setPhoneNumber("")
    setCountryCode("+63")
    setTimeout(() => setSuccessMsg(""), 5000)
  }

  function formatRelativeDate(d: string) {
    try {
      const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
      if (diff === 0) return "Today"
      if (diff === 1) return "1 day ago"
      if (diff < 30)  return `${diff} days ago`
      if (diff < 60)  return "1 month ago"
      return `${Math.floor(diff / 30)} months ago`
    } catch { return d }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 overflow-hidden">
      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}

      <section className="bg-secondary text-white py-24 text-center relative">
        <div className="container mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Join the HealthSync Team</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Build your career with a company dedicated to medical excellence and clinical innovation.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12">
            {/* Job Listings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold text-secondary flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-700">
                <Briefcase className="h-6 w-6 text-primary" /> Open Positions
                <span className="text-sm font-normal text-muted-foreground ml-2">({jobs.length} openings)</span>
              </h2>
              <div className="grid gap-4">
                {jobs.map((job, i) => (
                  <Card key={job.id} className="hover:border-primary/50 transition-all shadow-sm group animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</CardTitle>
                        <Badge variant="secondary" className="uppercase text-[10px] tracking-widest shrink-0">{job.type}</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                        <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</div>
                        <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> Posted {formatRelativeDate(job.postedDate)}</div>
                      </div>
                      <CardDescription className="text-base mb-4">{job.shortDescription}</CardDescription>
                    </CardHeader>
                    <div className="px-6 pb-6">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto px-10 font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary hover:text-white gap-2"
                        onClick={() => setSelectedJob(job)}
                      >
                        View Details <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {jobs.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-muted">
                    <Briefcase className="h-12 w-12 text-muted/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-secondary">No open positions right now</h3>
                    <p className="text-muted-foreground text-sm mt-2">Check back soon or send your resume to our HR team.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Application Form */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
              <Card className="shadow-xl border-none sticky top-24 overflow-visible">
                <CardHeader className="bg-primary p-8 text-white rounded-t-xl relative">
                  <div className="relative z-10">
                    <CardTitle className="text-2xl">Apply Now</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Submit your application to our HR department.</CardDescription>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-5" onSubmit={handleApplySubmit}>
                    
                    {errorMsg && (
                      <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl flex items-center gap-2 mb-6">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm font-bold tracking-wide">{errorMsg}</p>
                      </div>
                    )}

                    {successMsg && (
                      <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-2 mb-6">
                        <CheckCircle2 className="h-5 w-5" />
                        <p className="text-sm font-bold tracking-wide">{successMsg}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name *</Label>
                      <Input id="fullname" value={formData.name} onChange={e => setFormData(f => ({...f, name: e.target.value}))} placeholder="Your Full Name" className="focus:border-primary border-2" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="career-email">Email *</Label>
                        <Input id="career-email" type="email" value={formData.email} onChange={e => setFormData(f => ({...f, email: e.target.value}))} placeholder="Your Email Address" className="focus:border-primary border-2" />
                      </div>
                      <div className="space-y-2 relative z-[200]">
                        <Label htmlFor="career-phone">Phone *</Label>
                        <div className="flex border-2 rounded-lg overflow-visible focus-within:border-primary transition-colors relative">
                          {/* Country code selector */}
                          <button
                            type="button"
                            onClick={() => setCountryOpen(!countryOpen)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-muted border-r border-input text-sm font-semibold shrink-0 hover:bg-muted/80 transition-colors"
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
                                  onClick={() => { setCountryCode(c.code); setCountryOpen(false); setFormData(f => ({...f, phone: `${c.code}${phoneNumber}`})) }}
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
                            id="career-phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={e => { setPhoneNumber(e.target.value); setFormData(f => ({...f, phone: `${countryCode}${e.target.value}`})) }}
                            placeholder="9XX XXX XXXX"
                            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none min-w-0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Desired Position *</Label>
                      <Select value={formData.position || selectedJob?.id || ""} onValueChange={v => setFormData(f => ({...f, position: v}))}>
                        <SelectTrigger className="focus:border-primary border-2">
                          <SelectValue placeholder="Select a job" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobs.map(j => (
                            <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">Upload CV / Resume (PDF)</Label>
                      <div className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group hover:border-primary/50">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                        <p className="text-xs text-muted-foreground group-hover:text-secondary">Click or drag and drop your file here</p>
                        <input type="file" id="resume" className="hidden" accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="career-msg">Message (Optional)</Label>
                      <Textarea id="career-msg" value={formData.message} onChange={e => setFormData(f => ({...f, message: e.target.value}))} placeholder="Tell us about yourself..." className="focus:border-primary border-2 min-h-[100px]" />
                    </div>
                    <Button type="submit" className="w-full h-12 font-bold uppercase tracking-widest mt-4 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}