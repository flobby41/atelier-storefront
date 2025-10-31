"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"

export function ProductsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const products = allProducts.slice(0, 12)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative w-full bg-background py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-light tracking-wider">Featured Products</h2>
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="icon" onClick={scrollPrev} className="bg-accent/10 hover:bg-accent/20">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={scrollNext} className="bg-accent/10 hover:bg-accent/20">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 pr-4">
            {products.map((p) => (
              <div key={p.id} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]">
                <ProductCard
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.images[0],
                    category: p.category,
                    sizes: p.sizes,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
          <Button variant="ghost" size="icon" onClick={scrollPrev} className="bg-accent/10 hover:bg-accent/20">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={scrollNext} className="bg-accent/10 hover:bg-accent/20">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
