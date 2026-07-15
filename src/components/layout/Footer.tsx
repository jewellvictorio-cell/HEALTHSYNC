"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "./Logo"
import { useFooterSettings } from "@/lib/useStore"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const settings = useFooterSettings()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8 md:h-10 md:w-10 shrink-0" variant="light" />
              <span className="font-headline text-lg font-bold tracking-tight text-white leading-tight">
                Healthsync Medical Solutions Corporation
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 max-w-xs leading-relaxed">
              Where Faith Meets Excellence in Healthcare. Providing quality medical solutions across the Philippines.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/people/Healthsync-Medical-Solutions-Corporation/61573091682697/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/healthsyncmed?igsh=MTljeDE4bTI5cTc3ZQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Offers', href: '/offers' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-secondary-foreground/70 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Our Solutions</h3>
            <ul className="space-y-4">
              {[
                { label: 'Medical Equipment', href: '/products?category=Medical+Equipment' },
                { label: 'Biomedical Equipment', href: '/products?category=Biomedical+Equipment' },
                { label: 'Laboratory Equipment', href: '/products?category=Laboratory+Equipment' },
                { label: 'Medical Supplies', href: '/products?category=Medical+Supplies' },
                { label: 'Packaging Solutions', href: '/products?category=Packaging+Solutions' },
                { label: 'Technical Support', href: '/contact?inquiry=sales#quote-form' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-secondary-foreground/70 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/70 leading-relaxed">
                  {settings.address}
                </span>
              </li>
              {/* Phones — icon only on first */}
              {(settings.phones || []).filter((p: string) => p?.trim()).map((p: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  {i === 0
                    ? <Phone className="h-5 w-5 text-primary shrink-0" />
                    : <span className="h-5 w-5 shrink-0" />
                  }
                  <span className="text-sm text-secondary-foreground/70">{p}</span>
                </li>
              ))}
              {/* Emails — icon only on first */}
              {(settings.emails || []).filter((em: string) => em?.trim()).map((em: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  {i === 0
                    ? <Mail className="h-5 w-5 text-primary shrink-0" />
                    : <span className="h-5 w-5 shrink-0" />
                  }
                  <span className="text-sm text-secondary-foreground/70 break-all">{em}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center space-y-2">
          <p className="text-[10px] md:text-xs text-secondary-foreground/50">
            &copy; {currentYear} Healthsync Medical Solutions Corporation. All rights reserved.
          </p>
          <p className="text-[10px] text-secondary-foreground/30">
            {settings.address}
          </p>
        </div>
      </div>
    </footer>
  )
}

