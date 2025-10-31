"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { ShoppingBag, Heart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  details: string[]
}

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState(0)

  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-20">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-[3/4] bg-muted rounded overflow-hidden">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-[3/4] bg-muted rounded overflow-hidden transition-all ${
                selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="lg:sticky lg:top-8 h-fit">
        <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">{product.category}</p>
        <h1 className="text-4xl font-light tracking-wide mb-4 text-balance">{product.name}</h1>
        <p className="text-2xl font-mono tracking-wider mb-8">${product.price.toLocaleString()}</p>

        <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">{product.description}</p>

        {/* Size Selector */}
        <div className="mb-8">
          <label className="text-sm tracking-wider uppercase mb-3 block">Select Size</label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 border border-border rounded transition-all ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent hover:border-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Bag
          </Button>
          <Button
            size="lg"
            variant={inWishlist ? "default" : "outline"}
            className="px-6"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
            <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
          </Button>
        </div>

        {/* Product Details */}
        <div className="border-t border-border pt-8">
          <h3 className="text-sm tracking-wider uppercase mb-4">Details</h3>
          <ul className="space-y-2">
            {product.details.map((detail, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
