import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RelatedProducts } from "@/components/related-products"
import { ProductDetails } from "@/components/product-details"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { shopifyFetch } from "@/lib/shopify"
import { PRODUCT_BY_HANDLE_QUERY, PRODUCT_BY_ID_QUERY, PRODUCTS_QUERY } from "@/lib/queries"
import { normalizeProduct } from "@/lib/shopify-types"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let product = null

  // Check if id is a Shopify GID (starts with gid://)
  const isShopifyGID = id.startsWith('gid://')
  
  if (isShopifyGID) {
    // Try to fetch by ID directly
    const idResponse = await shopifyFetch<{
      product: any
    }>({
      query: PRODUCT_BY_ID_QUERY,
      variables: { id },
      revalidate: 60,
    })
    
    if (idResponse.data?.product) {
      product = normalizeProduct(idResponse.data.product)
    }
  } else {
    // Try to fetch by handle first (Shopify uses handles for URLs)
    const handleResponse = await shopifyFetch<{
      product: any
    }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: id },
      revalidate: 60,
    })

    if (handleResponse.data?.product) {
      product = normalizeProduct(handleResponse.data.product)
    }
  }

  // If still not found, try to fetch all products and find by ID or handle
  if (!product) {
    const productsResponse = await shopifyFetch<{
      products: {
        edges: Array<{
          node: any
        }>
      }
    }>({
      query: PRODUCTS_QUERY,
      variables: { first: 250 },
      revalidate: 60,
    })

    const allProducts = productsResponse.data?.products.edges.map((edge) => normalizeProduct(edge.node)) || []
    product = allProducts.find((p) => p.id === id || p.handle === id)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product not found</h1>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <ProductDetails product={product} />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} currentProductCategory={product.category} />
      </div>
      <Footer />
    </div>
  )
}
