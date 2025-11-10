import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { ProductsCarousel } from "@/components/products-carousel"
import { shopifyFetch } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"

export default async function Home() {
  // Fetch products from Shopify
  const response = await shopifyFetch<{
    products: {
      edges: Array<{
        node: any
      }>
    }
  }>({
    query: PRODUCTS_QUERY,
    variables: { first: 24 },
    revalidate: 60, // Revalidate every 60 seconds
  })

  const products = response.data?.products.edges.map((edge) => normalizeProduct(edge.node)) || []

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid products={products.map(p => ({ ...p, handle: p.handle }))} />
      <ProductsCarousel products={products.slice(0, 8)} />
      <Newsletter />
      <Footer />
    </main>
  )
}
