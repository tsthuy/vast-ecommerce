import axios from "axios"
import MockAdapter from "axios-mock-adapter"

import {
  categories,
  categories_grid,
  products,
  products_explore,
  promo_slides,
} from "./data"

const axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance, { delayResponse: 10 })

mock.onGet("/api/categories").reply((config) => {
  console.log("Mocked /api/categories endpoint hit")
  const locale = config.params?.locale || "en"
  const localizedCategories = categories.map((category) => ({
    ...category,
    name: category.name[locale as keyof typeof category.name],
  }))
  return [200, localizedCategories]
})

mock.onGet("/api/slides").reply((config) => {
  const locale = config.params?.locale || "en"
  const localizedSlides = promo_slides.map((slide) => ({
    ...slide,
    title: slide.title[locale as keyof typeof slide.title],
    description: slide.description[locale as keyof typeof slide.description],
  }))
  return [200, localizedSlides]
})

mock.onGet("/api/products").reply((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const locale = config.params?.locale || "en"
      const localizedProducts = products.map((product) => ({
        ...product,
        name: product.name[locale as keyof typeof product.name],
      }))
      resolve([200, localizedProducts])
    }, 2000)
  })
})

mock.onGet("/api/products-explore").reply((config) => {
  const locale = config.params?.locale || "en"
  const localizedProducts = products_explore.map((product) => ({
    ...product,
    name: product.name[locale as keyof typeof product.name],
  }))
  return [200, localizedProducts]
})

mock.onGet("/api/categories-grid").reply((config) => {
  const locale = config.params?.locale || "en"
  const localizedCategories = categories_grid.map((cat) => ({
    ...cat,
    name: cat.name[locale as keyof typeof cat.name] || cat.name.en,
  }))
  return [200, localizedCategories]
})
