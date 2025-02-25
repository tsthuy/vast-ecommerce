import MockAdapter from "axios-mock-adapter";

import { products, products_explore } from "./data";

export const setupProductsMock = (mock: MockAdapter) => {
  mock.onGet("/api/products").reply((config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const locale = config.headers?.["Accept-Language"] || "en";
        console.log("locale inside mock", locale);
        const localizedProducts = products.map((product) => ({
          ...product,
          name: product.name[locale as keyof typeof product.name],
        }));
        resolve([200, localizedProducts]);
      }, 200);
    });
  });

  mock.onGet("/api/products-explore").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const localizedProducts = products_explore.map((product) => ({
      ...product,
      name: product.name[locale as keyof typeof product.name],
    }));
    return [200, localizedProducts];
  });

  mock.onGet(/\/api\/products\/just-for-u\/.+$/).reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const localizedProducts = products.map((product) => ({
      ...product,
      name: product.name[locale as keyof typeof product.name],
    }));
    return [200, localizedProducts];
  });
};
