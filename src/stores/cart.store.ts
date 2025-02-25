// stores/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  userId: string; // Add userId to track which user owns the cart item
  product_id: number;
  variant_id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (
    userId: string, // Add userId as a parameter
    product_id: number,
    variant_id: string,
    quantity: number
  ) => void;
  updateQuantity: (
    userId: string, // Add userId as a parameter
    product_id: number,
    variant_id: string,
    quantity: number
  ) => void;
  removeFromCart: (
    userId: string, // Add userId as a parameter
    product_id: number,
    variant_id: string
  ) => void;
  getCartItems: (userId: string) => CartItem[]; // Helper function to get cart items for a specific user
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      // Add to cart
      addToCart: (userId, product_id, variant_id, quantity) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.userId === userId && // Check userId
              item.product_id === product_id &&
              item.variant_id === variant_id
          );

          if (existingItem) {
            // If the variant already exists, increase its quantity
            return {
              items: state.items.map((item) =>
                item.userId === userId && // Check userId
                item.product_id === product_id &&
                item.variant_id === variant_id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // If the variant doesn't exist, add it to the cart
            return {
              items: [
                ...state.items,
                { userId, product_id, variant_id, quantity },
              ],
            };
          }
        }),
      // Update quantity
      updateQuantity: (userId, product_id, variant_id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.userId === userId && // Check userId
            item.product_id === product_id &&
            item.variant_id === variant_id
              ? { ...item, quantity }
              : item
          ),
        })),
      // Remove from cart
      removeFromCart: (userId, product_id, variant_id) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.userId === userId && // Check userId
                item.product_id === product_id &&
                item.variant_id === variant_id
              )
          ),
        })),
      // Get cart items for a specific user
      getCartItems: (userId) => {
        return get().items.filter((item) => item.userId === userId);
      },
    }),
    {
      name: "cart-storage", // Name for localStorage
    }
  )
);
