"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, FileText, ShoppingCart, CheckCircle2, ShieldCheck, Truck, Recycle, Box, ChevronRight, Eye, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProducts, type Product } from "@/lib/store"
import { useProducts } from "@/lib/useStore"

const categories = [
  "All", 
  "Medical Equipment", 
  "Laboratory Equipment", 
  "Consumables | Medical Supplies", 
  "Accessories | Medical Supplies", 
  "Packaging Solutions"
]



const packagingBenefits = [
  { title: "Maximum Protection", desc: "Ensure products are protected from damage, moisture, dust, and impact.", icon: ShieldCheck },
  { title: "Safe Transportation", desc: "Designed to withstand the rigors of transportation and long-distance delivery.", icon: Truck },
  { title: "Quality Materials", desc: "We use high-quality packaging materials that meet international standards.", icon: Box },
  { title: "Eco-Friendly Options", desc: "Sustainable packaging solutions that reduce environmental impact.", icon: Recycle },
  { title: "Tailored Solutions", desc: "Custom packaging solutions tailored to your specific needs.", icon: CheckCircle2 }
]

function ProductsContent() {
  const searchParams = useSearchParams()
  
  const allProducts = useProducts()
  const [activeCategory, setActiveCategory] = React.useState(searchParams.get("category") || "All")
  const [searchTerm,     setSearchTerm]     = React.useState(searchParams.get("search") || "")

  React.useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All")
    setSearchTerm(searchParams.get("search") || "")
  }, [searchParams])

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  function handleViewBrochure(e: React.MouseEvent, base64: string) {
    e.preventDefault()
    try {
      const arr = base64.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while(n--){
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      console.error(err)
      alert("Failed to open brochure.")
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-24 overflow-hidden">
      <section className="bg-secondary text-white py-16 mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl font-headline font-bold mb-4 uppercase tracking-tight">Our Solutions Catalog</h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Explore our comprehensive range of top-grade medical equipment, supplies, and specialized packaging solutions.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
      </section>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-8 animate-in slide-in-from-left-8 duration-1000 fill-mode-both">
            <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" /> Search
              </h3>
              <div className="relative">
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-2 focus:border-primary pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 flex justify-between items-center group ${
                      activeCategory === cat 
                      ? "bg-primary text-white font-bold shadow-lg shadow-primary/20 translate-x-2" 
                      : "hover:bg-primary/5 text-muted-foreground hover:translate-x-1"
                    }`}
                  >
                    {cat}
                    <ChevronRight className={`h-4 w-4 transition-all ${activeCategory === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0"}`} />
                  </button>
                ))}
              </div>
            </div>
            
            <Card className="bg-primary/5 border-primary/20 overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-500 fill-mode-both">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Formal Quotation?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Contact our sales team for bulk pricing, institutional accounts, and equipment procurement services.</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold underline decoration-2 transition-all hover:tracking-wide">Contact Sales Team</Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-grow space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 fill-mode-both">
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <span className="text-secondary font-bold">{filteredProducts.length}</span> items in <span className="text-primary font-bold">{activeCategory}</span>
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden flex flex-col bg-white animate-in zoom-in-95 duration-500 fill-mode-both" style={{ animationDelay: `${(i % 9) * 100}ms` }}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full group-hover:scale-110 transition-transform duration-700">
                          <Package className="h-20 w-20 text-muted-foreground/20" />
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4 bg-white/95 text-primary hover:bg-white backdrop-blur-md border-none shadow-md font-bold text-[10px] uppercase transition-transform group-hover:scale-105">
                        {product.category}
                      </Badge>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-[40px]">{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-6 pt-4 mt-auto border-t bg-muted/5 grid grid-cols-2 gap-3">
                      {product.brochure ? (
                        <Button onClick={(e) => handleViewBrochure(e, product.brochure!)} variant="outline" className="w-full gap-2 border-2 hover:bg-primary hover:text-white hover:border-primary font-bold text-[10px] uppercase tracking-wider h-11 transition-all hover:scale-[1.02] active:scale-95 shadow-sm p-0">
                          <span className="flex items-center justify-center w-full h-full gap-2 cursor-pointer">
                            <Eye className="h-3.5 w-3.5" /> View Brochure
                          </span>
                        </Button>
                      ) : (
                        <Button disabled variant="outline" className="w-full gap-2 border-2 font-bold text-[10px] uppercase tracking-wider h-11 shadow-sm opacity-50 cursor-not-allowed">
                          <Download className="h-3.5 w-3.5" /> No Brochure
                        </Button>
                      )}
                      <Button asChild className="w-full gap-2 font-bold text-[10px] uppercase tracking-wider h-11 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/10">
                        <Link href="/contact">
                          <FileText className="h-3.5 w-3.5" /> Quote
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-muted animate-in zoom-in-95 duration-500">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <ShoppingCart className="h-full w-full text-muted/30" />
                    <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                  <Button variant="outline" className="mt-8 px-10 border-2" onClick={() => {setActiveCategory("All"); setSearchTerm("")}}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Packaging Benefits Section - Visible when Packaging or All is selected */}
            {(activeCategory === "All" || activeCategory === "Packaging Solutions") && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-headline font-bold text-secondary uppercase tracking-tight">Our Packaging Benefits</h2>
                  <p className="text-muted-foreground">Why healthcare institutions trust our specialized transit protection.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packagingBenefits.map((benefit, i) => (
                    <Card key={i} className="border-none shadow-md bg-white hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] group animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${700 + (i * 150)}ms` }}>
                      <CardContent className="p-8 space-y-4">
                        <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                          <benefit.icon className="h-7 w-7" />
                        </div>
                        <h4 className="font-bold text-secondary text-lg group-hover:text-primary transition-colors">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
                  <div className="inline-block bg-white p-8 rounded-2xl border-2 border-primary/10 shadow-xl shadow-primary/5">
                    <h3 className="text-2xl font-headline font-bold text-secondary mb-3">PACKED WITH CARE, DELIVERED WITH CONFIDENCE.</h3>
                    <p className="text-muted-foreground text-lg">Your equipment&apos;s safety is our priority.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading products...</div>}>
      <ProductsContent />
    </React.Suspense>
  )
}