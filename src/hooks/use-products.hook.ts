import { QUERY_KEYS } from "~/constants"

import { productApi } from "~/services/product.service"

import { useQuery } from "@tanstack/react-query"

export function useProductsFlashSales(locale: string) {
  return useQuery({
    ...QUERY_KEYS.products.flash(locale),
    queryFn: () => productApi.getProductsFlashSales(),
  })
}

export function useProductsJustForU(userId: string, locale: string) {
  return useQuery({
    ...QUERY_KEYS.products.just_for_u(userId, locale),
    queryFn: () => productApi.getProductsJustForU(userId),
  })
}
