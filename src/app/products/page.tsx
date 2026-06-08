
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, FileText, ShoppingCart, CheckCircle2, ShieldCheck, Truck, Recycle, Box } from "lucide-react"
import Image from "next/image"

const categories = [
  "All", 
  "Medical Equipment", 
  "Laboratory Equipment", 
  "Medical Supplies", 
  "Healthcare Accessories", 
  "Packaging Solutions"
]

const products = [
  // Medical Equipment
  ...[
    "Anesthesia Machine", "Anesthesia Vaporizer", "Aspirator", "Autoclave Machine", 
    "CPAP/BiPAP", "Defibrillator", "ECG Machine", "Electrosurgical Unit", 
    "Fetal Monitor", "Infusion", "Nebulizer", "Oxygen Concentrator", 
    "Patient Monitor", "Patient Scale", "Pulse Oximeter", "Radiant Warmer", "Ventilator Machine"
  ].map((name, i) => ({
    id: `me-${i}`,
    name,
    category: "Medical Equipment",
    description: `High-quality ${name} designed for professional clinical use and precision diagnostics.`,
    image: `https://picsum.photos/seed/me${i}/400/300`
  })),

  // Laboratory Equipment
  ...[
    "Centrifuge", "Freezer", "Incubator", "Lab Oven", "Lab Refrigerator", 
    "Microscope", "Pipette", "pH Meter", "Thermohygrometer", "Water Bath"
  ].map((name, i) => ({
    id: `le-${i}`,
    name,
    category: "Laboratory Equipment",
    description: `Precision ${name} for clinical laboratories and research institutions.`,
    image: `https://picsum.photos/seed/le${i}/400/300`
  })),

  // Medical Supplies (Consumables)
  ...[
    "Anesthesia Breathing Circuit", "Bacterial Filter", "BP Cuff, Dual Tube (Disposable)", 
    "BP Cuff, Single Tube (Disposable)", "Bubble Humidifier", "Closed Suction Catheter", 
    "EtCO2 Water Trap", "FHME", "Flex Tube", "Full Face Mask (CPAP, BiPAP)", 
    "Gas Sampling Line", "High Flow Consumables Set", "Humidification Chamber", 
    "Incentive Spirometer", "Nasal Cannula", "NIV Face Mask", "Peak Flowmeter", 
    "Ventilator Breathing Circuit, Dual Limb", "Ventilator Breathing Circuit, Single Limb"
  ].map((name, i) => ({
    id: `ms-c-${i}`,
    name,
    category: "Medical Supplies",
    description: `Essential ${name} for respiratory therapy and patient care.`,
    image: `https://picsum.photos/seed/msc${i}/400/300`
  })),

  // Medical Supplies (Accessories)
  ...[
    "BP Bulb", "BP Cuff, Dual Tube (Reusable)", "BP Cuff, Dual Tube (Disposable)", 
    "ECG Leads (3, 5, 12 Leads)", "Flow Sensor, Ventilator", 
    "High-Pressure Regulator, Compressed Air", "High-Pressure Regulator, Oxygen", 
    "NIBP Hose, Coiled", "NIBP Hose, Dual Tube", "NIBP Hose, Single Tube", 
    "Oxygen Flowmeter, 15 LPM", "Oxygen Flowmeter, 70 LPM", "Oxygen/Air Blender", 
    "SpO2 Sensor", "SpO2 Trunk Cable", "Temperature Probe"
  ].map((name, i) => ({
    id: `ms-a-${i}`,
    name,
    category: "Healthcare Accessories",
    description: `Durable ${name} compatible with various medical monitor systems.`,
    image: `https://picsum.photos/seed/msa${i}/400/300`
  })),

  // Packaging Solutions
  {
    id: "pkg-1",
    name: "Standard Packaging",
    category: "Packaging Solutions",
    description: "Secure and reliable packaging for everyday medical products.",
    image: "https://picsum.photos/seed/pkg1/400/300"
  },
  {
    id: "pkg-2",
    name: "Foam Protection Packaging",
    category: "Packaging Solutions",
    description: "Enhanced protection with high-quality foam for delicate clinical equipment.",
    image: "https://picsum.photos/seed/pkg2/400/300"
  },
  {
    id: "pkg-3",
    name: "Wooden Crate Packaging",
    category: "Packaging Solutions",
    description: "Heavy-duty wooden crates for maximum safety of valuable medical hardware.",
    image: "https://picsum.photos/seed/pkg3/400/300"
  },
  {
    id: "pkg-4",
    name: "Export Grade Packaging",
    category: "Packaging Solutions",
    description: "ISPM-15 compliant packaging for safe and secure international shipping.",
    image: "https://picsum.photos/seed/pkg4/400/300"
  }
]

const packagingBenefits = [
  { title: "Maximum Protection", desc: "Ensures products are protected from damage, moisture, dust, and impact.", icon: ShieldCheck },
  { title: "Safe Transportation", desc: "Designed to withstand the rigors of transportation and long-distance delivery.", icon: Truck },
  { title: "Quality Materials", desc: "We use high-quality packaging materials that meet international standards.", icon: Box },
  { title: "Eco-Friendly Options", desc: "Sustainable packaging solutions that reduce environmental impact.", icon: Recycle },
  { title: "Tailored Solutions", desc: "Custom packaging solutions tailored to your specific needs.", icon: CheckCircle2 }
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
          <h1 className="text-4xl font-headline font-bold mb-4 uppercase tracking-tight">Our Solutions Catalog</h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Explore our comprehensive range of top-grade medical equipment, supplies, and specialized packaging solutions.
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
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-2 focus:border-primary"
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
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      activeCategory === cat 
                      ? "bg-primary text-white font-bold shadow-md shadow-primary/20 translate-x-1" 
                      : "hover:bg-primary/10 text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <Card className="bg-primary/5 border-primary/20 overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Formal Quotation?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Contact our sales team for bulk pricing, institutional accounts, and equipment procurement services.</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold underline">Contact Sales Team</Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-grow space-y-12">
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing <span className="text-secondary font-bold">{filteredProducts.length}</span> items in <span className="text-primary font-bold">{activeCategory}</span>
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-sm overflow-hidden flex flex-col bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        data-ai-hint="medical device"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white/90 backdrop-blur-sm border-none shadow-sm font-bold text-[10px] uppercase">
                        {product.category}
                      </Badge>
                    </div>
                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm leading-relaxed">{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-6 pt-4 mt-auto border-t bg-muted/5 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full gap-2 font-bold text-[10px] uppercase tracking-wider h-10 border-2">
                        <Download className="h-3 w-3" /> Brochure
                      </Button>
                      <Button className="w-full gap-2 font-bold text-[10px] uppercase tracking-wider h-10">
                        <FileText className="h-3 w-3" /> Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-muted">
                  <ShoppingCart className="h-16 w-16 text-muted/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-secondary">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                  <Button variant="outline" className="mt-6" onClick={() => {setActiveCategory("All"); setSearchTerm("")}}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Packaging Benefits Section - Visible when Packaging or All is selected */}
            {(activeCategory === "All" || activeCategory === "Packaging Solutions") && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-headline font-bold text-secondary uppercase tracking-tight">Our Packaging Benefits</h2>
                  <p className="text-muted-foreground">Why healthcare institutions trust our specialized transit protection.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packagingBenefits.map((benefit, i) => (
                    <Card key={i} className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                      <CardContent className="p-8 space-y-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                          <benefit.icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-secondary text-lg">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
