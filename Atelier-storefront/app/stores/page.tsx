import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock } from "lucide-react"

export default function StoresPage() {
  const stores = [
    {
      city: "Paris",
      address: "24 Rue de Rivoli, 75004 Paris, France",
      phone: "+33 1 42 77 88 99",
      hours: "Mon-Sat: 10:00-19:00, Sun: 12:00-18:00",
    },
    {
      city: "New York",
      address: "125 Greene Street, New York, NY 10012",
      phone: "+1 212 555 0123",
      hours: "Mon-Sat: 11:00-20:00, Sun: 12:00-19:00",
    },
    {
      city: "Tokyo",
      address: "3-14-1 Minami-Aoyama, Minato-ku, Tokyo",
      phone: "+81 3 1234 5678",
      hours: "Daily: 11:00-20:00",
    },
    {
      city: "London",
      address: "45 Conduit Street, Mayfair, London W1S 2YL",
      phone: "+44 20 7123 4567",
      hours: "Mon-Sat: 10:00-19:00, Sun: 12:00-18:00",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8 text-center text-balance">Our Stores</h1>
            <p className="text-xl text-muted-foreground font-light text-center mb-16 text-pretty">
              Visit us in person to experience the full collection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {stores.map((store) => (
                <div key={store.city} className="border border-border/50 p-8">
                  <h2 className="text-3xl font-light tracking-wide mb-6">{store.city}</h2>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground font-light">{store.address}</p>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground font-light">{store.phone}</p>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground font-light">{store.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
