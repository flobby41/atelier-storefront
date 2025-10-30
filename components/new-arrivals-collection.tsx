"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 21,
    name: "Sculptural Wool Coat",
    price: 1890,
    image: "/sculptural-wool-coat-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 22,
    name: "Asymmetric Silk Blouse",
    price: 680,
    image: "/asymmetric-silk-blouse-minimal.jpg",
    category: "Tops",
  },
  {
    id: 23,
    name: "Deconstructed Denim Jacket",
    price: 890,
    image: "/deconstructed-denim-jacket-edgy.jpg",
    category: "Outerwear",
  },
  {
    id: 24,
    name: "Draped Jersey Dress",
    price: 750,
    image: "/draped-jersey-dress-elegant.jpg",
    category: "Dresses",
  },
  {
    id: 25,
    name: "Oversized Cashmere Sweater",
    price: 920,
    image: "/oversized-cashmere-sweater-luxury.jpg",
    category: "Tops",
  },
  {
    id: 26,
    name: "Wide-Leg Wool Trousers",
    price: 650,
    image: "/wide-leg-wool-trousers-tailored.jpg",
    category: "Bottoms",
  },
  {
    id: 27,
    name: "Leather Trench Coat",
    price: 2100,
    image: "/leather-trench-coat-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 28,
    name: "Pleated Midi Skirt",
    price: 580,
    image: "/pleated-midi-skirt-elegant.jpg",
    category: "Bottoms",
  },
  {
    id: 29,
    name: "Cutout Knit Top",
    price: 490,
    image: "/cutout-knit-top-edgy.jpg",
    category: "Tops",
  },
  {
    id: 30,
    name: "Structured Blazer Dress",
    price: 1150,
    image: "/structured-blazer-dress-minimal.jpg",
    category: "Dresses",
  },
  {
    id: 31,
    name: "Draped Leather Pants",
    price: 1280,
    image: "/draped-leather-pants-avant-garde.jpg",
    category: "Bottoms",
  },
  {
    id: 32,
    name: "Oversized Linen Shirt",
    price: 420,
    image: "/oversized-linen-shirt-minimal.jpg",
    category: "Tops",
  },
]

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses"]

export function NewArrivalsCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="font-light tracking-wide"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
