import React, { createContext, useState, useCallback } from "react";
import type { Album } from "~/utils/types";

interface WishlistContextType {
  wishlist: Album[];
  addToWishlist: (item: Album) => void;
  removeFromWishlist: (item: Album) => void;
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
  const [wishlist, setWishlist] = useState<Album[]>([]);

  const addToWishlist = useCallback((item: Album) => {
    setWishlist((prevWishlist) => [...prevWishlist, item]);
  }, []);

  const removeFromWishlist = useCallback((item: Album) => {
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
