import { QUERY_KEYS } from "~/constants"

import { cartsApi } from "~/services"

import { useQuery } from "@tanstack/react-query"

export function useCarts(locale: string) {
  return useQuery({
    ...QUERY_KEYS.carts.all(locale),
    queryFn: () => cartsApi.getCart(locale),
  })
}
