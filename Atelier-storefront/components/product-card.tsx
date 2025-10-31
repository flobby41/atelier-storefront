"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  sizes?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [hovering, setHovering] = useState(false)

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: size,
    })
  }

  return (
    <Card
      className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

          {product.sizes && product.sizes.length > 0 && hovering && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300">
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

      <Link href={`/products/${product.id}`}>
        <div className="p-4 cursor-pointer">
          <p className="text-xs tracking-widest text-muted-foreground mb-1 uppercase">{product.category}</p>
          <h3 className="text-lg font-light tracking-wide mb-2 text-balance">{product.name}</h3>
          <p className="text-sm font-mono tracking-wider">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </Card>
  )
}
