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

// Fonction utilitaire pour calculer le total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Stockage externe pour les timeouts de debouncing (non persisté)
const pendingUpdates = new Map<string, NodeJS.Timeout>()

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
        const { cartId, items } = get()
        
        // OPTIMISTIC UPDATE: Mise à jour immédiate de l'UI
        // Vérifier si le produit existe déjà dans le panier
        const existingItemIndex = items.findIndex(
          (item) => item.variantId === product.variantId && item.size === product.size
        )

        let newItems: CartItem[]
        let tempId: string

        if (existingItemIndex >= 0) {
          // Incrémenter la quantité si l'item existe déjà
          newItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          tempId = items[existingItemIndex].id
        } else {
          // Ajouter un nouvel item avec un ID temporaire
          tempId = `temp-${Date.now()}-${Math.random()}`
          const newItem: CartItem = {
            id: tempId,
            variantId: product.variantId,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
            size: product.size,
          }
          newItems = [...items, newItem]
        }

        const newTotal = calculateTotal(newItems)
        
        // Mise à jour optimiste immédiate
        set({
          items: newItems,
          total: newTotal,
          isCartOpen: true,
        })

        // Synchronisation avec Shopify en arrière-plan
        try {
          if (!cartId) {
            // Créer le panier avec tous les items (y compris les items temporaires ajoutés rapidement)
            const lines = newItems.map((item) => ({
              merchandiseId: item.variantId,
              quantity: item.quantity,
            }))
            
            const createResponse = await shopifyFetchClient<{
              cartCreate: {
                cart: any
                userErrors: Array<{ field: string[]; message: string }>
              }
            }>({
              query: CART_CREATE_MUTATION,
              variables: {
                lines,
              },
            })

            if (createResponse.data?.cartCreate.userErrors?.length) {
              throw new Error(createResponse.data.cartCreate.userErrors[0].message)
            }

            const cart = normalizeCart(createResponse.data!.cartCreate.cart)
            // Mapper les items de Shopify avec les catégories et tailles des items optimistes
            const updatedItems = cart.items.map((shopifyItem: any) => {
              const optimisticItem = newItems.find(
                (optItem) => optItem.variantId === shopifyItem.variantId
              )
              return {
                id: shopifyItem.id,
                variantId: shopifyItem.variantId,
                name: shopifyItem.name,
                price: shopifyItem.price,
                image: shopifyItem.image,
                category: optimisticItem?.category || shopifyItem.name,
                quantity: shopifyItem.quantity,
                size: optimisticItem?.size,
              }
            })
            
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
              items: updatedItems,
              total: cart.total,
            })
          } else {
            // Ajouter ou mettre à jour dans le panier existant
            if (existingItemIndex >= 0) {
              // Mettre à jour la quantité (utiliser la quantité optimiste)
              const updatedItem = newItems[existingItemIndex]
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
                    id: updatedItem.id,
                    quantity: updatedItem.quantity,
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
                  category: product.category,
                  quantity: item.quantity,
                  size: product.size,
                })),
                total: cart.total,
              })
            } else {
              // Ajouter un nouvel item
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
              // Remplacer l'item temporaire par l'item réel de Shopify
              const realItem = cart.items.find(
                (item: any) => item.variantId === product.variantId
              )
              
              if (realItem) {
                set({
                  checkoutUrl: cart.checkoutUrl,
                  items: cart.items.map((item: any) => ({
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
                })
              }
            }
          }
        } catch (error) {
          console.error('Error syncing with Shopify:', error)
          // ROLLBACK: Restaurer l'état précédent en cas d'erreur
          set({
            items,
            total: calculateTotal(items),
          })
          alert(error instanceof Error ? error.message : 'Failed to sync with cart')
        }
      },

      removeItem: async (lineId) => {
        const { cartId, items } = get()
        if (!cartId) return

        // Annuler toute mise à jour en attente pour cet item
        const pendingTimeout = pendingUpdates.get(lineId)
        if (pendingTimeout) {
          clearTimeout(pendingTimeout)
          pendingUpdates.delete(lineId)
        }

        // Sauvegarder l'état pour rollback
        const previousItems = items
        const previousTotal = calculateTotal(items)

        // OPTIMISTIC UPDATE: Retirer immédiatement de l'UI
        const newItems = items.filter((item) => item.id !== lineId)
        const newTotal = calculateTotal(newItems)

        set({
          items: newItems,
          total: newTotal,
        })

        // Synchronisation avec Shopify en arrière-plan
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
          })
        } catch (error) {
          console.error('Error removing item from cart:', error)
          // ROLLBACK: Restaurer l'état précédent
          set({
            items: previousItems,
            total: previousTotal,
          })
          alert(error instanceof Error ? error.message : 'Failed to remove item from cart')
        }
      },

      updateQuantity: async (lineId, quantity) => {
        if (quantity < 1) {
          get().removeItem(lineId)
          return
        }

        const { cartId, items } = get()
        if (!cartId) return

        // Sauvegarder l'état initial pour rollback
        const previousItems = items
        const previousTotal = calculateTotal(items)

        // OPTIMISTIC UPDATE: Mise à jour immédiate de l'UI
        const newItems = items.map((item) =>
          item.id === lineId ? { ...item, quantity } : item
        )
        const newTotal = calculateTotal(newItems)

        set({
          items: newItems,
          total: newTotal,
        })

        // Annuler la mise à jour précédente en attente pour cet item
        const existingTimeout = pendingUpdates.get(lineId)
        if (existingTimeout) {
          clearTimeout(existingTimeout)
        }

        // DEBOUNCING: Attendre 300ms avant de synchroniser avec Shopify
        // Cela évite de faire une requête à chaque clic rapide
        const timeoutId = setTimeout(async () => {
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
            })

            // Nettoyer le timeout de la map
            pendingUpdates.delete(lineId)
          } catch (error) {
            console.error('Error updating cart quantity:', error)
            // ROLLBACK: Restaurer l'état précédent
            set({
              items: previousItems,
              total: previousTotal,
            })
            pendingUpdates.delete(lineId)
            alert(error instanceof Error ? error.message : 'Failed to update cart')
          }
        }, 300) // 300ms de debounce

        // Stocker le timeout pour pouvoir l'annuler si nécessaire
        pendingUpdates.set(lineId, timeoutId)
      },

      clearCart: () => {
        // Nettoyer tous les timeouts en attente
        pendingUpdates.forEach((timeout) => clearTimeout(timeout))
        pendingUpdates.clear()
        set({ cartId: null, checkoutUrl: null, items: [], total: 0 })
      },
    }),
    {
      name: "cart-storage",
      partialize: (state: CartStore) => ({
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        items: state.items,
        total: state.total,
      }),
    },
  ),
)
