"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

        <Button
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => addItem(product)}
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </div>

      <div className="p-4">
        <p className="text-xs tracking-widest text-muted-foreground mb-1 uppercase">
          {product.category}
        </p>
        <h3 className="text-lg font-light tracking-wide mb-2 text-balance">
          {product.name}
        </h3>
        <p className="text-sm font-mono tracking-wider">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
