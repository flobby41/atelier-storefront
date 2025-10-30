"use client"

import { ProductCard } from "@/components/product-card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const womenProducts = [
  {
    id: 1,
    name: "Asymmetric Draped Jacket",
    price: 1250,
    image: "/avant-garde-black-draped-jacket-on-model.jpg",
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Deconstructed Linen Shirt",
    price: 480,
    image: "/minimalist-white-deconstructed-shirt-fashion.jpg",
    category: "Tops",
  },
  {
    id: 5,
    name: "Oversized Cashmere Coat",
    price: 1850,
    image: "/luxurious-oversized-cashmere-coat-beige.jpg",
    category: "Outerwear",
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    price: 540,
    image: "/elegant-pleated-midi-skirt-fashion-photography.jpg",
    category: "Bottoms",
  },
  {
    id: 7,
    name: "Sculptural Knit Dress",
    price: 980,
    image: "/architectural-knit-dress-avant-garde-fashion.jpg",
    category: "Dresses",
  },
  {
    id: 9,
    name: "Silk Slip Dress",
    price: 720,
    image: "/elegant-silk-slip-dress-minimal-fashion.jpg",
    category: "Dresses",
  },
  {
    id: 10,
    name: "Tailored Wool Blazer",
    price: 1180,
    image: "/oversized-tailored-wool-blazer-women-fashion.jpg",
    category: "Outerwear",
  },
  {
    id: 11,
    name: "Asymmetric Knit Top",
    price: 420,
    image: "/asymmetric-knit-top-avant-garde-fashion.jpg",
    category: "Tops",
  },
  {
    id: 12,
    name: "High-Waist Leather Pants",
    price: 890,
    image: "/high-waist-leather-pants-edgy-fashion.jpg",
    category: "Bottoms",
  },
  {
    id: 13,
    name: "Draped Jersey Dress",
    price: 650,
    image: "/draped-jersey-dress-minimal-elegant.jpg",
    category: "Dresses",
  },
  {
    id: 14,
    name: "Cropped Boucle Jacket",
    price: 980,
    image: "/cropped-boucle-jacket-luxury-fashion.jpg",
    category: "Outerwear",
  },
  {
    id: 15,
    name: "Wide-Leg Linen Trousers",
    price: 540,
    image: "/wide-leg-linen-trousers-neutral-tones.jpg",
    category: "Bottoms",
  },
]

export function WomenCollection() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses"]

  const filteredProducts = filter === "All" ? womenProducts : womenProducts.filter((p) => p.category === filter)

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-2">Curated Selection</h2>
            <p className="text-muted-foreground font-light">Timeless pieces for the modern woman</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="text-xs tracking-wider"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
