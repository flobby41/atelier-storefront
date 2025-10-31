import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { ProductsCarousel } from "@/components/products-carousel"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <ProductsCarousel />
      <Newsletter />
      <Footer />
    </main>
  )
}
