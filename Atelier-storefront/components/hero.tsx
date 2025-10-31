import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="/avant-garde-fashion-model-in-dramatic-lighting-wea.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 text-balance">
          Avant-Garde
          <br />
          <span className="italic font-normal">Elegance</span>
        </h2>
        <p className="text-lg md:text-xl font-light tracking-wide mb-8 max-w-2xl mx-auto text-muted-foreground">
          Where rebellion meets refinement. Discover pieces that challenge convention.
        </p>
        <Link href="/newarrivals">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-widest"
          >
            EXPLORE COLLECTION
          </Button>
        </Link>
      </div>
    </section>
  )
}
