import axiosInstance from "~/mocks";

export const cartApi = {
  getCart: async (user_id: string): Promise<CartResponse> => {
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
};
