"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, FileText, ShoppingCart } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Medical Equipment", "Laboratory Equipment", "Medical Supplies", "Packaging Solutions"]

const products = [
  {
    id: 1,
    name: "Advanced MRI System",
    category: "Medical Equipment",
    description: "High-resolution imaging system for neuro and orthopedic diagnostics.",
    image: "https://picsum.photos/seed/prod1/400/300"
  },
  {
    id: 2,
    name: "Clinical Chemistry Analyzer",
    category: "Laboratory Equipment",
    description: "Automated analysis of blood and biological fluids for rapid results.",
    image: "https://picsum.photos/seed/prod2/400/300"
  },
  {
    id: 3,
    name: "Surgical Consumables Kit",
    category: "Medical Supplies",
    description: "Sterilized single-use tools and protective gear for surgical procedures.",
    image: "https://picsum.photos/seed/prod3/400/300"
  },
  {
    id: 4,
    name: "Biohazard Packaging Pro",
    category: "Packaging Solutions",
    description: "Certified medical waste containers and specialized transportation bags.",
    image: "https://picsum.photos/seed/prod4/400/300"
  },
  {
    id: 5,
    name: "Digital X-Ray Station",
    category: "Medical Equipment",
    description: "Wireless, high-frequency radiographic system with mobile capabilities.",
    image: "https://picsum.photos/seed/prod5/400/300"
  },
  {
    id: 6,
    name: "Laboratory Centrifuge X",
    category: "Laboratory Equipment",
    description: "Microprocessor-controlled centrifuge for research and clinical labs.",
    image: "https://picsum.photos/seed/prod6/400/300"
  }
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      <section className="bg-secondary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-headline font-bold mb-4">Product Catalog</h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Explore our range of premium medical and laboratory solutions tailored for your institution.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">
                <Search className="h-4 w-4" /> Search
              </h3>
              <Input 
                placeholder="Product name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === cat 
                      ? "bg-primary text-white font-bold" 
                      : "hover:bg-primary/10 text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-bold text-primary text-sm">Bulk Inquiries?</h4>
                <p className="text-xs text-muted-foreground">Contact our sales team for institutional pricing and fleet upgrades.</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold underline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} results</p>
            </div>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-lg transition-all border-none shadow-sm overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white/90">
                      {product.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-5 pt-4 mt-auto border-t bg-muted/5 flex flex-col gap-3">
                    <Button variant="outline" className="w-full gap-2 font-bold text-xs uppercase tracking-wider h-10">
                      <Download className="h-4 w-4" /> Download Brochure
                    </Button>
                    <Button className="w-full gap-2 font-bold text-xs uppercase tracking-wider h-10">
                      <FileText className="h-4 w-4" /> Request Quote
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-xl border-2 border-dashed">
                <ShoppingCart className="h-12 w-12 text-muted/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-secondary">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}