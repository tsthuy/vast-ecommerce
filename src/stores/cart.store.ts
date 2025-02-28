import { create } from "zustand";
interface CartState {
  cartItems: CartItemResponse[];
  setCartItems: (items: CartItemResponse[]) => void;
  addCartItem: (item: CartItemResponse) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  removeCartItem: (cartItemId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  addCartItem: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  updateCartItemQuantity: (cartItemId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.cart_item_id === cartItemId ? { ...item, quantity } : item
      ),
    })),
  removeCartItem: (cartItemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.cart_item_id !== cartItemId),
    })),
}));
