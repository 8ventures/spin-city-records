import React, { createContext, useState, useCallback } from "react";
import type { Listing } from "~/utils/types";

interface CartContextType {
  cart: Listing[];
  addToCart: (item: Listing) => void;
  removeFromCart: (item: Listing) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Listing[]>([]);

  const addToCart = useCallback((item: Listing) => {
    setCart((prevCart) => [...prevCart, item]);
  }, []);

  const removeFromCart = useCallback((item: Listing) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  }, []);

  const cartContextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
