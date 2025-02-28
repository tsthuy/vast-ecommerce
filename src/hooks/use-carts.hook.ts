import { toast } from "sonner";

import { QUERY_KEYS } from "~/constants";

import { cartApi } from "~/services";

import queryClient from "~/utils/query-client.util";

import { useCartStore } from "~/stores/cart.store";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useCarts(userId: string, locale: string) {
  return useQuery({
    queryKey: QUERY_KEYS.carts.all(userId, locale).queryKey,
    queryFn: () => cartApi.getCarts(userId),
    enabled: !!userId
  });
}

export function useAddToCart(user_id: string, locale: string) {
  const { addCartItem } = useCartStore();

  return useMutation({
    mutationFn: ({ product_id, variant_id, quantity }: { product_id: number; variant_id: string; quantity: number }) =>
      cartApi.addToCart({user_id, product_id, variant_id, quantity}),
    onSuccess: (data) => {
      addCartItem(data); 
      queryClient.invalidateQueries(QUERY_KEYS.carts.all(user_id, locale));
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
    },
  });
}

export function useUpdateCartItemQuantity(userId: string, locale: string) {
  const { updateCartItemQuantity } = useCartStore();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      cartApi.updateCartItemQuantity(cartItemId, quantity),
    onSuccess: (data) => {
      updateCartItemQuantity(data.cart_item_id, data.quantity); 
      queryClient.invalidateQueries(QUERY_KEYS.carts.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error updating cart item quantity:", error);
    },
  });
}

export function useRemoveFromCart(userId: string, locale: string) {
  const { removeCartItem } = useCartStore();
  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.removeFromCart(userId, cartItemId),
    onSuccess: (_, cartItemId) => {
      removeCartItem(cartItemId); 
      queryClient.setQueryData(QUERY_KEYS.carts.all(userId, locale).queryKey, (oldData: CartResponse) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          cart_items: oldData.cart_items.filter((item: any) => item.cart_item_id !== cartItemId),
          meta: {
            ...oldData.meta,
            total_items: oldData.meta.total_items - 1,
            total_price: oldData.cart_items
              .filter((item: any) => item.cart_item_id !== cartItemId)
              .reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0),
          },
        };
      });

      queryClient.invalidateQueries(QUERY_KEYS.carts.all(userId, locale)); 
      toast.success("Item removed from cart.");
    },
    onError: (error) => {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart.");
    },
  });
}

export function useMoveWishlistToCart(userId: string, locale: string) {
  const { addCartItem } = useCartStore();
  return useMutation({
    mutationFn: (wishlistItems: { product_id: number; variant_id: string; quantity: number }[]) =>
      cartApi.moveWishlistToCart(userId, wishlistItems),
    onSuccess: () => {
      // Sau khi chuyển thành công, invalidate cả cart và wishlist để cập nhật UI
      queryClient.invalidateQueries(QUERY_KEYS.carts.all(userId, locale));
      queryClient.invalidateQueries(QUERY_KEYS.wishlists.all(userId, locale));
      toast.success("All items moved to cart.");
    },
    onError: (error) => {
      console.error("Error moving wishlist to cart:", error);
      toast.error("Failed to move items to cart.");
    },
  });
}