"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { X, ShoppingBag } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

interface WishlistSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WishlistSheet({ open, onOpenChange }: WishlistSheetProps) {
  const { items, removeItem } = useWishlist()
  const { addItem: addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-light tracking-wider">Wishlist</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-muted-foreground font-light mb-4">Your wishlist is empty</p>
            <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4 mt-8">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Link
                      href={`/products/${item.id}`}
                      className="relative w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0 group"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <Link href={`/products/${item.id}`}>
                            <h4 className="font-light text-sm leading-tight pr-2 hover:text-accent transition-colors">
                              {item.name}
                            </h4>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mt-1"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                        <p className="text-sm font-mono">${item.price.toLocaleString()}</p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 bg-transparent"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
              </p>
              <Button className="w-full" size="lg" onClick={() => onOpenChange(false)}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
