import { QUERY_KEYS } from "~/constants";

import { productApi } from "~/services/product.service";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useProductsFlashSales(locale: string) {
  return useQuery({
    ...QUERY_KEYS.products.flash(locale),
    queryFn: () => productApi.getProductsFlashSales(),
  });
}

export function useProductsJustForU(userId: string, locale: string) {
  return useQuery({
    ...QUERY_KEYS.products.just_for_u(userId, locale),
    queryFn: () => productApi.getProductsJustForU(userId),
  });
}

export function useProductById(locale: string, productId: string) {
  return useSuspenseQuery({
    ...QUERY_KEYS.products.details(locale, productId),
    queryFn: () => productApi.getProductById(productId),
  });
}

export function useRelatedProducts(
  locale: string,
  categoryId: string,
  productId: number
) {
  return useQuery({
    ...QUERY_KEYS.products.related(locale, categoryId, productId),
    queryFn: () => productApi.getRelatedProducts(categoryId, productId),
  });
}
