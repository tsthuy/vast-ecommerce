import axiosInstance from "~/mocks";

export const cartApi = {
  getCarts: async (user_id: string): Promise<CartResponse> => {
    const response = await axiosInstance.get<CartResponse>("/api/cart/items", {
      params: { user_id },
    });
    return response.data;
  },

  addToCart: async ({
    user_id,
    product_id,
    variant_id,
    quantity,
  }: {
    user_id: string;
    product_id: number;
    variant_id: string;
    quantity: number;
  }): Promise<CartItemResponse> => {
    const response = await axiosInstance.post("/api/cart/items", {
      user_id,
      product_id,
      variant_id,
      quantity,
    });
    return response.data;
  },

  updateCartItemQuantity: async (
    cart_item_id: string,
    quantity: number
  ): Promise<{ cart_item_id: string; quantity: number }> => {
    const response = await axiosInstance.put(
      `/api/cart/items/${cart_item_id}`,
      {
        quantity,
      }
    );
    return response.data;
  },

  removeFromCart: async (userId: string, cartItemId: string) => {
    await axiosInstance.delete(`/api/cart/${userId}/items/${cartItemId}`);
    return { success: true };
  },

  moveWishlistToCart: async (
    userId: string,
    wishlistItems: {
      product_id: number;
      variant_id: string;
      quantity: number;
    }[]
  ) => {
    const response = await axiosInstance.post(
      `/api/cart/${userId}/move-from-wishlist`,
      {
        items: wishlistItems,
      }
    );
    return response.data;
  },

  // Tạo cart tạm thời cho checkout
  createCheckoutCart: async (
    userId: string,
    cartItems: CartItemResponse[],
    appliedCoupon?: Coupon
  ): Promise<{ temp_cart_id: string; user_id: string }> => {
    const response = await axiosInstance.post("/api/cart/create-checkout", {
      user_id: userId,
      cart_items: cartItems.map((item) => ({
        cart_item_id: item.cart_item_id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
      })),
      applied_coupon: appliedCoupon,
    });
    return response.data;
  },

  getCheckoutCart: async (tempCartId: string): Promise<CartResponse> => {
    const response = await axiosInstance.get(`/api/cart/temp/${tempCartId}`);
    return response.data;
  },
};
