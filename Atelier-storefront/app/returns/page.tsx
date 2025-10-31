import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RotateCcw, CheckCircle, XCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Returns & Exchanges
            </h1>

            <div className="space-y-12 mt-16">
              <div className="flex gap-6">
                <RotateCcw className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Return Policy</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original
                    condition with all tags attached. We offer free returns for domestic orders.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Eligible for Return</h2>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Items in original condition with tags attached</li>
                    <li>Unworn and unwashed garments</li>
                    <li>Items purchased at full price or on sale</li>
                    <li>Defective or damaged items</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <XCircle className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Not Eligible for Return</h2>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Items marked as final sale</li>
                    <li>Worn, washed, or altered items</li>
                    <li>Items without original tags</li>
                    <li>Underwear and swimwear (for hygiene reasons)</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-border/50 pt-8">
                <h2 className="text-2xl font-light tracking-wide mb-4">How to Return</h2>
                <ol className="space-y-3 text-muted-foreground font-light list-decimal list-inside">
                  <li>Log into your account and go to Order History</li>
                  <li>Select the order and items you wish to return</li>
                  <li>Print the prepaid return label</li>
                  <li>Pack items securely in original packaging</li>
                  <li>Drop off at any authorized shipping location</li>
                </ol>
                <p className="text-muted-foreground font-light leading-relaxed mt-6 text-pretty">
                  Refunds will be processed within 5-7 business days after we receive your return.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
