import React, { useState, useContext, ReactNode, createContext } from "react";
import { useLocalStorge } from "./useLocalStorge";
type ShoppingCartProviderProps = {
  children: ReactNode
}
type ShoppingCartContext = {
  getItemQuantity: (id: number) => void
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void,
  openCart: () => void,
  closeCart: () => void,
  isOpen: boolean
  totalCardItems: number,
  cartItems: CartItem[]
}
type CartItem = {
  id: number,
  quantity: number
}
const shopContext = createContext({} as ShoppingCartContext)
export function useShoppingCart() {
  return useContext(shopContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setOpen] = useState(false)
  const [cartItem, setCartItem] = useLocalStorge<CartItem[]>('shoppingKey', [])
  const totalCardItems = cartItem.reduce((acc, item) => acc + item.quantity, 0)
  function openCart() {
    setOpen(true)
  }
  function closeCart() {
    setOpen(false)
  }
  function getItemQuantity(id: number) {
    return cartItem.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id: number) {
    setCartItem(currentItems => {
      if (currentItems.find(currentItem => currentItem.id === id) === undefined) {

        return [...currentItems, { id, quantity: 1 }]
      }
      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    })

  }
  function decreaseCartQuantity(id: number) {
    setCartItem(currentItems => {
      if (currentItems.find(currentItem => currentItem.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id)
      }
      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
    })
  }
  function removeFromCart(id: number) {
    setCartItem(currentItems => {
      return currentItems.filter(currentItem => currentItem.id !== id)
    })
  }
  return (
    <shopContext.Provider value={{
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      totalCardItems,
      openCart,
      closeCart,
      isOpen,
      cartItems: cartItem
    }}>
      {children}
    </shopContext.Provider>
  )
}