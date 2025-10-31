import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, Truck, Globe } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Shipping Information
            </h1>

            <div className="space-y-12 mt-16">
              <div className="flex gap-6">
                <Package className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Processing Time</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends
                    or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <Truck className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Domestic Shipping</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    We offer free standard shipping on all orders over $200. For orders under $200, shipping costs are
                    calculated at checkout.
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Standard Shipping (5-7 business days): $15</li>
                    <li>Express Shipping (2-3 business days): $25</li>
                    <li>Next Day Delivery: $35</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <Globe className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">International Shipping</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    We ship to over 100 countries worldwide. International shipping rates and delivery times vary by
                    destination.
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Europe: 7-14 business days</li>
                    <li>Asia: 10-21 business days</li>
                    <li>Rest of World: 14-28 business days</li>
                  </ul>
                  <p className="text-muted-foreground font-light leading-relaxed mt-4 text-pretty">
                    Please note that international orders may be subject to import duties and taxes, which are the
                    responsibility of the customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
