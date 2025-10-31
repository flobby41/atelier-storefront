"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { allProducts } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")

  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase()
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.gender?.toLowerCase().includes(searchTerm),
    )
  }, [query])

  const handleClose = () => {
    setQuery("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-light tracking-wide">Search Products</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, category, or style..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!query.trim() ? (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm font-light">Start typing to search products</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm font-light">No products found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-light">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
              </p>
              <div className="grid gap-4">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={handleClose}
                    className="flex gap-4 p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light text-base mb-1 group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="capitalize">{product.category}</span>
                        {product.gender && (
                          <>
                            <span>•</span>
                            <span className="capitalize">{product.gender}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="font-medium text-foreground">${product.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
