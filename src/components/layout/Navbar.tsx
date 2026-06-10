"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare, ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Offers", href: "/offers" },
  { name: "Careers", href: "/careers" },
  { name: "Clients", href: "/clients" },
]

const productCategories = [
  {
    title: "MEDICAL EQUIPMENT",
    links: [
      { name: "Anesthesia Machine", href: "/products?category=Medical+Equipment&search=Anesthesia+Machine" },
      { name: "Anesthesia Vaporizer", href: "/products?category=Medical+Equipment&search=Anesthesia+Vaporizer" },
      { name: "Aspirator", href: "/products?category=Medical+Equipment&search=Aspirator" },
      { name: "Autoclave Machine", href: "/products?category=Medical+Equipment&search=Autoclave+Machine" },
      { name: "CPAP/BiPAP", href: "/products?category=Medical+Equipment&search=CPAP" },
      { name: "Defibrillator", href: "/products?category=Medical+Equipment&search=Defibrillator" },
      { name: "ECG Machine", href: "/products?category=Medical+Equipment&search=ECG+Machine" },
      { name: "Electrosurgical Unit", href: "/products?category=Medical+Equipment&search=Electrosurgical+Unit" },
      { name: "Fetal Monitor", href: "/products?category=Medical+Equipment&search=Fetal+Monitor" },
      { name: "Infusion Device", href: "/products?category=Medical+Equipment&search=Infusion+Device" },
      { name: "Nebulizer", href: "/products?category=Medical+Equipment&search=Nebulizer" },
      { name: "Oxygen Concentrator", href: "/products?category=Medical+Equipment&search=Oxygen+Concentrator" },
      { name: "Patient Monitor", href: "/products?category=Medical+Equipment&search=Patient+Monitor" },
      { name: "Patient Scale", href: "/products?category=Medical+Equipment&search=Patient+Scale" },
      { name: "Pulse Oximeter", href: "/products?category=Medical+Equipment&search=Pulse+Oximeter" },
      { name: "Radiant Warmer", href: "/products?category=Medical+Equipment&search=Radiant+Warmer" },
      { name: "Ventilator Machine", href: "/products?category=Medical+Equipment&search=Ventilator+Machine" },
    ]
  },
  {
    title: "LABORATORY EQUIPMENT",
    links: [
      { name: "Centrifuge", href: "/products?category=Laboratory+Equipment&search=Centrifuge" },
      { name: "Freezer", href: "/products?category=Laboratory+Equipment&search=Freezer" },
      { name: "Incubator", href: "/products?category=Laboratory+Equipment&search=Incubator" },
      { name: "Lab Oven", href: "/products?category=Laboratory+Equipment&search=Lab+Oven" },
      { name: "Lab Refrigerator", href: "/products?category=Laboratory+Equipment&search=Lab+Refrigerator" },
      { name: "Microscope", href: "/products?category=Laboratory+Equipment&search=Microscope" },
      { name: "Pipette", href: "/products?category=Laboratory+Equipment&search=Pipette" },
      { name: "pH Meter", href: "/products?category=Laboratory+Equipment&search=pH+Meter" },
      { name: "Thermohygrometer", href: "/products?category=Laboratory+Equipment&search=Thermohygrometer" },
      { name: "Water Bath", href: "/products?category=Laboratory+Equipment&search=Water+Bath" },
    ]
  },
  {
    title: "CONSUMABLES | MEDICAL SUPPLIES",
    links: [
      { name: "Anesthesia Breathing Circuit", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Anesthesia+Breathing+Circuit" },
      { name: "Bacterial Filter", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Bacterial+Filter" },
      { name: "BP Cuff, Dual Tube (Disposable)", href: "/products?category=Consumables+%7C+Medical+Supplies&search=BP+Cuff,+Dual+Tube+(Disposable)" },
      { name: "BP Cuff, Single Tube (Disposable)", href: "/products?category=Consumables+%7C+Medical+Supplies&search=BP+Cuff,+Single+Tube+(Disposable)" },
      { name: "Bubble Humidifier", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Bubble+Humidifier" },
      { name: "Closed Suction Catheter", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Closed+Suction+Catheter" },
      { name: "EtCO₂ Water Trap", href: "/products?category=Consumables+%7C+Medical+Supplies&search=EtCO" },
      { name: "FHME", href: "/products?category=Consumables+%7C+Medical+Supplies&search=FHME" },
      { name: "Flex Tube", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Flex+Tube" },
      { name: "Full Face Mask (CPAP, BiPAP)", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Full+Face+Mask" },
      { name: "Gas Sampling Line", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Gas+Sampling+Line" },
      { name: "High Flow Consumables", href: "/products?category=Consumables+%7C+Medical+Supplies&search=High+Flow+Consumables" },
      { name: "Humidification Chamber", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Humidification+Chamber" },
      { name: "Incentive Spirometer", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Incentive+Spirometer" },
      { name: "Nasal Cannula", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Nasal+Cannula" },
      { name: "NIV Face Mask", href: "/products?category=Consumables+%7C+Medical+Supplies&search=NIV+Face+Mask" },
      { name: "Peak Flowmeter", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Peak+Flowmeter" },
      { name: "Ventilator Breathing Circuit, Dual Limb", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Dual+Limb" },
      { name: "Ventilator Breathing Circuit, Single Limb", href: "/products?category=Consumables+%7C+Medical+Supplies&search=Single+Limb" },
    ]
  },
  {
    title: "ACCESSORIES | MEDICAL SUPPLIES",
    links: [
      { name: "BP Bulb", href: "/products?category=Accessories+%7C+Medical+Supplies&search=BP+Bulb" },
      { name: "BP Cuff, Dual Tube (Reusable)", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Reusable" },
      { name: "BP Cuff, Dual Tube (Disposable)", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Disposable" },
      { name: "ECG Leads (3, 5, 12 Leads)", href: "/products?category=Accessories+%7C+Medical+Supplies&search=ECG+Leads" },
      { name: "Flow Sensor, Ventilator", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Flow+Sensor" },
      { name: "High-Pressure Regulator, Compressed Air", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Compressed+Air" },
      { name: "High-Pressure Regulator, Oxygen", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Regulator,+Oxygen" },
      { name: "NIBP Hose, Coiled", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Coiled" },
      { name: "NIBP Hose, Dual Tube", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Hose,+Dual" },
      { name: "NIBP Hose, Single Tube", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Hose,+Single" },
      { name: "Oxygen Flowmeter, 15 LPM", href: "/products?category=Accessories+%7C+Medical+Supplies&search=15+LPM" },
      { name: "Oxygen Flowmeter, 70 LPM", href: "/products?category=Accessories+%7C+Medical+Supplies&search=70+LPM" },
      { name: "Oxygen/Air Blender", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Blender" },
      { name: "SpO₂ Sensor", href: "/products?category=Accessories+%7C+Medical+Supplies&search=SpO₂+Sensor" },
      { name: "SpO₂ Trunk Cable", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Trunk+Cable" },
      { name: "Temperature Probe", href: "/products?category=Accessories+%7C+Medical+Supplies&search=Temperature+Probe" },
    ]
  },
  {
    title: "PACKAGING SOLUTIONS",
    links: [
      { name: "Standard Packaging", href: "/products?category=Packaging+Solutions&search=Standard" },
      { name: "Foam Protection Packaging", href: "/products?category=Packaging+Solutions&search=Foam" },
      { name: "Wooden Crate Packaging", href: "/products?category=Packaging+Solutions&search=Wooden" },
      { name: "Export Grade Packaging", href: "/products?category=Packaging+Solutions&search=Export" },
    ]
  }
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false)
  const pathname = usePathname()

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 lg:px-8 relative" aria-label="Global">
        <div className="flex flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <Logo className="h-9 w-9 md:h-11 md:w-11 shrink-0 transition-transform group-hover:scale-105" />
            <span className="font-headline text-base md:text-lg font-bold tracking-tight text-secondary leading-tight max-w-[200px] sm:max-w-none">
              Healthsync Medical <span className="hidden sm:inline">Solutions Corporation</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-1 lg:items-center h-full">
          {navigation.map((item) => {
            if (item.name === "Products") {
              return (
                <div key={item.name} className="group h-full flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-semibold rounded-md transition-colors inline-flex items-center gap-1",
                      pathname.startsWith("/products")
                        ? "bg-primary/5 text-primary" 
                        : "text-secondary/80 hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-4 right-4 lg:left-8 lg:right-8 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 pt-2 pb-6 cursor-default">
                    <div className="bg-background shadow-xl rounded-xl border border-border p-8">
                      <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                        <h2 className="text-lg font-headline font-bold text-secondary">Our Product Catalog</h2>
                        <Link href="/products" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                          View All Products <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-5 gap-6 max-h-[60vh] overflow-y-auto pr-2 pb-2">
                        {productCategories.map((category) => (
                          <div key={category.title} className="space-y-4">
                            <h3 className="text-sm font-headline font-bold tracking-tight text-secondary">
                              {category.title}
                            </h3>
                            <ul className="space-y-0.5">
                              {category.links.map((link) => (
                                <li key={link.name}>
                                  <Link href={link.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors block py-0.5 leading-tight">
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div key={item.name} className="h-full flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                    pathname === item.href 
                      ? "bg-primary/5 text-primary" 
                      : "text-secondary/80 hover:bg-muted hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center ml-4">
          <Button size="sm" className="h-9 px-5 font-semibold gap-1.5 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/contact">
              <MessageSquare className="h-4 w-4" />
              Get a Quote
            </Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          mobileMenuOpen ? "visible bg-black/50" : "invisible bg-black/0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm lg:hidden transition-transform duration-300 ease-in-out bg-background shadow-2xl flex flex-col",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Logo className="h-8 w-8" />
            <span className="font-headline text-base font-bold text-secondary">
              Healthsync Medical
            </span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              if (item.name === "Products") {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition-colors min-h-[44px]",
                        pathname.startsWith("/products") || mobileProductsOpen
                          ? "bg-primary/5 text-primary" 
                          : "text-secondary hover:bg-muted"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", mobileProductsOpen && "rotate-180")} />
                    </button>
                    
                    {/* Mobile Accordion Content */}
                    <div 
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        mobileProductsOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 py-4 space-y-6 bg-muted/30 rounded-lg border border-border/50">
                          {productCategories.map((category) => (
                            <div key={category.title} className="space-y-3">
                              <h4 className="text-sm font-headline font-bold text-secondary">{category.title}</h4>
                              <div className="flex flex-col space-y-1">
                                {category.links.map(link => (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-2 py-3 text-sm font-medium text-muted-foreground hover:text-primary min-h-[44px] flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-border/50">
                            <Link 
                              href="/products" 
                              className="flex items-center gap-1 px-2 py-3 text-sm font-bold text-primary hover:underline min-h-[44px]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              View All Products <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors min-h-[44px]",
                    pathname === item.href 
                      ? "bg-primary text-white" 
                      : "text-secondary hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
