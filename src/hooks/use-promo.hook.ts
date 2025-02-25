import { QUERY_KEYS } from "~/constants"

import { promoSliderApi } from "~/services/promo-slider.service"

import { useQuery } from "@tanstack/react-query"

export function usePromo(locale: string) {
  return useQuery({
    ...QUERY_KEYS.promo.all(locale),
    queryFn: () => promoSliderApi.getPromoSlider(locale),
  })
}
