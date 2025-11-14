import { Header } from "@/components/header"
import { NewArrivalsCollection } from "@/components/new-arrivals-collection"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function NewArrivalsPage() {
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

      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: "New Arrivals" }]} />
      </div>

      <NewArrivalsCollection />
      <Newsletter />
      <Footer />
    </main>
  )
}
