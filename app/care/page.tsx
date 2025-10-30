import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Droplets, Wind, Sun, Shirt } from "lucide-react"

export default function CarePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">Care Guide</h1>
            <p className="text-xl text-muted-foreground font-light text-center mb-16 text-pretty">
              Proper care ensures your garments maintain their beauty for years to come.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6">
                <Droplets className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Washing</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    We recommend dry cleaning for most of our pieces to preserve their structure and finish. If hand
                    washing is necessary:
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Use cold water and gentle detergent</li>
                    <li>Never wring or twist the fabric</li>
                    <li>Wash dark colors separately</li>
                    <li>Turn garments inside out before washing</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <Wind className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Drying</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    Proper drying is essential to maintain the shape and quality of your garments:
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Air dry flat on a clean towel</li>
                    <li>Avoid direct sunlight</li>
                    <li>Never use a tumble dryer</li>
                    <li>Reshape while damp</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <Sun className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Ironing & Steaming</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    To remove wrinkles and maintain a crisp appearance:
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Use a steamer for delicate fabrics</li>
                    <li>Iron on low heat with a pressing cloth</li>
                    <li>Always iron inside out</li>
                    <li>Avoid ironing embellishments directly</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <Shirt className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Storage</h2>
                  <p className="text-muted-foreground font-light leading-relaxed mb-4 text-pretty">
                    Proper storage protects your investment:
                  </p>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>Store in a cool, dry place away from direct sunlight</li>
                    <li>Use padded hangers for structured pieces</li>
                    <li>Fold knits to prevent stretching</li>
                    <li>Use garment bags for long-term storage</li>
                    <li>Keep away from moisture and humidity</li>
                  </ul>
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
