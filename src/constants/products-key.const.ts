import { createQueryKeys } from "@lukemorales/query-key-factory"

export const PRODUCT_KEY = createQueryKeys("products", {
  flash: (locale: string) => [locale],
  just_for_u: (userId: string, locale: string) => [userId, locale],
})
