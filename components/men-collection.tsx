"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const menProducts = [
  {
    id: 21,
    name: "Oversized Wool Coat",
    price: 1290,
    image: "/oversized-black-wool-coat-men-fashion.jpg",
    category: "Outerwear",
  },
  {
    id: 22,
    name: "Deconstructed Blazer",
    price: 890,
    image: "/deconstructed-blazer-men-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 23,
    name: "Asymmetric Leather Jacket",
    price: 1590,
    image: "/asymmetric-leather-jacket-men-edgy.jpg",
    category: "Outerwear",
  },
  {
    id: 24,
    name: "Draped Cotton Shirt",
    price: 420,
    image: "/draped-cotton-shirt-men-minimal.jpg",
    category: "Tops",
  },
  {
    id: 25,
    name: "Oversized Knit Sweater",
    price: 580,
    image: "/oversized-knit-sweater-men-cozy.jpg",
    category: "Tops",
  },
  {
    id: 26,
    name: "Asymmetric Hem Tee",
    price: 290,
    image: "/asymmetric-hem-tee-men-avant-garde.jpg",
    category: "Tops",
  },
  {
    id: 27,
    name: "Wide Leg Trousers",
    price: 650,
    image: "/wide-leg-trousers-men-tailored.jpg",
    category: "Bottoms",
  },
  {
    id: 28,
    name: "Cargo Pants",
    price: 520,
    image: "/cargo-pants-men-utility-fashion.jpg",
    category: "Bottoms",
  },
  {
    id: 29,
    name: "Leather Pants",
    price: 980,
    image: "/leather-pants-men-edgy-fashion.jpg",
    category: "Bottoms",
  },
  {
    id: 30,
    name: "Drop Crotch Pants",
    price: 720,
    image: "/drop-crotch-pants-men-avant-garde.jpg",
    category: "Bottoms",
  },
  {
    id: 31,
    name: "Longline Cardigan",
    price: 680,
    image: "/longline-cardigan-men-minimal.jpg",
    category: "Outerwear",
  },
  {
    id: 32,
    name: "Structured Vest",
    price: 490,
    image: "/structured-vest-men-tailored.jpg",
    category: "Outerwear",
  },
]

const categories = ["All", "Outerwear", "Tops", "Bottoms"]

export function MenCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? menProducts : menProducts.filter((product) => product.category === selectedCategory)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
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
