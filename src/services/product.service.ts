import { NewProduct, ProductDetailsResponse } from "~/types/product";

import axiosInstance from "~/mocks";

export const productApi = {
  //server
  getProductsBestSales: async (locale: string): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>("/api/products/best-sales",{locale});
    return response.data;
  },

  //client
   getProductsFlashSales: async (): Promise<NewProduct[]> => {
    const response = await axiosInstance.get<NewProduct[]>("/api/products/flash-sales");
    return response.data;
  },

  getProductsExplore: async (locale: string): Promise<ProductClient[]> => {
    const response = await axiosInstance.get<ProductClient[]>(
      "/api/products-explore", {
        locale
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

  getProductById: async (productId: string): Promise<ProductDetailsResponse> => {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  },
};
