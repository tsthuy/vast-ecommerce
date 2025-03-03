export const filterProductByLocale = (
  product: NewProductBackend,
  locale: string
): NewProduct => {
  return {
    ...product,
    name: product.name[locale] || product.name.en,
    description: product.description[locale] || product.description.en,
  };
};

export const filterProductsByLocale = (
  products: NewProductBackend[],
  locale: string
): NewProduct[] => {
  return products.map((product) => filterProductByLocale(product, locale));
};
