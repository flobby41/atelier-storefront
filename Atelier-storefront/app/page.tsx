import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { ProductsCarousel } from "@/components/products-carousel"
import { shopifyFetch, isShopifyConfigured } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"
import { allProducts } from "@/lib/products"

export default async function Home() {
  let products: any[] = []

  // Try to fetch from Shopify if configured
  if (isShopifyConfigured) {
    try {
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

      products = response.data?.products.edges.map((edge) => normalizeProduct(edge.node)) || []
    } catch (error) {
      console.error('Error fetching from Shopify, falling back to mock products:', error)
    }
  }

  // Fallback to mock products if Shopify is not configured or fetch failed
  if (products.length === 0) {
    products = allProducts.slice(0, 24).map((product) => ({
      id: product.id.toString(),
      handle: product.name.toLowerCase().replace(/\s+/g, "-"),
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images,
      sizes: product.sizes,
      details: product.details,
      variants: product.sizes.map((size) => ({
        id: `mock-${product.id}-${size}`,
        title: `${product.name} - ${size}`,
        price: product.price,
        available: true,
        selectedOptions: [{ name: "Size", value: size }],
        image: product.images[0] || "/placeholder.svg",
      })),
    }))
  }

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
