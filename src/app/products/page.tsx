"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, FileText, ShoppingCart, CheckCircle2, ShieldCheck, Truck, Recycle, Box, ChevronRight, Eye, Package, Stethoscope, Activity } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCT_CATEGORIES, type Product } from "@/lib/store"
import { useProducts } from "@/lib/useStore"

// Sidebar filter list mirrors PRODUCT_CATEGORIES, prefixed with "All"
const categories = ["All", ...PRODUCT_CATEGORIES]

const packagingBenefits = [
  { title: "Maximum Protection",   desc: "Ensure products are protected from damage, moisture, dust, and impact.",           icon: ShieldCheck },
  { title: "Safe Transportation",  desc: "Designed to withstand the rigors of transportation and long-distance delivery.",    icon: Truck },
  { title: "Quality Materials",    desc: "We use high-quality packaging materials that meet international standards.",        icon: Box },
  { title: "Eco-Friendly Options", desc: "Sustainable packaging solutions that reduce environmental impact.",                 icon: Recycle },
  { title: "Tailored Solutions",   desc: "Custom packaging solutions tailored to your specific needs.",                      icon: CheckCircle2 },
]

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index, onViewBrochure }: {
  product: Product
  index: number
  onViewBrochure: (e: React.MouseEvent, b64: string) => void
}) {
  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 border-none shadow-sm overflow-hidden flex flex-col bg-white animate-in zoom-in-95 duration-500 fill-mode-both"
      style={{ animationDelay: `${(index % 9) * 80}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-16 w-16 text-muted-foreground/20" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-white/95 text-primary hover:bg-white backdrop-blur-md border-none shadow-md font-bold text-[10px] uppercase transition-transform group-hover:scale-105">
          {product.category}
        </Badge>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-base font-bold group-hover:text-primary transition-colors line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs leading-relaxed min-h-[32px]">{product.description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-5 pt-3 mt-auto border-t bg-muted/5 grid grid-cols-2 gap-2">
        {product.brochure ? (
          <Button onClick={(e) => onViewBrochure(e, product.brochure!)} variant="outline" className="w-full gap-1.5 border-2 hover:bg-primary hover:text-white hover:border-primary font-bold text-[10px] uppercase tracking-wider h-10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm p-0">
            <span className="flex items-center justify-center w-full h-full gap-1.5 cursor-pointer">
              <Eye className="h-3.5 w-3.5" /> View Brochure
            </span>
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full gap-1.5 border-2 font-bold text-[10px] uppercase tracking-wider h-10 shadow-sm opacity-50 cursor-not-allowed">
            <Download className="h-3.5 w-3.5" /> No Brochure
          </Button>
        )}
        <Button asChild className="w-full gap-1.5 font-bold text-[10px] uppercase tracking-wider h-10 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/10">
          <Link href="/contact">
            <FileText className="h-3.5 w-3.5" /> Quote
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// ── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, count, accent = false }: {
  icon: React.ElementType
  title: string
  count: number
  accent?: boolean
}) {
  return (
    <div className={`flex items-center gap-4 py-5 px-6 rounded-2xl mb-6 border ${
      accent
        ? "bg-gradient-to-r from-primary/8 to-primary/3 border-primary/20"
        : "bg-gradient-to-r from-secondary/5 to-secondary/2 border-secondary/10"
    }`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
        accent ? "bg-primary/15 text-primary" : "bg-secondary/10 text-secondary"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h2 className={`text-xl font-headline font-bold ${accent ? "text-primary" : "text-secondary"}`}>{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{count} {count === 1 ? "product" : "products"} available</p>
      </div>
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyGrid({ label }: { label: string }) {
  return (
    <div className="col-span-full text-center py-14 bg-white rounded-2xl border-2 border-dashed border-muted">
      <Package className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
      <p className="font-semibold text-muted-foreground">No {label} products yet</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Check back soon or contact our sales team.</p>
    </div>
  )
}

// ── Main Content ─────────────────────────────────────────────────────────────
function ProductsContent() {
  const searchParams  = useSearchParams()
  const allProducts   = useProducts()
  const [activeCategory, setActiveCategory] = React.useState(searchParams.get("category") || "All")
  const [searchTerm,     setSearchTerm]     = React.useState(searchParams.get("search")   || "")

  React.useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All")
    setSearchTerm(searchParams.get("search") || "")
  }, [searchParams])

  function handleViewBrochure(e: React.MouseEvent, base64: string) {
    e.preventDefault()
    try {
      const arr = base64.split(",")
      const mime = arr[0].match(/:(.*?);/)?.[1] || "application/pdf"
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) u8arr[n] = bstr.charCodeAt(n)
      const blob = new Blob([u8arr], { type: mime })
      const url  = URL.createObjectURL(blob)
      window.open(url, "_blank")
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      alert("Failed to open brochure.")
    }
  }

  // When "All" is selected, render Medical Equipment + Biomedical Equipment as two distinct sections
  const showAll = activeCategory === "All" && !searchTerm

  const filtered = allProducts.filter(p => {
    const matchCat    = activeCategory === "All" || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  const medicalProducts    = allProducts.filter(p => p.category === "Medical Equipment")
  const biomedicalProducts = allProducts.filter(p => p.category === "Biomedical Equipment")

  return (
    <div className="min-h-screen bg-muted/20 pb-24 overflow-hidden">
      {/* Hero */}
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

          {/* ── Sidebar ── */}
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
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 flex justify-between items-center group ${
                      activeCategory === cat
                        ? "bg-primary text-white font-bold shadow-lg shadow-primary/20 translate-x-2"
                        : "hover:bg-primary/5 text-muted-foreground hover:translate-x-1"
                    }`}
                  >
                    {cat}
                    <ChevronRight className={`h-4 w-4 transition-all shrink-0 ${activeCategory === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </button>
                ))}
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/20 overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Formal Quotation?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Contact our sales team for bulk pricing, institutional accounts, and equipment procurement services.</p>
                <Button asChild variant="link" className="p-0 h-auto text-primary text-xs font-bold underline decoration-2 transition-all hover:tracking-wide">
                  <Link href="/contact#quote-form">Contact Sales Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ── Product Area ── */}
          <div className="flex-grow space-y-16 animate-in fade-in slide-in-from-right-8 duration-1000 fill-mode-both">

            {/* ── "All" view: two featured sections stacked ── */}
            {showAll ? (
              <>
                {/* Medical Equipment Section */}
                <div>
                  <SectionHeader icon={Stethoscope} title="Medical Equipment" count={medicalProducts.length} />
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {medicalProducts.length > 0
                      ? medicalProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} onViewBrochure={handleViewBrochure} />)
                      : <EmptyGrid label="Medical Equipment" />
                    }
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center">
                    <span className="bg-muted/20 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">More Categories</span>
                  </div>
                </div>

                {/* Biomedical Equipment Section */}
                <div>
                  <SectionHeader icon={Activity} title="Biomedical Equipment" count={biomedicalProducts.length} accent />
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {biomedicalProducts.length > 0
                      ? biomedicalProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} onViewBrochure={handleViewBrochure} />)
                      : <EmptyGrid label="Biomedical Equipment" />
                    }
                  </div>
                </div>

                {/* Remaining categories: Lab, Consumables, Accessories, Packaging */}
                {["Laboratory Equipment", "Consumables | Medical Supplies", "Accessories | Medical Supplies", "Packaging Solutions"].map(cat => {
                  const catProducts = allProducts.filter(p => p.category === cat)
                  if (catProducts.length === 0) return null
                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-3 mb-5">
                        <h2 className="text-lg font-headline font-bold text-secondary">{cat}</h2>
                        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">{catProducts.length}</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {catProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} onViewBrochure={handleViewBrochure} />)}
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              /* ── Single category / search results view ── */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Showing <span className="text-secondary font-bold">{filtered.length}</span> {filtered.length === 1 ? "item" : "items"}
                    {activeCategory !== "All" && <> in <span className="text-primary font-bold">{activeCategory}</span></>}
                    {searchTerm && <> matching <span className="text-primary font-bold">"{searchTerm}"</span></>}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} onViewBrochure={handleViewBrochure} />)}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-muted animate-in zoom-in-95 duration-500">
                    <ShoppingCart className="h-16 w-16 text-muted/30 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-secondary">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                    <Button variant="outline" className="mt-8 px-10 border-2" onClick={() => { setActiveCategory("All"); setSearchTerm("") }}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Packaging Benefits — shown at bottom when Packaging or All is selected */}
            {(activeCategory === "All" || activeCategory === "Packaging Solutions") && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-headline font-bold text-secondary uppercase tracking-tight">Our Packaging Benefits</h2>
                  <p className="text-muted-foreground">Why healthcare institutions trust our specialized transit protection.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packagingBenefits.map((benefit, i) => (
                    <Card key={i} className="border-none shadow-md bg-white hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] group animate-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
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
                <div className="mt-10 text-center">
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