"use client"

<<<<<<< HEAD:components/men-collection.tsx
import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const menProducts = [
  {
    id: 21,
    name: "Oversized Wool Coat",
    price: 1290,
    image: "/oversized-black-wool-coat-men-fashion.jpg",
    category: "Outerwear",
  },
  {
    id: 22,
    name: "Deconstructed Blazer",
    price: 890,
    image: "/deconstructed-blazer-men-avant-garde.jpg",
    category: "Outerwear",
  },
  {
    id: 23,
    name: "Asymmetric Leather Jacket",
    price: 1590,
    image: "/asymmetric-leather-jacket-men-edgy.jpg",
    category: "Outerwear",
  },
  {
    id: 24,
    name: "Draped Cotton Shirt",
    price: 420,
    image: "/draped-cotton-shirt-men-minimal.jpg",
    category: "Tops",
  },
  {
    id: 25,
    name: "Oversized Knit Sweater",
    price: 580,
    image: "/oversized-knit-sweater-men-cozy.jpg",
    category: "Tops",
  },
  {
    id: 26,
    name: "Asymmetric Hem Tee",
    price: 290,
    image: "/asymmetric-hem-tee-men-avant-garde.jpg",
    category: "Tops",
  },
  {
    id: 27,
    name: "Wide Leg Trousers",
    price: 650,
    image: "/wide-leg-trousers-men-tailored.jpg",
    category: "Bottoms",
  },
  {
    id: 28,
    name: "Cargo Pants",
    price: 520,
    image: "/cargo-pants-men-utility-fashion.jpg",
    category: "Bottoms",
  },
  {
    id: 29,
    name: "Leather Pants",
    price: 980,
    image: "/leather-pants-men-edgy-fashion.jpg",
    category: "Bottoms",
  },
  {
    id: 30,
    name: "Drop Crotch Pants",
    price: 720,
    image: "/drop-crotch-pants-men-avant-garde.jpg",
    category: "Bottoms",
  },
  {
    id: 31,
    name: "Longline Cardigan",
    price: 680,
    image: "/longline-cardigan-men-minimal.jpg",
    category: "Outerwear",
  },
  {
    id: 32,
    name: "Structured Vest",
    price: 490,
    image: "/structured-vest-men-tailored.jpg",
    category: "Outerwear",
  },
]

const categories = ["All", "Outerwear", "Tops", "Bottoms"]

export function MenCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? menProducts : menProducts.filter((product) => product.category === selectedCategory)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
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

export function MenCollection() {
  const menProducts = useMemo(() => allProducts.filter((p) => p.gender === "men"), [])

  const maxPrice = Math.max(...menProducts.map((p) => p.price))
  const availableCategories = Array.from(new Set(menProducts.map((p) => p.category)))
  const availableSizes = Array.from(new Set(menProducts.flatMap((p) => p.sizes)))

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
    sizes: [],
    sortBy: "featured",
  })

  const filteredProducts = useMemo(() => {
    let result = [...menProducts]

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
  }, [menProducts, filters])

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-2">Men's Collection</h2>
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
                      sortBy: "featured",
                    })
                  }
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
>>>>>>> feature/pdp:Atelier-storefront/components/men-collection.tsx
        </div>
      </div>
    </section>
  )
}
