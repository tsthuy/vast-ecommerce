import { createQueryKeys } from "@lukemorales/query-key-factory"

export const PROMO_KEY = createQueryKeys("promo", {
  all: (locale: string) => [locale],
})
