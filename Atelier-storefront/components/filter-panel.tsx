"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  sizes: string[]
  sortBy: string
}

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableCategories: string[]
  availableSizes: string[]
  maxPrice: number
  onClose?: () => void
}

export function FilterPanel({
  filters,
  onFiltersChange,
  availableCategories,
  availableSizes,
  maxPrice,
  onClose,
}: FilterPanelProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size]
    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value })
  }

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, maxPrice],
      sizes: [],
      sortBy: "featured",
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice ? 1 : 0)

  return (
    <div className="w-full h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/40">
        <div>
          <h3 className="text-lg font-light tracking-wider">Filters</h3>
          {activeFiltersCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {activeFiltersCount} active {activeFiltersCount === 1 ? "filter" : "filters"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
              Reset
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Sort */}
        <div className="space-y-3">
          <Label className="text-sm font-light tracking-wider">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-light tracking-wider">Category</Label>
          <div className="space-y-2">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-light tracking-wider">Price Range</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={maxPrice}
              step={50}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <Label className="text-sm font-light tracking-wider">Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSizeToggle(size)}
                className="text-xs"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
