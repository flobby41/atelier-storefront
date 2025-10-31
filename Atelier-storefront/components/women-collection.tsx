"use client"

import { ProductCard } from "@/components/product-card"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FilterPanel, type FilterState } from "@/components/filter-panel"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { allProducts } from "@/lib/products"

export function WomenCollection() {
  const womenProducts = useMemo(() => allProducts.filter((p) => p.gender === "women"), [])

  const maxPrice = Math.max(...womenProducts.map((p) => p.price))
  const availableCategories = Array.from(new Set(womenProducts.map((p) => p.category)))
  const availableSizes = Array.from(new Set(womenProducts.flatMap((p) => p.sizes)))

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
    sizes: [],
    sortBy: "featured",
  })

  const filteredProducts = useMemo(() => {
    let result = [...womenProducts]

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
  }, [womenProducts, filters])

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-2">Women's Collection</h2>
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
        </div>
      </div>
    </section>
  )
}
