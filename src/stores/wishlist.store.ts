// import { create } from "zustand";
// interface WishlistState {
//   wishlistItems: WishlistItem[];
//   setWishlistItems: (items: WishlistItem[]) => void;
//   addWishlistItem: (item: WishlistItem) => void;
//   removeWishlistItem: (wishlistItemId: string) => void;
//   clearWishlistItems: () => void;
// }

// export const useWishlistStore = create<WishlistState>((set) => ({
//   wishlistItems: [],
//   setWishlistItems: (items) => set({ wishlistItems: items }),
//   addWishlistItem: (item) =>
//     set((state) => ({
//       wishlistItems: [...state.wishlistItems, item],
//     })),
//   removeWishlistItem: (wishlistItemId) =>
//     set((state) => ({
//       wishlistItems: state.wishlistItems.filter(
//         (item) => item.wishlist_item_id !== wishlistItemId
//       ),
//     })),

//   clearWishlistItems: () => set({ wishlistItems: [] }),
// }));
