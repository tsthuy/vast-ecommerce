interface WishlistItem {
  wishlist_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
  product: NewProduct;
}

interface WishlistResponse {
  wishlist_items: WishlistItem[];
}

interface TransferWishlistItemsParams {
  fromUserId: string;
  toUserId: string;
}
