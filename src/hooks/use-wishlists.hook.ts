import { QUERY_KEYS } from "~/constants"

import { wishlistApi } from "~/services"

import { useQuery } from "@tanstack/react-query"

export function useWishlist(locale: string) {
  return useQuery({
    ...QUERY_KEYS.wishlists.all(locale),
    queryFn: () => wishlistApi.getWishlist(locale),
  })
}
