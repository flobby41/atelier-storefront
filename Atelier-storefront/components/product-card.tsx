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

          {product.sizes && product.sizes.length > 0 && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm transition-all duration-500 ease-out ${
                hovering ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{ height: "12.5%" }}
            >
              <div className="h-full flex items-center justify-center gap-2 px-4">
                <p className="text-[10px] tracking-widest uppercase text-foreground/70 mr-1 whitespace-nowrap">Size:</p>
                <div className="flex gap-1.5">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant="outline"
                      className="h-7 min-w-[2.5rem] px-2 text-xs bg-background hover:bg-foreground hover:text-background transition-colors border-border/50"
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
