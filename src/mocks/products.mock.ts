import MockAdapter from "axios-mock-adapter";

import {
  new_products_schema,
  products_jus_for_u,
} from "./data/new_product_schema";

export const setupProductsMock = (mock: MockAdapter) => {
  mock.onGet("/api/products-explore").reply(200, new_products_schema);

  mock.onGet(/\/api\/products\/just-for-u\/.+$/).reply(200, products_jus_for_u);

  mock.onGet("/api/products/best-sales").reply(200, new_products_schema);
  mock.onGet("/api/products/flash-sales").reply(200, new_products_schema);

  mock.onGet(/\/api\/products\/[^/]+/).reply((config) => {
    const urlParts = config.url?.split("/");
    const productId = urlParts?.[3];

    const product = new_products_schema.find(
      (p) => p.id.toString() === productId
    );

    if (!product) {
      return [404, { error: "Product not found" }];
    }

    const images = [
      ...product.images.map((img) => ({
        url: img.url,
        isDefault: true,
      })),

      ...product.variants.map((variant) => ({
        url: variant.image.url,
        variantId: variant.id,
      })),
    ];

    return [
      200,
      {
        product,
        images,
      },
    ];
  });
};
