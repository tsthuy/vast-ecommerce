import axiosInstance from "~/mocks";

export const productApi = {
  //server
  getProductsBestSales: async (locale: string): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      "/api/products/best-sales",
      { locale }
    );
    return response.data;
  },

  //client
  getProductsFlashSales: async (): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      "/api/products/flash-sales"
    );
    return response.data;
  },

  getProductsExplore: async (locale: string): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      "/api/products-explore",
      {
        locale,
      }
    );
    return response.data;
  },

  getProductsJustForU: async (userId: string): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      `/api/products/just-for-u/${userId}`
    );
    return response.data;
  },

  getProductById: async (
    locale: string,
    productId: string
  ): Promise<ProductDetailsResponse> => {
    const response = await axiosInstance.get(
      `/api/products-details/${productId}`,
      {
        locale,
      }
    );
    return response.data;
  },

  getProductsByCategory: async (categoryId: string): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      `/api/category/products/${categoryId}`
    );
    return response.data;
  },

  getRelatedProducts: async (
    categoryId: string,
    productId: number
  ): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>(
      `/api/related/${categoryId}/${productId}`
    );
    return response.data;
  },
};
