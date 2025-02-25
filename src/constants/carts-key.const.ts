import { createQueryKeys } from "@lukemorales/query-key-factory"

export const CARTS_KEY = createQueryKeys("carts", {
  all: (locale: string) => [locale],
})
