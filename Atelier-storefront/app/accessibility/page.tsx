import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Eye, Keyboard, Volume2, MousePointer } from "lucide-react"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Accessibility Statement
            </h1>
            <p className="text-xl text-muted-foreground font-light text-center mb-16 text-pretty">
              We are committed to ensuring digital accessibility for all users.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4">Our Commitment</h2>
                <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                  ATELIER is committed to ensuring that our website is accessible to people with disabilities. We
                  continually improve the user experience for everyone and apply relevant accessibility standards to
                  ensure we provide equal access to all users.
                </p>
              </div>

              <div className="flex gap-6">
                <Eye className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Visual Accessibility</h2>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li>High contrast text and backgrounds</li>
                    <li>Resizable text without loss of functionality</li>
                    <li>Alternative text for all images</li>
                    <li>Clear and consistent navigation</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <Keyboard className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Keyboard Navigation</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    Our website is fully navigable using only a keyboard. All interactive elements can be accessed using
                    Tab, Enter, and arrow keys.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <Volume2 className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Screen Reader Compatibility</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    We use semantic HTML and ARIA labels to ensure compatibility with popular screen readers including
                    JAWS, NVDA, and VoiceOver.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <MousePointer className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-4">Interactive Elements</h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                    All buttons, links, and form elements have clear focus indicators and are large enough to be easily
                    clicked or tapped.
                  </p>
                </div>
              </div>

              <div className="border-t border-border/50 pt-8">
                <h2 className="text-2xl font-light tracking-wide mb-4">Feedback</h2>
                <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                  We welcome feedback on the accessibility of our website. If you encounter any accessibility barriers,
                  please contact us at accessibility@atelier-fashion.com. We will work to resolve the issue promptly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4">Standards</h2>
                <p className="text-muted-foreground font-light leading-relaxed text-pretty">
                  Our website aims to conform to Level AA of the Web Content Accessibility Guidelines (WCAG) 2.1. These
                  guidelines explain how to make web content more accessible for people with disabilities.
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
