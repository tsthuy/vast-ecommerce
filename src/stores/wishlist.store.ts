// stores/wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: number[];
  addToWishlist: (product_id: number) => void;
  removeFromWishlist: (product_id: number) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addToWishlist: (product_id) =>
        set((state) => {
          if (state.items.includes(product_id)) {
            return state; // Product already in wishlist
          }
          return { items: [...state.items, product_id] };
        }),
      removeFromWishlist: (product_id) =>
        set((state) => ({
          items: state.items.filter((id) => id !== product_id),
        })),
    }),
    {
      name: "wishlist-storage", // Name for localStorage
    }
  )
);
