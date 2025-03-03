import axiosInstance from "~/mocks";

export const wishlistApi = {
  getWishlist: async (user_id: string): Promise<WishlistResponse> => {
    const response = await axiosInstance.get<WishlistResponse>(
      "/api/wishlist/items",
      {
        params: { user_id },
      }
    );
    return response.data;
  },

  addToWishlist: async ({
    user_id,
    product_id,
    variant_id,
  }: {
    user_id: string;
    product_id: number;
    variant_id: string;
  }): Promise<WishlistItem> => {
    const response = await axiosInstance.post("/api/wishlist/items", {
      user_id,
      product_id,
      variant_id,
    });
    return response.data;
  },

  updateWishlistVariant: async (
    wishlist_item_id: string,
    variant_id: string
  ): Promise<{ wishlist_item_id: string; variant_id: string }> => {
    const response = await axiosInstance.put(
      `/api/wishlist/items/${wishlist_item_id}`,
      { variant_id }
    );
    return response.data;
  },

  removeFromWishlist: async (
    user_id: string,
    wishlist_item_id: string
  ): Promise<{ wishlist_item_id: string }> => {
    const response = await axiosInstance.delete(
      `/api/wishlist/items/${wishlist_item_id}`,
      {
        data: { user_id },
      }
    );
    return response.data;
  },
  transferWishlistItems: async ({
    fromUserId,
    toUserId,
  }: TransferWishlistItemsParams): Promise<void> => {
    await axiosInstance.post(`/api/wishlist/transfer`, {
      fromUserId,
      toUserId,
    });
  },
};
