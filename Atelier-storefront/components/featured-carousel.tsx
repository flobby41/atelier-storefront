"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const slides = [
  {
    id: 1,
    title: "Women's Collection",
    subtitle: "Avant-Garde Elegance",
    description: "Discover pieces that blend Parisian sophistication with rebellious edge",
    image: "/elegant-woman-in-avant-garde-fashion-minimal-aesth.jpg",
    link: "/women",
    cta: "Shop Women",
  },
  {
    id: 2,
    title: "Men's Collection",
    subtitle: "Dark Minimalism",
    description: "Explore deconstructed silhouettes and architectural designs",
    image: "/stylish-man-in-avant-garde-fashion-minimal-aesthetic.jpg",
    link: "/men",
    cta: "Shop Men",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Latest Drops",
    description: "Fresh pieces that push the boundaries of contemporary fashion",
    image: "/new-arrivals-hero-avant-garde-fashion.jpg",
    link: "/newarrivals",
    cta: "Discover Now",
  },
]

export function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
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
    <section className="relative w-full overflow-hidden bg-background">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[70vh] w-full">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl space-y-6 text-white">
                      <p className="font-serif text-sm uppercase tracking-widest text-white/90">{slide.subtitle}</p>
                      <h2 className="font-serif text-5xl leading-tight text-balance md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h2>
                      <p className="text-lg leading-relaxed text-white/90 text-pretty md:text-xl">
                        {slide.description}
                      </p>
                      <Link href={slide.link}>
                        <Button size="lg" className="mt-4 bg-white text-foreground hover:bg-white/90">
                          {slide.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
