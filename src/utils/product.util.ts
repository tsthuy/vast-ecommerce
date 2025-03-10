export const filterProductByLocale = (
  product: NewProductBackend,
  locale: string
): NewProduct => {
  // Dịch attributes
  const localizedAttributes = product.attributes.map((attribute) => ({
    ...attribute,
    name: attribute.name[locale] || attribute.name.en,
    values: attribute.values.map((value) => ({
      ...value,
      label: value.label[locale] || value.label.en,
    })),
  }));

  // Tạo map để tra cứu nhanh attribute và value
  const attributeMap = new Map<string, ProductAttribute>();
  localizedAttributes.forEach((attr) => {
    attributeMap.set(attr.id, attr);
  });

  const valueMap = new Map<string, AttributeValue>();
  localizedAttributes.forEach((attr) => {
    attr.values.forEach((value) => {
      valueMap.set(value.id, value);
    });
  });

  // Dịch variants
  const localizedVariants = product.variants.map((variant) => ({
    ...variant,
    attributes: variant.attributes.map((attr) => {
      const attribute = attributeMap.get(attr.attributeId);
      const value = valueMap.get(attr.valueId);
      return {
        ...attr,
        attributeName: attribute ? attribute.name : "",
        valueLabel: value ? value.label : "",
      };
    }),
  }));

  return {
    ...product,
    name: product.name[locale] || product.name.en,
    description: product.description[locale] || product.description.en,
    attributes: localizedAttributes,
    variants: localizedVariants,
  };
};

export const filterProductsByLocale = (
  products: NewProductBackend[],
  locale: string
): NewProduct[] => {
  return products.map((product) => filterProductByLocale(product, locale));
};
