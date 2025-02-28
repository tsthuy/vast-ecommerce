import { createQueryKeys } from "@lukemorales/query-key-factory"

export const WISHLIST_KEY = createQueryKeys("wishlists", {
  all: (userId: string, locale: string, ) => [userId, locale],
})
