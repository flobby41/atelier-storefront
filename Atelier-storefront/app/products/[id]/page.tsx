import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { RelatedProducts } from "@/components/related-products"
import { ProductDetails } from "@/components/product-details"
import { getProductById } from "@/lib/products"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(Number.parseInt(id))

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
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <Breadcrumbs
          items={[
            { label: product.gender === 'women' ? "Women" : "Men", href: product.gender === 'women' ? '/women' : '/men' },
            { label: product.category },
            { label: product.name },
          ]}
        />

        <ProductDetails product={product} />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>
      <Footer />
    </div>
  )
}
