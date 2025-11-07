"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { shopifyFetchClient } from "@/lib/shopify"
import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_LINES_UPDATE_MUTATION, CART_LINES_REMOVE_MUTATION } from "@/lib/queries"
import { normalizeCart } from "@/lib/shopify-types"

interface CartItem {
  id: string // Shopify cart line ID
  variantId: string // Shopify product variant ID
  name: string
  price: number
  image: string
  category: string
  quantity: number
  size?: string
}

interface CartStore {
  cartId: string | null
  checkoutUrl: string | null
  items: CartItem[]
  isCartOpen: boolean
  isLoading: boolean
  setIsCartOpen: (open: boolean) => void
  addItem: (product: { variantId: string; name: string; price: number; image: string; category: string; size?: string }) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  clearCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      checkoutUrl: null,
      items: [],
      total: 0,
      isCartOpen: false,
      isLoading: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      
      addItem: async (product) => {
        set({ isLoading: true })
        try {
          const { cartId } = get()
          
          // Create cart if it doesn't exist
          if (!cartId) {
            const createResponse = await shopifyFetchClient<{
              cartCreate: {
                cart: any
                userErrors: Array<{ field: string[]; message: string }>
              }
            }>({
              query: CART_CREATE_MUTATION,
              variables: {
                lines: [{
                  merchandiseId: product.variantId,
                  quantity: 1,
                }],
              },
            })

            if (createResponse.data?.cartCreate.userErrors?.length) {
              throw new Error(createResponse.data.cartCreate.userErrors[0].message)
            }

            const cart = normalizeCart(createResponse.data!.cartCreate.cart)
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
              items: cart.items.map((item) => ({
                id: item.id,
                variantId: item.variantId,
                name: item.name,
                price: item.price,
                image: item.image,
                category: product.category,
                quantity: item.quantity,
                size: product.size,
              })),
              total: cart.total,
              isCartOpen: true,
              isLoading: false,
            })
            return
          }

          // Add item to existing cart
          const addResponse = await shopifyFetchClient<{
            cartLinesAdd: {
              cart: any
              userErrors: Array<{ field: string[]; message: string }>
            }
          }>({
            query: CART_LINES_ADD_MUTATION,
            variables: {
              cartId,
              lines: [{
                merchandiseId: product.variantId,
                quantity: 1,
              }],
            },
          })

          if (addResponse.data?.cartLinesAdd.userErrors?.length) {
            throw new Error(addResponse.data.cartLinesAdd.userErrors[0].message)
          }

          const cart = normalizeCart(addResponse.data!.cartLinesAdd.cart)
          set({
            checkoutUrl: cart.checkoutUrl,
            items: cart.items.map((item) => ({
              id: item.id,
              variantId: item.variantId,
              name: item.name,
              price: item.price,
              image: item.image,
              category: product.category,
              quantity: item.quantity,
              size: product.size,
            })),
            total: cart.total,
            isCartOpen: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error adding item to cart:', error)
          set({ isLoading: false })
          alert(error instanceof Error ? error.message : 'Failed to add item to cart')
        }
      },

      removeItem: async (lineId) => {
        const { cartId } = get()
        if (!cartId) return

        set({ isLoading: true })
        try {
          const removeResponse = await shopifyFetchClient<{
            cartLinesRemove: {
              cart: any
              userErrors: Array<{ field: string[]; message: string }>
            }
          }>({
            query: CART_LINES_REMOVE_MUTATION,
            variables: {
              cartId,
              lineIds: [lineId],
            },
          })

          if (removeResponse.data?.cartLinesRemove.userErrors?.length) {
            throw new Error(removeResponse.data.cartLinesRemove.userErrors[0].message)
          }

          const cart = normalizeCart(removeResponse.data!.cartLinesRemove.cart)
          set({
            checkoutUrl: cart.checkoutUrl,
            items: cart.items.map((item) => ({
              id: item.id,
              variantId: item.variantId,
              name: item.name,
              price: item.price,
              image: item.image,
              category: item.name, // Fallback
              quantity: item.quantity,
            })),
            total: cart.total,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error removing item from cart:', error)
          set({ isLoading: false })
          alert(error instanceof Error ? error.message : 'Failed to remove item from cart')
        }
      },

      updateQuantity: async (lineId, quantity) => {
        if (quantity < 1) {
          get().removeItem(lineId)
          return
        }

        const { cartId } = get()
        if (!cartId) return

        set({ isLoading: true })
        try {
          const updateResponse = await shopifyFetchClient<{
            cartLinesUpdate: {
              cart: any
              userErrors: Array<{ field: string[]; message: string }>
            }
          }>({
            query: CART_LINES_UPDATE_MUTATION,
            variables: {
              cartId,
              lines: [{
                id: lineId,
                quantity,
              }],
            },
          })

          if (updateResponse.data?.cartLinesUpdate.userErrors?.length) {
            throw new Error(updateResponse.data.cartLinesUpdate.userErrors[0].message)
          }

          const cart = normalizeCart(updateResponse.data!.cartLinesUpdate.cart)
          set({
            checkoutUrl: cart.checkoutUrl,
            items: cart.items.map((item) => ({
              id: item.id,
              variantId: item.variantId,
              name: item.name,
              price: item.price,
              image: item.image,
              category: item.name, // Fallback
              quantity: item.quantity,
            })),
            total: cart.total,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error updating cart quantity:', error)
          set({ isLoading: false })
          alert(error instanceof Error ? error.message : 'Failed to update cart')
        }
      },

      clearCart: () => {
        set({ cartId: null, checkoutUrl: null, items: [], total: 0 })
      },
    }),
    {
      name: "cart-storage",
      partialPersist: (state) => ({
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        items: state.items,
        total: state.total,
      }),
    },
  ),
)
