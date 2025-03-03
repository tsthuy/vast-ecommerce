// stores/auth.store.ts
import { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product_id: number;
  variant_id: string;
  quantity: number;
}

interface AuthState {
  user: User | null;
  callbackUrl: string | null;
  pendingCartItem: CartItem | null;
  setUser: (user: User | null) => void;
  setCallbackUrl: (url: string | null) => void;
  setPendingCartItem: (item: CartItem | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      callbackUrl: null,
      pendingCartItem: null,
      setUser: (user) => set({ user }),
      setCallbackUrl: (url) => set({ callbackUrl: url }),
      setPendingCartItem: (item) => set({ pendingCartItem: item }),
      clearUser: () =>
        set({ user: null, callbackUrl: null, pendingCartItem: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
