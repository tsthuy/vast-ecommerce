import MockAdapter from "axios-mock-adapter";

import { new_products_schema, products_jus_for_u } from "./data/new_product_schema";
import { products } from "./data";

export const setupProductsMock = (mock: MockAdapter) => {
  mock.onGet("/api/products").reply((config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const locale = config.headers?.["Accept-Language"] || "en";
        console.log("locale at mock products", locale);
        const localizedProducts = products.map((product) => ({
          ...product,
          name: product.name[locale as keyof typeof product.name],
        }));
        resolve([200, localizedProducts]);
      }, 200);
    });
  });

  mock.onGet("/api/products-explore").reply(200, new_products_schema);

  mock.onGet(/\/api\/products\/just-for-u\/.+$/).reply(200,products_jus_for_u );

  mock.onGet("/api/products/best-sales").reply(200, new_products_schema);
  mock.onGet("/api/products/flash-sales").reply(200, new_products_schema);

  mock.onGet(/\/api\/products\/[^/]+/).reply((config) => {
    const urlParts = config.url?.split("/");
    const productId = urlParts?.[3]; // Lấy productId từ URL

    // Tìm sản phẩm theo ID
    const product = new_products_schema.find((p) => p.id.toString() === productId);

    if (!product) {
      return [404, { error: "Product not found" }];
    }

    // Tạo mảng images
    const images = [
      // Ảnh gốc của sản phẩm (isDefault: true)
      ...product.images.map((img) => ({
        url: img.url,
        isDefault: true,
      })),
      // Ảnh từ các variant (gắn variantId)
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
