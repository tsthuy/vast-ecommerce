import MockAdapter from "axios-mock-adapter";

import {
  filterProductByLocale,
  filterProductsByLocale,
} from "./../utils/product.util";
import { new_products_backend } from "./data/new_product_backend";
import { new_products_schema } from "./data/new_product_schema";

export const setupProductsMock = (mock: MockAdapter) => {
  mock.onGet("/api/products-explore").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const products = filterProductsByLocale(new_products_backend, locale);
    return [200, products];
  });

  mock.onGet(/\/api\/products\/just-for-u\/.+$/).reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const products = filterProductsByLocale(new_products_backend, locale);
    return [200, products];
  });

  mock.onGet("/api/products/best-sales").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const products = filterProductsByLocale(new_products_backend, locale);
    return [200, products];
  });

  mock.onGet("/api/products/flash-sales").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const products = filterProductsByLocale(new_products_backend, locale);
    return [200, products];
  });

  mock.onGet(/\/api\/products-details\/[^/]+/).reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const urlParts = config.url?.split("/");
    const productId = urlParts?.[3];
    const product = new_products_backend.find(
      (p) => p.id.toString() === productId
    );
    if (!product) {
      return [404, { error: "Product not found" }];
    }

    const images = [
      ...product.images.map((img) => ({
        url: img.url,
        isDefault: img.isDefault,
      })),

      ...product.variants.map((variant) => ({
        url: variant.image.url,
        variantId: variant.id,
      })),
    ];

    const localizedProduct = filterProductByLocale(product, locale || "en");
    return [
      200,
      {
        localizedProduct,
        images,
      },
    ];
  });

  mock.onGet(/\/api\/category\/products\/\w+$/).reply((config) => {
    const urlParts = config.url?.split("/");
    const categoryId = urlParts?.[4];
    const products = new_products_schema.filter(
      (product) => product.category === categoryId
    );
    return [200, products];
  });

  mock.onGet(/\/api\/related\/\w+\/\w+$/).reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const urlParts = config.url?.split("/");
    const categoryId = urlParts?.[3];
    const productId = urlParts?.[4];

    if (!categoryId || !productId) {
      return [400, { error: "Invalid categoryId or productId" }];
    }

    const relatedProducts = new_products_backend.filter(
      (product) =>
        product.category?.id === categoryId &&
        product.id.toString() !== productId
    );

    const localizedProduct = filterProductsByLocale(
      relatedProducts,
      locale || "vi"
    );

    return [200, localizedProduct];
  });
};
