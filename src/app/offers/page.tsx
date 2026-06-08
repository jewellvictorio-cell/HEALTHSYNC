import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck, Wallet, RefreshCw, Key, Landmark } from "lucide-react"
import { FinancialCalculator } from "@/components/home/FinancialCalculator"

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
    <div className="flex flex-col">
      <section className="bg-primary text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Financial Solutions</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We understand the challenges of medical procurement. That's why we offer flexible paths to high-end equipment ownership.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="border-none shadow-xl overflow-hidden flex flex-col">
              <div className="bg-secondary p-8 text-white">
                <Key className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-headline font-bold mb-2">Rent-To-Own</h2>
                <p className="text-secondary-foreground/70">The easiest way to modernize your facility with zero stress.</p>
              </div>
              <CardContent className="p-8 flex-grow">
                <ul className="space-y-4">
                  {rentToOwnBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Button className="w-full h-12 font-bold uppercase tracking-widest">Inquire for Rent-To-Own</Button>
              </div>
            </Card>

            <Card className="border-none shadow-xl overflow-hidden flex flex-col">
              <div className="bg-muted p-8 text-secondary">
                <Landmark className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-headline font-bold mb-2">Long-Term Plans</h2>
                <p className="text-muted-foreground">Structured financing for large-scale clinical developments.</p>
              </div>
              <CardContent className="p-8 flex-grow">
                <ul className="space-y-4">
                  {paymentPlanBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Button variant="secondary" className="w-full h-12 font-bold uppercase tracking-widest">Request Payment Plan</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <FinancialCalculator />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-muted/30 rounded-3xl p-12 text-center space-y-8">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-3xl font-headline font-bold text-secondary">Peace of Mind Guaranteed</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All our financial programs include a comprehensive service level agreement (SLA). We ensure your equipment stays operational 24/7, so you can focus on what matters most: patient health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-10 h-12 font-bold">Apply Now</Button>
              <Button size="lg" variant="outline" className="px-10 h-12 font-bold">Download Terms PDF</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}