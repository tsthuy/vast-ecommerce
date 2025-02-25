import { CARTS_KEY } from "./carts-key.const"
import { CATEGORIES_KEY } from "./categories-key.const"
import { PRODUCT_KEY } from "./products-key.const"
import { PROMO_KEY } from "./promo-slider.const"
import { WISHLIST_KEY } from "./wishlists-key.const"

import { mergeQueryKeys } from "@lukemorales/query-key-factory"

export const QUERY_KEYS = mergeQueryKeys(
  CATEGORIES_KEY,
  PRODUCT_KEY,
  PROMO_KEY,
  WISHLIST_KEY,
  CARTS_KEY
)
