import { Header } from "@/components/header"
import { NewArrivalsCollection } from "@/components/new-arrivals-collection"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { shopifyFetch, isShopifyConfigured } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"
import { allProducts } from "@/lib/products"

export default async function NewArrivalsPage() {
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
      
      // For new arrivals, we can filter by "new-arrivals" tag or take the most recent products
      // First try to filter by "new-arrivals" tag
      let newArrivals = allShopifyProducts.filter((product) => 
        product.details?.some((tag: string) => tag.toLowerCase() === "new-arrivals" || tag.toLowerCase() === "new arrivals")
      )
      
      // If no products with "new-arrivals" tag, take the first 12 products (most recent)
      if (newArrivals.length === 0) {
        newArrivals = allShopifyProducts.slice(0, 12)
      }
      
      products = newArrivals
    } catch (error) {
      console.error('Error fetching from Shopify, falling back to mock products:', error)
    }
  }

  // Fallback to mock products if Shopify is not configured or fetch failed
  if (products.length === 0) {
    const womenProducts = allProducts.filter((p) => p.gender === "women").slice(-6)
    const menProducts = allProducts.filter((p) => p.gender === "men").slice(-6)
    const unisexProducts = allProducts.filter((p) => p.gender === "unisex")
    
    products = [...womenProducts, ...menProducts, ...unisexProducts]
      .sort((a, b) => b.id - a.id)
      .slice(0, 12)
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
          src="/new-arrivals-hero-avant-garde-fashion.jpg"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl lg:text-7xl font-light tracking-widest mb-4 text-balance">New Arrivals</h1>
          <p className="text-lg lg:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto text-pretty">
            Discover the latest pieces from our avant-garde collection
          </p>
        </div>
      </section>

      <NewArrivalsCollection products={products} />
      <Newsletter />
      <Footer />
    </main>
  )
}
