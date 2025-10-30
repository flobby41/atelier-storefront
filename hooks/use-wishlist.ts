"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: WishlistItem) => void
  removeItem: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (!existingItem) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
