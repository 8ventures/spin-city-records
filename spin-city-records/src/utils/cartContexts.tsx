import { useState, useContext, createContext, useCallback } from 'react'
import type Price from 'stripe'
import type { PropsWithChildren } from 'react'



const CartContext = createContext<Price[]>([])
export const useCart = () => useContext(CartContext)

const CartProvider = ({ children }: PropsWithChildren) => {

  const [items, setItems] = useState<Price[]>([])

  const addItem = useCallback((price: Price) => setItems(prices => prices.concat([price])), [])
  const removeItem = useCallback(
    (id: string) => setItems(prices => prices.filter(price => price.id!== id)),
    []
  )
  const resetCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, resetCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider