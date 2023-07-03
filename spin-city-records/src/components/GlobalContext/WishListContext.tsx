import React, { createContext, useState, useCallback } from "react";
import { Listing } from "~/utils/types";

interface WishlistContextType {
  wishlist: Listing[];
  addToWishlist: (item: Listing) => void;
  removeFromWishlist: (item: Listing) => void;
}

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Listing[]>([]);

  const addToWishlist = useCallback((item: Listing) => {
    setWishlist((prevWishlist) => [...prevWishlist, item]);
  }, []);

  const removeFromWishlist = useCallback((item: Listing) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
    );
  }, []);

  const wishlistContextValue: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={wishlistContextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
