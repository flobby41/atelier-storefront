"use client"

import { ShoppingBag, Menu, X, User, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet"
import { SearchDialog } from "@/components/search-dialog"
import { WishlistSheet } from "@/components/wishlist-sheet"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isCartOpen, setIsCartOpen } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const { items: wishlistItems } = useWishlist()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu - Left */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>

            {/* Logo - Center */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Link href="/">
                <h1 className="text-2xl lg:text-3xl font-light tracking-wider text-foreground cursor-pointer">
                  ATELIER
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <Link
                href="/newarrivals"
                className="text-sm font-light tracking-wide hover:text-accent transition-colors"
              >
                New Arrivals
              </Link>
              <Link href="/women" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                Women
              </Link>
              <Link href="/men" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                Men
              </Link>
              <Link href="/about" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                About
              </Link>
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Desktop only actions */}
              <Button variant="ghost" size="icon" onClick={() => setWishlistOpen(true)} className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-mono flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>

              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">My account</span>
                </Button>
              </Link>

              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-6 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link
                  href="/newarrivals"
                  className="text-sm font-light tracking-wide hover:text-accent transition-colors"
                >
                  New Arrivals
                </Link>
                <Link href="/women" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                  Women
                </Link>
                <Link href="/men" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                  Men
                </Link>
                <Link href="/about" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                  About
                </Link>
                <Link href="/login" className="text-sm font-light tracking-wide hover:text-accent transition-colors">
                  My Account
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <WishlistSheet open={wishlistOpen} onOpenChange={setWishlistOpen} />
    </>
  )
}
