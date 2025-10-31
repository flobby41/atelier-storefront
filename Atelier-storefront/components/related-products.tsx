"use client"

import { ProductCard } from "./product-card"
import { getRelatedProducts } from "@/lib/products"

// Mock products data
const allProducts = [
  {
    id: 1,
    name: "Deconstructed Wool Blazer",
    price: 1850,
    image: "/deconstructed-black-wool-blazer-avant-garde.jpg",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
  },
  {
    id: 2,
    name: "Draped Leather Trousers",
    price: 2200,
    image: "/draped-black-leather-trousers-avant-garde.jpg",
    category: "Bottoms",
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Oversized Linen Shirt",
    price: 680,
    image: "/oversized-cream-linen-shirt-minimal.jpg",
    category: "Tops",
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Asymmetric Knit Dress",
    price: 1450,
    image: "/asymmetric-black-knit-dress-avant-garde.jpg",
    category: "Dresses",
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Structured Leather Jacket",
    price: 3200,
    image: "/structured-black-leather-jacket-minimal.jpg",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "Wide Leg Wool Trousers",
    price: 890,
    image: "/wide-leg-grey-wool-trousers-minimal.jpg",
    category: "Bottoms",
    sizes: ["S", "M", "L"],
  },
]

interface RelatedProductsProps {
  currentProductId: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(currentProductId, 4)

  return (
    <section>
      <h2 className="text-2xl font-light tracking-wider mb-8 text-center">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              image: product.images[0],
              sizes: product.sizes,
            }}
          />
        ))}
      </div>
    </section>
  )
}
