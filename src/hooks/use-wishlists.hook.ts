import { QUERY_KEYS } from "~/constants";

import { wishlistApi } from "~/services";

import queryClient from "~/utils/query-client.util";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useWishlists(userId: string, locale: string) {
  return useQuery({
    ...QUERY_KEYS.wishlists.all(userId, locale),
    queryFn: () => wishlistApi.getWishlist(userId),
  });
}

export function useAddWishlist(userId: string, locale: string) {
  // const { addWishlistItem } = useWishlistStore();

  return useMutation({
    mutationFn: ({
      productId,
      variantId,
    }: {
      productId: number;
      variantId: string;
    }) =>
      wishlistApi.addToWishlist({
        user_id: userId,
        product_id: productId,
        variant_id: variantId,
      }),
    onSuccess: (data) => {
      // addWishlistItem(data);
      queryClient.invalidateQueries(QUERY_KEYS.wishlists.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
    },
  });
}

export function useRemoveWishlist(userId: string, locale: string) {
  // const { removeWishlistItem } = useWishlistStore();

  return useMutation({
    mutationFn: (wishlistItemId: string) =>
      wishlistApi.removeFromWishlist(userId, wishlistItemId),
    onSuccess: (data) => {
      // removeWishlistItem(data.wishlist_item_id);
      queryClient.invalidateQueries(QUERY_KEYS.wishlists.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error removing from wishlist:", error);
    },
  });
}
