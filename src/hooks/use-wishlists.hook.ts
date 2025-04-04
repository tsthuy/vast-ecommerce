import { useEffect } from "react";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/constants";

import { wishlistApi } from "~/services";

import { customErrorMessage } from "~/utils/custom-error.util";
import { clearGuestUserId, getGuestUserId } from "~/utils/get-user.util";
import queryClient from "~/utils/query-client.util";

import { useAuthStore } from "~/stores/auth.store";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useWishlists(userId: string, locale: string) {
  return useQuery({
    ...QUERY_KEYS.wishlists.all(userId, locale),
    queryFn: () => wishlistApi.getWishlist(userId),
  });
}

export function useAddWishlist(userId: string, locale: string) {
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
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.wishlists.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
    },
  });
}

export function useRemoveWishlist(userId: string, locale: string) {
  return useMutation({
    mutationFn: (wishlistItemId: string) =>
      wishlistApi.removeFromWishlist(userId, wishlistItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.wishlists.all(userId, locale));
    },
    onError: (error) => {
      console.error("Error removing from wishlist:", error);
    },
  });
}

export function useTransferWishlist(locale: string) {
  const { user } = useAuthStore();

  useEffect(() => {
    const transferWishlist = async () => {
      if (user?.uid) {
        const guestUserId = getGuestUserId();

        if (guestUserId === user.uid) {
          return;
        }

        try {
          await wishlistApi.transferWishlistItems({
            fromUserId: guestUserId,
            toUserId: user.uid,
          });

          clearGuestUserId();

          queryClient.invalidateQueries(
            QUERY_KEYS.wishlists.all(guestUserId, locale)
          );
          queryClient.invalidateQueries(
            QUERY_KEYS.wishlists.all(user.uid, locale)
          );
        } catch (error) {
          toast.error(customErrorMessage(error));
        }
      }
    };

    transferWishlist();
  }, [locale, user?.uid]);
}
