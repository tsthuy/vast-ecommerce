import MockAdapter from "axios-mock-adapter"

import { promo_slides } from "./data/promo-slide"

export const setupSlidesMock = (mock: MockAdapter) => {
  mock.onGet("/api/slides").reply((config) => {
    const locale = config.params?.locale || "en"
    const localizedSlides = promo_slides.map((slide) => ({
      ...slide,
      title: slide.title[locale as keyof typeof slide.title],
      description: slide.description[locale as keyof typeof slide.description],
    }))
    return [200, localizedSlides]
  })
}
