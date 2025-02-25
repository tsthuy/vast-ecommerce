import axiosInstance from "~/mocks";

export const productApi = {
  getProducts: async (): Promise<ProductClient[]> => {
    const response = await axiosInstance.get<ProductClient[]>("/api/products");
    return response.data;
  },

  getProductsExplore: async (): Promise<ProductClient[]> => {
    const response = await axiosInstance.get<ProductClient[]>(
      "/api/products-explore"
    );
    return response.data;
  },

  getProductsJustForU: async (userId: string): Promise<ProductClient[]> => {
    const response = await axiosInstance.get<ProductClient[]>(
      `/api/products/just-for-u/${userId}`
    );
    return response.data;
  },
};
