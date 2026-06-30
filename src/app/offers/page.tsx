import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Wallet, RefreshCw, Key, Landmark } from "lucide-react"

const rentToOwnBenefits = [
  "No massive initial capital required",
  "Fixed monthly rates for better budgeting",
  "Full ownership transferred after final payment",
  "Maintenance and repair support during term",
  "Option to upgrade to newer models anytime"
]

const paymentPlanBenefits = [
  "12, 24, 36, and 48-month terms available",
  "Low service fees for long-term partners",
  "Quick approval process for registered hospitals",
  "Flexible repayment via post-dated checks",
  "Tax-deductible monthly payments"
]

export default function OffersPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section className="bg-primary text-white py-24 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Financial Solutions</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We understand the challenges of medical procurement. That's why we offer flexible paths to high-end equipment ownership.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse duration-[10000ms]" />
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="border-none shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-left-8 duration-1000 fill-mode-both group">
              <div className="bg-secondary p-8 text-white relative">
                <div className="relative z-10">
                  <Key className="h-12 w-12 text-primary mb-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                  <h2 className="text-3xl font-headline font-bold mb-2">Rent-To-Own</h2>
                  <p className="text-secondary-foreground/70">The easiest way to modernize your facility with zero stress.</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              </div>
              <CardContent className="p-8 flex-grow">
                <ul className="space-y-4">
                  {rentToOwnBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Button className="w-full h-12 font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">Inquire for Rent-To-Own</Button>
              </div>
            </Card>

            <Card className="border-none shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-right-8 duration-1000 fill-mode-both group">
              <div className="bg-muted p-8 text-secondary relative">
                <div className="relative z-10">
                  <Landmark className="h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                  <h2 className="text-3xl font-headline font-bold mb-2">Long-Term Plans</h2>
                  <p className="text-muted-foreground">Structured financing for large-scale clinical developments.</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              </div>
              <CardContent className="p-8 flex-grow">
                <ul className="space-y-4">
                  {paymentPlanBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Button variant="secondary" className="w-full h-12 font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-secondary/20">Request Payment Plan</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}