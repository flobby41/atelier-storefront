"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  quantity: number
  size?: string
  color?: string // Add color to cart item
}

interface CartStore {
  items: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addItem: (product: Omit<CartItem, "quantity">) => void
  removeItem: (id: number, size?: string) => void
  updateQuantity: (id: number, quantity: number, size?: string) => void
  clearCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id && item.size === product.size && item.color === product.color)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === product.size && item.color === product.color ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }

        set({ total: calculateTotal(get().items) })
        set({ isCartOpen: true })
      },
      removeItem: (id, size) => {
        set({ items: get().items.filter((item) => !(item.id === id && item.size === size)) })
        set({ total: calculateTotal(get().items) })
      },
      updateQuantity: (id, quantity, size) => {
        if (quantity < 1) return
        set({
          items: get().items.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)),
        })
        set({ total: calculateTotal(get().items) })
      },
      clearCart: () => {
        set({ items: [], total: 0 })
      },
    }),
    {
      name: "cart-storage",
      partialPersist: (state) => ({
        items: state.items,
        total: state.total,
      }),
    },
  ),
)

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
