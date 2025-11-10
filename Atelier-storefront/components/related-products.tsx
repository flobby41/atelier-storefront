"use client"

import { ProductCard } from "./product-card"
import { shopifyFetchClient } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"
import { useEffect, useState } from "react"

interface RelatedProductsProps {
  currentProductId: string
  currentProductCategory: string
}

export function RelatedProducts({ currentProductId, currentProductCategory }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchRelated() {
      const response = await shopifyFetchClient<{
        products: {
          edges: Array<{
            node: any
          }>
        }
      }>({
        query: PRODUCTS_QUERY,
        variables: { first: 20 },
      })

      const allProducts = response.data?.products.edges.map((edge) => normalizeProduct(edge.node)) || []
      
      // Filter products from same category, excluding current product
      const related = allProducts
        .filter((p) => p.id !== currentProductId && p.category === currentProductCategory)
        .slice(0, 4)
      
      setRelatedProducts(related)
    }

    fetchRelated()
  }, [currentProductId, currentProductCategory])

  if (relatedProducts.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-light tracking-wider mb-8 text-center">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] || '/placeholder.svg',
              category: product.category,
              sizes: product.sizes,
            }}
          />
        ))}
      </div>
    </section>
  )
}
