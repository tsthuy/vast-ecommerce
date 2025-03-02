import MockAdapter from "axios-mock-adapter";

import { categories, categories_grid } from "./data";

export const setupCategoriesMock = (mock: MockAdapter) => {
  mock.onGet("/api/categories").reply((config) => {
    const locale = config.locale || "en";

    const localizedCategories = categories.map((category) => ({
      ...category,
      name: category.name[locale as keyof typeof category.name],
    }));
    return [200, localizedCategories];
  });

  mock.onGet("/api/categories-grid").reply((config) => {
    const locale = config.locale || "en";
    const localizedCategories = categories_grid.map((cat) => ({
      ...cat,
      name: cat.name[locale as keyof typeof cat.name] || cat.name.en,
    }));
    return [200, localizedCategories];
  });
};
