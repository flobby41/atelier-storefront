"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from 'lucide-react'

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  sizes: string[]
  sortBy: string
  colors: string[]
}

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableCategories: string[]
  availableSizes: string[]
  maxPrice: number
  onClose?: () => void
  availableColors?: { name: string; hex: string }[]
}

export function FilterPanel({
  filters,
  onFiltersChange,
  availableCategories,
  availableSizes,
  maxPrice,
  onClose,
  availableColors = [],
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

  const handleColorToggle = (colorName: string) => {
    const newColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName]
    onFiltersChange({ ...filters, colors: newColors })
  }

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, maxPrice],
      sizes: [],
      sortBy: "featured",
      colors: [],
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice ? 1 : 0)

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/40 flex-shrink-0">
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

      <div className="p-6 space-y-8 overflow-y-auto flex-1 min-h-0">
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

        {/* Colors */}
        {availableColors.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-light tracking-wider">Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  className={`relative aspect-square rounded-full border-2 transition-all hover:scale-110 ${
                    filters.colors.includes(color.name)
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                  {filters.colors.includes(color.name) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
