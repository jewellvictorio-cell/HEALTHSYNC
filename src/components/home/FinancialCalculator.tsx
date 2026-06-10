"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, Info } from "lucide-react"

export function FinancialCalculator() {
  const [amount, setAmount] = React.useState([100000])
  const [months, setMonths] = React.useState([24])

  const monthlyPayment = (amount[0] * 1.05) / months[0]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary mb-4">
              Financing Options
            </div>
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Equipment Financing Estimator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We offer affordable monthly payments and business-friendly financing to help your facility upgrade
              medical hardware without the burden of heavy upfront costs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="shadow-lg border-none animate-in slide-in-from-left-8 duration-700 delay-200 fill-mode-both">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Plan Estimator
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Adjust the values to estimate your monthly dues.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10 py-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Equipment Value (₱)</Label>
                    <span className="text-lg font-bold text-primary transition-all duration-300">₱{amount[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={amount}
                    onValueChange={setAmount}
                    max={5000000}
                    step={50000}
                    className="py-4"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Payment Period (Months)</Label>
                    <span className="text-lg font-bold text-primary transition-all duration-300">{months[0]} Months</span>
                  </div>
                  <Slider
                    value={months}
                    onValueChange={setMonths}
                    min={12}
                    max={60}
                    step={6}
                    className="py-4"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary text-white shadow-2xl border-none flex flex-col justify-between animate-in slide-in-from-right-8 duration-700 delay-400 fill-mode-both">
              <CardHeader>
                <CardTitle className="text-white">Estimated Monthly Payment</CardTitle>
                <CardDescription className="text-secondary-foreground/70">Ownership after completion of terms.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center items-center py-8">
                <div className="text-center animate-in zoom-in-95 duration-500 delay-700 fill-mode-both">
                  <span className="text-5xl font-headline font-bold text-primary">
                    ₱{Math.round(monthlyPayment).toLocaleString()}
                  </span>
                  <p className="mt-2 text-secondary-foreground/60">per month (est. 5% service fee)</p>
                </div>

                <div className="mt-8 space-y-3 w-full">
                  {[
                    "Lower upfront costs",
                    "Ownership after completion",
                    "Full technical support included",
                    "Flexible repayment options"
                  ].map((benefit, i) => (
                    <div key={benefit} className="flex items-center gap-3 text-sm animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${900 + (i * 100)}ms` }}>
                      <div className="bg-primary/20 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-6">
                <Button className="w-full bg-white text-secondary hover:bg-white/90 h-12 font-bold transition-all hover:scale-[1.02]" size="lg">
                  Request Formal Proposal
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
