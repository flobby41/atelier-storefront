"use client"

<<<<<<< HEAD:components/new-arrivals-collection.tsx
import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 21,
    name: "Sculptural Wool Coat",
    price: 1890,
    image: "/sculptural-wool-coat-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 22,
    name: "Asymmetric Silk Blouse",
    price: 680,
    image: "/asymmetric-silk-blouse-minimal.jpg",
    category: "Tops",
  },
  {
    id: 23,
    name: "Deconstructed Denim Jacket",
    price: 890,
    image: "/deconstructed-denim-jacket-edgy.jpg",
    category: "Outerwear",
  },
  {
    id: 24,
    name: "Draped Jersey Dress",
    price: 750,
    image: "/draped-jersey-dress-elegant.jpg",
    category: "Dresses",
  },
  {
    id: 25,
    name: "Oversized Cashmere Sweater",
    price: 920,
    image: "/oversized-cashmere-sweater-luxury.jpg",
    category: "Tops",
  },
  {
    id: 26,
    name: "Wide-Leg Wool Trousers",
    price: 650,
    image: "/wide-leg-wool-trousers-tailored.jpg",
    category: "Bottoms",
  },
  {
    id: 27,
    name: "Leather Trench Coat",
    price: 2100,
    image: "/leather-trench-coat-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 28,
    name: "Pleated Midi Skirt",
    price: 580,
    image: "/pleated-midi-skirt-elegant.jpg",
    category: "Bottoms",
  },
  {
    id: 29,
    name: "Cutout Knit Top",
    price: 490,
    image: "/cutout-knit-top-edgy.jpg",
    category: "Tops",
  },
  {
    id: 30,
    name: "Structured Blazer Dress",
    price: 1150,
    image: "/structured-blazer-dress-minimal.jpg",
    category: "Dresses",
  },
  {
    id: 31,
    name: "Draped Leather Pants",
    price: 1280,
    image: "/draped-leather-pants-avant-garde.jpg",
    category: "Bottoms",
  },
  {
    id: 32,
    name: "Oversized Linen Shirt",
    price: 420,
    image: "/oversized-linen-shirt-minimal.jpg",
    category: "Tops",
  },
]

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses"]

export function NewArrivalsCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="font-light tracking-wide"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
=======
import { ProductCard } from "@/components/product-card"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FilterPanel, type FilterState } from "@/components/filter-panel"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { allProducts } from "@/lib/products"

export function NewArrivalsCollection() {
  const newArrivalsProducts = useMemo(() => {
    // Get the newest products from each gender category
    const womenProducts = allProducts.filter((p) => p.gender === "women").slice(-6)
    const menProducts = allProducts.filter((p) => p.gender === "men").slice(-6)
    const unisexProducts = allProducts.filter((p) => p.gender === "unisex")

    // Combine and sort by ID descending to show newest first
    return [...womenProducts, ...menProducts, ...unisexProducts].sort((a, b) => b.id - a.id).slice(0, 12)
  }, [])

  const maxPrice = Math.max(...newArrivalsProducts.map((p) => p.price))
  const availableCategories = Array.from(new Set(newArrivalsProducts.map((p) => p.category)))
  const availableSizes = Array.from(new Set(newArrivalsProducts.flatMap((p) => p.sizes)))

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
    sizes: [],
    sortBy: "newest",
  })

  const filteredProducts = useMemo(() => {
    let result = [...newArrivalsProducts]

    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }

    // Filter by price range
    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    // Filter by size
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((size) => filters.sizes.includes(size)))
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => b.id - a.id)
        break
      default:
        // featured - keep original order
        break
    }

    return result
  }, [newArrivalsProducts, filters])

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-2">New Arrivals</h2>
            <p className="text-muted-foreground font-light">
              {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px] p-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableCategories={availableCategories}
                availableSizes={availableSizes}
                maxPrice={maxPrice}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 border border-border/40 rounded-sm">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableCategories={availableCategories}
                availableSizes={availableSizes}
                maxPrice={maxPrice}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      category: product.category,
                      sizes: product.sizes,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-light">No products match your filters</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      categories: [],
                      priceRange: [0, maxPrice],
                      sizes: [],
                      sortBy: "newest",
                    })
                  }
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
>>>>>>> feature/pdp:Atelier-storefront/components/new-arrivals-collection.tsx
        </div>
      </div>
    </section>
  )
}
