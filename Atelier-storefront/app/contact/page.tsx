import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">Contact Us</h1>
            <p className="text-xl text-muted-foreground font-light text-center mb-16 text-pretty">
              We'd love to hear from you. Get in touch with our team.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-light tracking-wide mb-8">Send us a message</h2>
                <form className="space-y-6">
                  <div>
                    <Input type="text" placeholder="Full Name" className="bg-background border-border/50" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" className="bg-background border-border/50" />
                  </div>
                  <div>
                    <Input type="text" placeholder="Subject" className="bg-background border-border/50" />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      className="bg-background border-border/50 resize-none"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide mb-8">Get in touch</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-light tracking-wide mb-2">Email</h3>
                      <p className="text-muted-foreground font-light">contact@atelier-fashion.com</p>
                      <p className="text-muted-foreground font-light">support@atelier-fashion.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-light tracking-wide mb-2">Phone</h3>
                      <p className="text-muted-foreground font-light">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground font-light text-sm">Mon-Fri: 9:00-18:00 EST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-light tracking-wide mb-2">Headquarters</h3>
                      <p className="text-muted-foreground font-light">
                        125 Greene Street
                        <br />
                        New York, NY 10012
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
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
