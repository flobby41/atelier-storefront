import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Leaf, Recycle, Heart, Globe } from "lucide-react"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Sustainability
            </h1>
            <p className="text-xl text-muted-foreground font-light text-center mb-16 text-pretty">
              Our commitment to a better future through conscious fashion.
            </p>

            <div className="space-y-16">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Leaf className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Organic Materials</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    We source only certified organic and sustainable materials, working directly with suppliers who
                    share our values. Our fabrics are chosen for their minimal environmental impact and exceptional
                    quality.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Recycle className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Circular Fashion</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    Every piece is designed for longevity and recyclability. We offer repair services and take-back
                    programs to ensure our garments have multiple lives and never end up in landfills.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Ethical Production</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    All our garments are produced in fair-trade certified facilities where workers receive living wages
                    and safe working conditions. We believe fashion should never come at the cost of human dignity.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Globe className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Carbon Neutral</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    We offset 100% of our carbon emissions through verified environmental projects. Our goal is to
                    become carbon negative by 2026, actively removing more carbon than we produce.
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
