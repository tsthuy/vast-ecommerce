interface ProductImage {
  url: string;
  isDefault?: boolean;
  variantId?: string;
}

interface AttributeValue {
  id: string;
  label: string;
  value: string;
}

interface ProductAttribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

interface VariantAttribute {
  attributeId: string;
  valueId: string;
}

interface ProductVariant {
  id: string;
  attributes: VariantAttribute[];
  price: number;
  stock: number;
  image: ProductImage;
}

interface NewProduct {
  id: number;
  name: string;
  description: string;
  category?: CategoryGrid;
  isNew?: boolean;
  price: number;
  ratings: number;
  reviews: number;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
}

interface LocalizedText {
  en: string;
  vi: string;
  [key: string]: string;
}
interface NewProductBackend extends NewProduct {
  name: LocalizedText;
  description: LocalizedText;
}

interface ProductDetailsResponse {
  localizedProduct: NewProduct;
  images: ProductImage[];
}
