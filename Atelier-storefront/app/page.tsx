import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { FeaturedCarousel } from "@/components/featured-carousel"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <FeaturedCarousel />
      <Hero />
      <ProductGrid />
      <Newsletter />
      <Footer />
    </main>
  )
}
