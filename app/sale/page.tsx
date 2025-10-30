import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"

export default function SalePage() {
  // Filter products that are on sale (you can add a sale property to products later)
  const saleProducts = allProducts.filter((p) => [2, 5, 7, 12, 15, 23, 26, 29, 32].includes(p.id))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6 text-balance">Sale</h1>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto text-pretty">
                Discover exceptional pieces at reduced prices. Limited time only.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
