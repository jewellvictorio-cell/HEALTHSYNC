"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare, ChevronDown, ArrowRight, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { Button } from "@/components/ui/button"
import { isAdmin } from "@/lib/auth"
import { useProducts } from "@/lib/useStore"
import { PRODUCT_CATEGORIES } from "@/lib/store"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Offers", href: "/offers" },
  { name: "Careers", href: "/careers" },
  { name: "Clients", href: "/clients" },
]



export function Navbar() {
  const [mobileMenuOpen,    setMobileMenuOpen]    = React.useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false)
  const [adminLoggedIn,     setAdminLoggedIn]     = React.useState(false)
  const pathname = usePathname()
  const allProducts = useProducts()

  const productCategories = React.useMemo(() => {
    return PRODUCT_CATEGORIES.map(category => ({
      title: category.toUpperCase(),
      categoryParam: category,
      links: allProducts
        .filter(p => p.category === category)
        .slice(0, 15) // Limit to 15 per category so it doesn't break layout
        .map(p => ({ name: p.name, href: `/products?category=${encodeURIComponent(category)}&search=${encodeURIComponent(p.name)}` }))
    }))
  }, [allProducts])

  React.useEffect(() => { setAdminLoggedIn(isAdmin()) }, [pathname])

  // Prevent body scroll when mobile menu is open
  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
                              <Link href={`/products?category=${encodeURIComponent(category.categoryParam)}`} className="text-sm font-headline font-bold tracking-tight text-secondary hover:text-primary transition-colors">
                                {category.title}
                              </Link>
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
        <div className="hidden lg:flex items-center ml-4 gap-3">
          <Button size="sm" className="h-9 px-5 font-semibold gap-1.5 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/contact">
              <MessageSquare className="h-4 w-4" />
              Get a Quote
            </Link>
          </Button>
          <div className="w-px h-5 bg-border" />
          <Link
            href={adminLoggedIn ? "/admin" : "/admin/login"}
            title={adminLoggedIn ? "Admin Dashboard" : "Admin Login"}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all hover:scale-110 active:scale-95",
              adminLoggedIn
                ? "border-primary bg-primary/5 text-primary hover:bg-primary/10"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
            )}
          >
            <User className="h-5 w-5" />
          </Link>
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
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

      {/* Mobile menu panel */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-full max-w-sm lg:hidden transform transition-transform duration-300 ease-in-out bg-background shadow-2xl flex flex-col overflow-y-auto h-screen max-h-screen",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
            {/* Admin link in mobile menu */}
            <Link
              href={adminLoggedIn ? "/admin" : "/admin/login"}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              {adminLoggedIn ? "Admin Dashboard" : "Admin Login"}
            </Link>
            <div className="h-px bg-border my-1" />
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
                              <Link href={`/products?category=${encodeURIComponent(category.categoryParam)}`} className="text-sm font-headline font-bold text-secondary hover:text-primary transition-colors block" onClick={() => setMobileMenuOpen(false)}>
                                {category.title}
                              </Link>
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
