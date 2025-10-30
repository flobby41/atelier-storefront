"use client";

import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CartSheet } from "@/components/cart-sheet";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-light tracking-wider text-foreground">
                ATELIER
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <a
                href="#new"
                className="text-sm font-light tracking-wide hover:text-accent transition-colors"
              >
                New Arrivals
              </a>
              <a
                href="#women"
                className="text-sm font-light tracking-wide hover:text-accent transition-colors"
              >
                Women
              </a>
              <a
                href="#men"
                className="text-sm font-light tracking-wide hover:text-accent transition-colors"
              >
                Men
              </a>
              <a
                href="#about"
                className="text-sm font-light tracking-wide hover:text-accent transition-colors"
              >
                About
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-6 border-t border-border">
              <div className="flex flex-col gap-4">
                <a
                  href="#new"
                  className="text-sm font-light tracking-wide hover:text-accent transition-colors"
                >
                  New Arrivals
                </a>
                <a
                  href="#women"
                  className="text-sm font-light tracking-wide hover:text-accent transition-colors"
                >
                  Women
                </a>
                <a
                  href="#men"
                  className="text-sm font-light tracking-wide hover:text-accent transition-colors"
                >
                  Men
                </a>
                <a
                  href="#about"
                  className="text-sm font-light tracking-wide hover:text-accent transition-colors"
                >
                  About
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
