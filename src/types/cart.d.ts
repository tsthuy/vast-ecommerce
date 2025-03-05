interface ProductVariantAttributes {
  [key: string]: string;
}

interface CartProduct {
  name: string;
  stock: number;
  price: number;
  images: string[];
  category?: CategoryGrid;
}

interface CartItemResponse {
  cart_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
  quantity: number;
  product: CartProduct;
  variant: ProductVariantAttributes;
}

interface CartResponse {
  cart_items: CartItemResponse[];
  applied_coupon?: Coupon;
  meta: {
    total_items: number;
    total_price: number;
  };
}
