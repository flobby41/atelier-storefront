import { Header } from "@/components/header"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden bg-muted">
        <img
          src="/atelier-fashion-studio-minimal-aesthetic.jpg"
          alt="Atelier Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl lg:text-7xl font-light tracking-widest mb-4 text-balance">About Atelier</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6 text-balance">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed text-pretty">
                Atelier was born from a desire to challenge conventional fashion. We believe in creating pieces that
                transcend trends, merging avant-garde design with wearable artistry. Each garment is a statement of
                individuality, crafted for those who dare to redefine their style.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 py-8">
              <div className="space-y-4">
                <h3 className="text-xl font-light tracking-wide">Craftsmanship</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                  Every piece is meticulously constructed using premium materials and innovative techniques. We work
                  with artisans who share our commitment to excellence and attention to detail.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-light tracking-wide">Sustainability</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                  We prioritize ethical production and sustainable practices. Our collections are designed to last,
                  reducing waste and promoting conscious consumption in the fashion industry.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6 text-balance">Design Inspiration</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6 text-pretty">
                Drawing inspiration from architectural forms, street culture, and the rebellious spirit of punk, our
                designs embody a unique fusion of elegance and edge. We celebrate the beauty of imperfection and the
                power of self-expression.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed text-pretty">
                Influenced by visionaries like Isabel Marant's effortless Parisian cool, Rick Owens' dark minimalism,
                and Vivienne Westwood's punk rebellion, Atelier creates a distinctive aesthetic that speaks to the
                modern individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-12 text-center text-balance">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Innovation</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                Pushing boundaries with experimental silhouettes and unconventional design approaches.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Authenticity</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                Creating pieces that reflect genuine artistic vision and personal expression.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Quality</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                Uncompromising standards in materials, construction, and finishing details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}
