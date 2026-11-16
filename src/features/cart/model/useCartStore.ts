import { create } from 'zustand'
import {persist} from 'zustand/middleware'
import type {CartItem, ProductItem} from "../../products/types";

type CartState = {
  cart: CartItem[]

  addItem: (item: ProductItem) => void
  removeItem: (id: number) => void
  updateItemQuantity: (id: number, quantity: number) => void
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
    persist(
    (set, get) => ({
  cart: [],

  addItem: (product: ProductItem)=> {
      set((state) => {
        const exsisting = state.cart.find((item) => product.id === item.id)

        if (exsisting) {
          return {
            cart: state.cart.map((item) => item.id === product.id
              ? {...item, quantity: item.quantity + 1}
              : item
            )
          }
      }

      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        image: product.images[0],
        quantity: 1
      }

        return { cart: [...state.cart, newItem]}
    })
  },

  removeItem: (id: number) => {
    set((state) => ({
       cart: state.cart.filter((item) => item.id !== id)
    })
    )
  },

  updateItemQuantity: (id: number, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((item) => item.id === id
        ? {...item, quantity: quantity}
        : item
      )
    })
    )
  },

  increaseItemQuantity: (id: number) => {
    set((state) => ({
      cart: state.cart.map((item) => item.id === id
        ? {...item, quantity: item.quantity + 1}
        : item
      )
    })
    )
  },

  decreaseItemQuantity: (id: number) => {
    set((state) => {
      const targetItem = state.cart.find((item) => item.id === id)

      if (!targetItem) {
        return state
      }

      if (targetItem.quantity <= 1) {
        return {
          cart: state.cart.filter((item) => item.id !== id)
        }
      }

      return {
        cart: state.cart.map((item) => item.id === id
          ? {...item, quantity: item.quantity - 1}
          : item
        )
      }
    }
    )
  },

  clearCart: () => {
    set({cart: []})
  },

  getTotalPrice: () => {
    const total = get().cart.reduce((acc, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100)
      return acc + discountedPrice * item.quantity
    }, 0)
    return Number(total.toFixed(2))
  }
}),
        {
          name: 'user-cart',
          partialize: (state) => ({cart: state.cart})
        }
    )
)