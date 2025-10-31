import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground font-light text-center mb-16">Last updated: January 2025</p>

            <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Introduction</h2>
                <p className="text-pretty">
                  At ATELIER, we respect your privacy and are committed to protecting your personal data. This privacy
                  policy explains how we collect, use, and safeguard your information when you visit our website or make
                  a purchase.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Information We Collect</h2>
                <p className="mb-3 text-pretty">We collect information that you provide directly to us, including:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Name, email address, and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">How We Use Your Information</h2>
                <p className="mb-3 text-pretty">We use the information we collect to:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and customer experience</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Data Security</h2>
                <p className="text-pretty">
                  We implement appropriate technical and organizational measures to protect your personal data against
                  unauthorized access, alteration, disclosure, or destruction. All payment information is encrypted and
                  processed through secure payment gateways.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Your Rights</h2>
                <p className="mb-3 text-pretty">You have the right to:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">Contact Us</h2>
                <p className="text-pretty">
                  If you have any questions about this privacy policy or our data practices, please contact us at
                  privacy@atelier-fashion.com.
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
