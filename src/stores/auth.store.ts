import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { auth } from "~/libs/firebase.lib";

interface CartItem {
  product_id: number;
  variant_id: string;
  quantity: number;
}

interface AuthState {
  user: User | null;
  pendingCartItem: CartItem | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setPendingCartItem: (item: CartItem | null) => void;
  clearUser: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      callbackUrl: null,
      pendingCartItem: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setPendingCartItem: (item) => set({ pendingCartItem: item }),
      clearUser: () => set({ user: null, pendingCartItem: null }),
      initializeAuth: () => {
        set({ isLoading: true });
        onAuthStateChanged(auth, (firebaseUser) => {
          set({ user: firebaseUser, isLoading: false });
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
