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
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
  },
  {
    id: 2,
    name: "Draped Leather Trousers",
    price: 2200,
    image: "/draped-black-leather-trousers-avant-garde.jpg",
    category: "Bottoms",
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
  },
  {
    id: 3,
    name: "Oversized Linen Shirt",
    price: 680,
    image: "/oversized-cream-linen-shirt-minimal.jpg",
    category: "Tops",
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
  },
  {
    id: 4,
    name: "Asymmetric Knit Dress",
    price: 1450,
    image: "/asymmetric-black-knit-dress-avant-garde.jpg",
    category: "Dresses",
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
  },
  {
    id: 5,
    name: "Structured Leather Jacket",
    price: 3200,
    image: "/structured-black-leather-jacket-minimal.jpg",
    category: "Outerwear",
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
  },
  {
    id: 6,
    name: "Wide Leg Wool Trousers",
    price: 890,
    image: "/wide-leg-grey-wool-trousers-minimal.jpg",
    category: "Bottoms",
<<<<<<< HEAD:components/related-products.tsx
=======
    sizes: ["S", "M", "L"],
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
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
<<<<<<< HEAD:components/related-products.tsx
          <ProductCard key={product.id} product={{ ...product, image: product.images[0] }} />
=======
          <ProductCard
            key={product.id}
            product={{
              ...product,
              image: product.images[0],
              sizes: product.sizes,
            }}
          />
>>>>>>> feature/pdp:Atelier-storefront/components/related-products.tsx
        ))}
      </div>
    </section>
  )
}
