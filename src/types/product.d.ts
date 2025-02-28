import { z } from "zod";

// Image type definition
interface ProductImage {
  url: string;
  isDefault?: boolean;
  variantId?: string;
}

// Value type for attributes
interface AttributeValue {
  id: string;
  label: string;
  value: string;
}

// Attribute type definition
interface ProductAttribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

// Variant attribute mapping
interface VariantAttribute {
  attributeId: string;
  valueId: string;
}

// Product variant type
interface ProductVariant {
  id: string;
  attributes: VariantAttribute[];
  price: number;
  stock: number;
  image: ProductImage;
}

// Main product interface
interface NewProduct {
  id: number;
  name: string;
  description: string;
  isNew?: boolean;
  price: number;
  ratings: number;
  reviews: number;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
}

interface ProductDetailsResponse {
  product: NewProduct;
  images: ProductImage[];
}

export const productImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  isDefault: z.boolean().optional(),
});

export const attributeValueSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
});

export const productAttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(attributeValueSchema),
});

export const variantAttributeSchema = z.object({
  attributeId: z.string(),
  valueId: z.string(),
});

export const productVariantSchema = z.object({
  id: z.string(),
  attributes: z.array(variantAttributeSchema),
  price: z.number().positive(),
  stock: z.number().min(0),
  image: productImageSchema,
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  images: z.array(productImageSchema),
  attributes: z.array(productAttributeSchema),
  variants: z.array(productVariantSchema),
});

export type {
  NewProduct,
  ProductImage,
  ProductAttribute,
  AttributeValue,
  VariantAttribute,
  ProductVariant,
  ProductDetailsResponse,
};
