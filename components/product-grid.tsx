"use client";

import { ProductCard } from "@/components/product-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const products = [
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
    id: 3,
    name: "Wide-Leg Wool Trousers",
    price: 620,
    image: "/high-fashion-wide-leg-trousers-neutral-tones.jpg",
    category: "Bottoms",
  },
  {
    id: 4,
    name: "Leather Harness Vest",
    price: 890,
    image: "/edgy-leather-harness-vest-punk-fashion.jpg",
    category: "Outerwear",
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
    id: 8,
    name: "Raw Edge Denim",
    price: 420,
    image: "/distressed-raw-edge-denim-jeans-fashion.jpg",
    category: "Bottoms",
  },
];

export function ProductGrid() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses"];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="new" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground font-light">
              Curated pieces for the discerning individual
            </p>
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
  );
}
