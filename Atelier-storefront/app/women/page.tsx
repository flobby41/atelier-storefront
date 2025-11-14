import { Header } from "@/components/header"
import { WomenCollection } from "@/components/women-collection"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { shopifyFetch, isShopifyConfigured } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"
import { allProducts } from "@/lib/products"

export default async function WomenPage() {
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
        variables: { first: 250 },
        revalidate: 60, // Revalidate every 60 seconds
      })

      const allShopifyProducts = response.data?.products.edges.map((edge) => normalizeProduct(edge.node)) || []
      
      // Filter products with "women" tag
      products = allShopifyProducts.filter((product) => 
        product.details?.some((tag: string) => tag.toLowerCase() === "women")
      )
    } catch (error) {
      console.error('Error fetching from Shopify, falling back to mock products:', error)
    }
  }

  // Fallback to mock products if Shopify is not configured or fetch failed
  if (products.length === 0) {
    products = allProducts
      .filter((p) => p.gender === "women")
      .map((product) => ({
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

      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-muted">
        <img
          src="/elegant-woman-in-avant-garde-fashion-minimal-aesth.jpg"
          alt="Women's Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl lg:text-7xl font-light tracking-widest mb-4 text-balance">Women's Collection</h1>
          <p className="text-lg lg:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto text-pretty">
            Avant-garde pieces that redefine contemporary femininity
          </p>
        </div>
      </section>

      <WomenCollection products={products} />
      <Newsletter />
      <Footer />
    </main>
  )
}
