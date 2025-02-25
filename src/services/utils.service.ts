export const localizeProduct = (
  product: Product,
  locale: string
): ProductClient => ({
  ...product,
  name: product.name[locale as keyof typeof product.name],
})
