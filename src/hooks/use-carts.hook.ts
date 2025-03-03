import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/constants";

import { cartApi } from "~/services";

import queryClient from "~/utils/query-client.util";

import { useAuthStore } from "~/stores/auth.store";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useCarts(userId: string, locale: string) {
  return useQuery({
    queryKey: QUERY_KEYS.carts.all(userId, locale).queryKey,
    queryFn: () => cartApi.getCarts(userId),
    enabled: !!userId,
  });
}

export function useAddToCart(user_id: string, locale: string) {
  return useMutation({
    mutationFn: ({
      product_id,
      variant_id,
      quantity,
    }: {
      product_id: number;
      variant_id: string;
      quantity: number;
    }) => cartApi.addToCart({ user_id, product_id, variant_id, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.carts.all(user_id, locale));
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
    },
  });
}

export function useUpdateCartItemQuantity(userId: string, locale: string) {
  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }) => cartApi.updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.carts.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error updating cart item quantity:", error);
    },
  });
}

export function useRemoveFromCart(userId: string, locale: string) {
  return useMutation({
    mutationFn: (cartItemId: string) =>
      cartApi.removeFromCart(userId, cartItemId),
    onSuccess: (_, cartItemId) => {
      queryClient.setQueryData(
        QUERY_KEYS.carts.all(userId, locale).queryKey,
        (oldData: CartResponse) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            cart_items: oldData.cart_items.filter(
              (item: any) => item.cart_item_id !== cartItemId
            ),
            meta: {
              ...oldData.meta,
              total_items: oldData.meta.total_items - 1,
              total_price: oldData.cart_items
                .filter((item: any) => item.cart_item_id !== cartItemId)
                .reduce(
                  (sum: number, item: any) =>
                    sum + item.product.price * item.quantity,
                  0
                ),
            },
          };
        }
      );

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
  return useMutation({
    mutationFn: (
      wishlistItems: {
        product_id: number;
        variant_id: string;
        quantity: number;
      }[]
    ) => cartApi.moveWishlistToCart(userId, wishlistItems),
    onSuccess: () => {
      queryClient.refetchQueries(QUERY_KEYS.carts.all(userId, locale));
      queryClient.refetchQueries(QUERY_KEYS.wishlists.all(userId, locale));
      toast.success("All items moved to cart.");
    },
    onError: (error) => {
      console.error("Error moving wishlist to cart:", error);
      toast.error("Failed to move items to cart.");
    },
  });
}

export function useCreateCheckoutCart(userId: string, locale: string) {
  return useMutation({
    mutationFn: (data: {
      cartItems: CartItemResponse[];
      appliedCoupon?: Coupon;
    }) =>
      cartApi.createCheckoutCart(userId, data.cartItems, data.appliedCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.carts.all(userId, locale),
      });
    },
  });
}

export function useCheckoutCart(locale: string, tempCartId: string) {
  return useQuery({
    ...QUERY_KEYS.carts.checkout(locale, tempCartId),
    queryFn: () => cartApi.getCheckoutCart(tempCartId),
    enabled: !!tempCartId,
  });
}

export function useApplyCouponInCheckout(locale: string, tempCartId: string) {
  return useMutation({
    mutationFn: (data: { couponCode: string; totalPrice: number }) =>
      cartApi.applyCouponInCheckout(
        tempCartId,
        data.couponCode,
        data.totalPrice
      ),
    onSuccess: (data) => {
      console.log("Coupon applied successfully:", data);
      toast.success("Coupon applied successfully.");
      queryClient.invalidateQueries(
        QUERY_KEYS.carts.checkout(locale, tempCartId)
      );
    },
    onError: (error) => {
      toast.error(`Failed to apply coupon:  ${error.response.data.error}`);
    },
  });
}

export function useCompleteCheckout(userId: string, tempCartId: string) {
  return useMutation({
    mutationFn: (success: boolean) =>
      cartApi.completeCheckout(tempCartId, success),
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries(QUERY_KEYS.carts.all(userId, "en"));
        toast.success("Checkout completed successfully!");
      } else {
        toast.error("Checkout failed or canceled.");
      }
    },
  });
}

export function usePostLoginActions(locale: string) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { user } = useAuthStore();

  const callbackUrl = useAuthStore((state) => state.callbackUrl);
  const setCallbackUrl = useAuthStore((state) => state.setCallbackUrl);
  const pendingCartItem = useAuthStore((state) => state.pendingCartItem);
  const setPendingCartItem = useAuthStore((state) => state.setPendingCartItem);

  const addToCartMutation = useAddToCart(user?.uid || "", locale);

  useEffect(() => {
    const handlePostLogin = async () => {
      if (user?.uid) {
        if (pendingCartItem) {
          try {
            await addToCartMutation.mutateAsync({
              product_id: pendingCartItem.product_id,
              variant_id: pendingCartItem.variant_id,
              quantity: pendingCartItem.quantity,
            });

            toast.success(t("added_to_cart"));
          } catch (error) {
            console.error("Failed to add pending cart item: 123", error);
            toast.error(t("failed_to_add_to_cart"));
          } finally {
            setPendingCartItem(null);
          }
        }

        if (callbackUrl) {
          router.push(callbackUrl);
          setCallbackUrl(null);
        }
      }
    };

    handlePostLogin();
  }, [user?.uid]);
}
