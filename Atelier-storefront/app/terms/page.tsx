import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Terms & Conditions
            </h1>
            <p className="text-sm text-muted-foreground font-light text-center mb-16">Last updated: January 2025</p>

            <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Agreement to Terms</h2>
                <p className="text-pretty">
                  By accessing and using the ATELIER website, you agree to be bound by these Terms and Conditions. If
                  you do not agree with any part of these terms, you may not access the website or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Use of Website</h2>
                <p className="mb-3 text-pretty">
                  You agree to use our website only for lawful purposes and in a way that does not infringe upon the
                  rights of others. You may not:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Use the website in any way that violates applicable laws</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Use automated systems to access the website without permission</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Product Information</h2>
                <p className="text-pretty">
                  We strive to provide accurate product descriptions and images. However, we do not warrant that product
                  descriptions, colors, or other content are accurate, complete, or error-free. We reserve the right to
                  correct any errors and to change or update information at any time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Pricing and Payment</h2>
                <p className="text-pretty">
                  All prices are listed in USD and are subject to change without notice. We reserve the right to refuse
                  or cancel any order for any reason, including pricing errors. Payment must be received before orders
                  are processed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Intellectual Property</h2>
                <p className="text-pretty">
                  All content on this website, including text, graphics, logos, images, and software, is the property of
                  ATELIER and is protected by copyright and trademark laws. You may not reproduce, distribute, or create
                  derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Limitation of Liability</h2>
                <p className="text-pretty">
                  ATELIER shall not be liable for any indirect, incidental, special, or consequential damages arising
                  out of or in connection with your use of the website or purchase of products.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Changes to Terms</h2>
                <p className="text-pretty">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting to the website. Your continued use of the website after changes constitutes acceptance of the
                  modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Contact Information</h2>
                <p className="text-pretty">
                  For questions about these Terms and Conditions, please contact us at legal@atelier-fashion.com.
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
