"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Eye, FileText, Package, ChevronRight } from "lucide-react"
import { useProducts } from "@/lib/useStore"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const allProducts = useProducts()
  const product = allProducts.find((p) => p.id === params.id)

  function handleViewBrochure(brochure: string) {
    try {
      if (brochure.startsWith("http://") || brochure.startsWith("https://") || brochure.startsWith("/")) {
        window.open(brochure, "_blank")
        return
      }
      if (brochure.startsWith("data:")) {
        const arr = brochure.split(",")
        const mime = arr[0].match(/:(.*?);/)?.[1] || "application/pdf"
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) u8arr[n] = bstr.charCodeAt(n)
        const blob = new Blob([u8arr], { type: mime })
        const url = URL.createObjectURL(blob)
        window.open(url, "_blank")
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        return
      }
      alert("Brochure format not supported.")
    } catch {
      alert("Failed to open brochure.")
    }
  }

  // Loading state while products are being fetched
  if (allProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4 animate-pulse">
          <Package className="h-16 w-16 text-primary/30 mx-auto" />
          <p className="text-muted-foreground font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-6">
          <Package className="h-20 w-20 text-muted-foreground/20 mx-auto" />
          <h1 className="text-2xl font-headline font-bold text-secondary">Product Not Found</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            The product you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button asChild className="mt-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Related products (same category, excluding current)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Breadcrumb */}
      <div className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-secondary-foreground/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl border">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-24 w-24 text-muted-foreground/15" />
              </div>
            )}
            <Badge className="absolute top-4 left-4 bg-white/95 text-primary hover:bg-white backdrop-blur-md border-none shadow-md font-bold text-xs uppercase">
              {product.category}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/30 font-semibold text-xs uppercase tracking-wider">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-headline font-bold text-secondary leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Full Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {product.brochure && (product.brochure.startsWith("data:") || product.brochure.startsWith("http") || product.brochure.startsWith("/")) ? (
                <Button
                  onClick={() => handleViewBrochure(product.brochure!)}
                  variant="outline"
                  className="gap-2 border-2 hover:bg-primary hover:text-white hover:border-primary font-bold text-sm uppercase tracking-wider h-12 px-8 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <Eye className="h-4 w-4" /> View Brochure
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outline"
                  className="gap-2 border-2 font-bold text-sm uppercase tracking-wider h-12 px-8 opacity-50 cursor-not-allowed"
                >
                  <Download className="h-4 w-4" /> No Brochure
                </Button>
              )}
              <Button
                asChild
                className="gap-2 font-bold text-sm uppercase tracking-wider h-12 px-8 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
              >
                <Link href={`/contact?inquiry=product&id=${product.id}`}>
                  <FileText className="h-4 w-4" /> Request a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-headline font-bold text-secondary">Related Products</h2>
              <Button asChild variant="ghost" className="text-primary font-semibold group">
                <Link href={`/products?category=${encodeURIComponent(product.category)}`}>
                  View All <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.id}`} className="group">
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="h-12 w-12 text-muted-foreground/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{related.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
