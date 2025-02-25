interface ProductVariantAttributes {
  [key: string]: string;
}

interface CartProduct {
  name: string;
  stock: number;
  price: number;
  images: string[];
}

interface CartItemResponse {
  cart_item_id: string;
  product_id: number;
  variant_id: string;
  quantity: number;
  product: CartProduct;
  variant: ProductVariantAttributes;
}

interface CartResponse {
  cart_items: CartItemResponse[];
  meta: {
    total_items: number;
    total_price: number;
  };
}
