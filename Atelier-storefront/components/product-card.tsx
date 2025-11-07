"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { useState } from "react"
import { ShoppingBag } from "lucide-react"

interface Product {
  id: string | number
  handle?: string
  name: string
  price: number
  image: string
  category: string
  sizes?: string[]
  variants?: Array<{
    id: string
    title: string
    price: number
    available: boolean
    selectedOptions: Array<{ name: string; value: string }>
    image: string
  }>
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const [hovering, setHovering] = useState(false)

  // Check if product is one size (no sizes or only one size)
  const isOneSize = !product.sizes || product.sizes.length === 0 || product.sizes.length === 1

  // Get the first variant for one-size products
  const firstVariant = product.variants?.[0]

  const handleSizeClick = async (e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    // Find variant matching the size
    const variant = product.variants?.find((v) => 
      v.selectedOptions.some((opt) => 
        opt.name.toLowerCase().includes('size') && opt.value === size
      )
    ) || product.variants?.[0]
    
    if (!variant) {
      alert("Variant not found. Please try again.")
      return
    }

    await addItem({
      variantId: variant.id,
      name: product.name,
      price: variant.price || product.price,
      image: variant.image || product.image,
      category: product.category,
      size: size,
    })
  }

  const handleOneSizeAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!firstVariant) {
      alert("Product variant not available")
      return
    }

    await addItem({
      variantId: firstVariant.id,
      name: product.name,
      price: firstVariant.price || product.price,
      image: firstVariant.image || product.image,
      category: product.category,
    })
  }

  // Get product URL - always prefer handle for SEO-friendly URLs
  const getProductUrl = () => {
    // Always use handle if available (recommended for SEO)
    if (product.handle) {
      return `/products/${product.handle}`
    }
    // Fallback to ID if handle is not available
    // Note: This should rarely happen as normalizeProduct always includes handle
    return `/products/${product.id}`
  }

  return (
    <Card
      className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={getProductUrl()}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

          {/* One Size - Show cart button on hover */}
          {isOneSize && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="lg"
                className="bg-background/95 hover:bg-background text-foreground shadow-lg"
                onClick={handleOneSizeAddToCart}
                disabled={isLoading}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}

          {/* Multiple Sizes - Show size selector on hover */}
          {!isOneSize && product.sizes && product.sizes.length > 0 && (
            <div className="absolute left-0 right-0 bottom-0 h-[35%] flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 translate-y-full transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex flex-col items-center gap-3 p-4">
                <p className="text-xs tracking-widest uppercase text-foreground/80 mb-1">Select Size</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm" 
                      variant="outline"
                      className="min-w-[3rem] h-10 bg-background hover:bg-foreground hover:text-background transition-colors"
                      onClick={(e) => handleSizeClick(e, size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>

      <Link href={getProductUrl()}>
        <div className="p-4 cursor-pointer">
          <p className="text-xs tracking-widest text-muted-foreground mb-1 uppercase">{product.category}</p>
          <h3 className="text-lg font-light tracking-wide mb-2 text-balance">{product.name}</h3>
          <p className="text-sm font-mono tracking-wider">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </Card>
  )
}
