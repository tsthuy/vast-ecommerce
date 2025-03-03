// utils/productUtils.ts

export const filterProductByLocale = (
  product: NewProductBackend,
  locale: string
): NewProduct => {
  return {
    ...product,
    name: product.name[locale] || product.name.en, // Fallback to English
    description: product.description[locale] || product.description.en, // Fallback to English
  };
};

// Overloaded version for arrays
export const filterProductsByLocale = (
  products: NewProductBackend[],
  locale: string
): NewProduct[] => {
  return products.map((product) => filterProductByLocale(product, locale));
};
