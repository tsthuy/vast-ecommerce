export function getProductSlug(productId: number, productName: string) {
  const productSlug = `${productName.toLowerCase().replace(/\s+/g, "-")}-${productId}`;

  return productSlug;
}
