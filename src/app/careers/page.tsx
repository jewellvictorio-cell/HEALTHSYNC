import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Upload, GraduationCap, Laptop } from "lucide-react"

const jobs = [
  { 
    title: "Biomedical Technician", 
    location: "Rizal / Manila", 
    type: "Full-Time", 
    summary: "Responsible for maintenance and calibration of hospital equipment.",
    qualifications: "BS Biomedical Engineering or equivalent." 
  },
  { 
    title: "Sales Representative", 
    location: "Nationwide", 
    type: "Full-Time", 
    summary: "Grow our network of partner hospitals and clinics.",
    qualifications: "Experience in medical sales preferred." 
  },
  { 
    title: "Product Specialist", 
    location: "Rizal", 
    type: "Full-Time", 
    summary: "Provide clinical training for lab and imaging equipment.",
    qualifications: "Medical background (Nurse/MedTech) is an advantage." 
  },
  { 
    title: "HR Officer", 
    location: "Binangonan, Rizal", 
    type: "Full-Time", 
    summary: "Manage talent acquisition and employee relations.",
    qualifications: "Degree in HR or Psychology." 
  }
]

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <section className="bg-secondary text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Join the HealthSync Team</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Build your career with a company dedicated to medical excellence and clinical innovation.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12">
            {/* Job Listings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold text-secondary flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" /> Open Positions
              </h2>
              <div className="grid gap-4">
                {jobs.map((job, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-all shadow-sm">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                        <Badge variant="secondary" className="uppercase text-[10px] tracking-widest">{job.type}</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Posted 2 days ago
                        </div>
                      </div>
                      <CardDescription className="text-base mb-4">{job.summary}</CardDescription>
                      <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                        <GraduationCap className="h-4 w-4 text-primary" /> {job.qualifications}
                      </div>
                    </CardHeader>
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full sm:w-auto px-10 font-bold uppercase tracking-widest text-xs">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="space-y-8">
              <Card className="shadow-xl border-none sticky top-24">
                <CardHeader className="bg-primary p-8 text-white rounded-t-xl">
                  <CardTitle className="text-2xl">Apply Now</CardTitle>
                  <CardDescription className="text-primary-foreground/70">Submit your application to our HR department.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input id="fullname" placeholder="Juan Dela Cruz" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="career-email">Email</Label>
                        <Input id="career-email" type="email" placeholder="juan@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="career-phone">Phone</Label>
                        <Input id="career-phone" placeholder="0917-xxx-xxxx" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Desired Position</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobs.map(j => (
                            <SelectItem key={j.title} value={j.title.toLowerCase().replace(' ', '-')}>
                              {j.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">Upload CV / Resume (PDF)</Label>
                      <div className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                        <p className="text-xs text-muted-foreground">Click or drag and drop your file here</p>
                        <input type="file" id="resume" className="hidden" accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="career-msg">Message (Optional)</Label>
                      <Textarea id="career-msg" placeholder="Tell us about yourself..." />
                    </div>
                    <Button className="w-full h-12 font-bold uppercase tracking-widest mt-4">Submit Application</Button>
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