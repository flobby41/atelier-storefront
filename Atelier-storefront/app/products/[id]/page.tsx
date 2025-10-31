"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RelatedProducts } from "@/components/related-products"
import { ProductDetails } from "@/components/product-details"
import { getProductById } from "@/lib/products"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

// Mock product data - in a real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Deconstructed Wool Blazer",
    price: 1850,
    category: "Outerwear",
    description:
      "An avant-garde interpretation of the classic blazer. Featuring asymmetric cuts, raw edges, and a draped silhouette that embodies the rebellious spirit of contemporary fashion. Crafted from premium Italian wool with an unstructured design.",
    images: [
      "/deconstructed-black-wool-blazer-avant-garde.jpg",
      "/deconstructed-blazer-detail-back-view.jpg",
      "/deconstructed-blazer-styling-editorial.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Italian Wool", "Unlined construction", "Asymmetric hem", "Raw edge detailing", "Made in Italy"],
  },
  {
    id: 2,
    name: "Draped Leather Trousers",
    price: 2200,
    category: "Bottoms",
    description:
      "Sculptural leather trousers with an exaggerated drape and low-slung waist. The fluid silhouette contrasts with the structured material, creating a striking balance between soft and hard elements.",
    images: [
      "/draped-black-leather-trousers-avant-garde.jpg",
      "/leather-trousers-detail-draping.jpg",
      "/leather-trousers-back-view.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Lambskin Leather",
      "Low-rise waist",
      "Draped leg construction",
      "Side zip closure",
      "Made in France",
    ],
  },
  {
    id: 3,
    name: "Oversized Linen Shirt",
    price: 680,
    category: "Tops",
    description:
      "Effortlessly cool oversized shirt in premium French linen. The relaxed fit and natural texture embody Parisian nonchalance with a modern edge.",
    images: [
      "/oversized-cream-linen-shirt-minimal.jpg",
      "/linen-shirt-detail-texture.jpg",
      "/oversized-shirt-styling.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% French Linen", "Oversized fit", "Mother of pearl buttons", "Dropped shoulders", "Made in Portugal"],
  },
]

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

        <ProductDetails product={product} />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>
      <Footer />
    </div>
  )
}
