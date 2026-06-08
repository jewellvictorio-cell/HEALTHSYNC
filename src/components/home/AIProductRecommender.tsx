"use client"

import * as React from "react"
import { recommendMedicalEquipment } from "@/ai/flows/medical-equipment-recommendation-flow"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Send, CheckCircle2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function AIProductRecommender() {
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [recommendations, setRecommendations] = React.useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const result = await recommendMedicalEquipment({ clinicalNeedsDescription: query })
      setRecommendations(result.recommendations)
      if (result.recommendations.length === 0) {
        toast({
          title: "No results found",
          description: "Try describing your clinical needs in more detail.",
        })
      }
    } catch (error) {
      toast({
        title: "Recommendation Error",
        description: "Failed to get recommendations. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                <span>AI Clinical Advisor</span>
              </div>
              <h2 className="text-3xl font-headline font-bold text-secondary">
                Intelligent Product Matching
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Describe your hospital's clinical needs or specific requirements, and our AI will recommend the most suitable solutions from our extensive catalog.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="e.g. We need portable imaging solutions for a remote clinic with limited power supply..."
                  className="min-h-[150px] resize-none border-2 focus-visible:ring-primary"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                />
                <Button className="w-full h-12 gap-2" disabled={loading || !query.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing Needs...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="relative min-h-[400px] rounded-2xl border-2 border-dashed border-muted p-8 flex flex-col justify-center items-center bg-muted/5">
              {recommendations.length > 0 ? (
                <div className="w-full grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Recommended Solutions
                  </h3>
                  <div className="grid gap-4">
                    {recommendations.map((rec, i) => (
                      <Card key={i} className="hover:border-primary/50 transition-colors shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-bold">{rec.name}</CardTitle>
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                              {rec.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                          <Button variant="link" className="px-0 h-auto mt-2 text-primary text-xs font-bold">
                            View Product Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-sm space-y-4">
                  <div className="mx-auto bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center text-primary/30">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary/60">Awaiting Clinical Brief</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit a description of your clinic's needs to see automated product suggestions here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}