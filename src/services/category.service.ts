// services/category-api.service.ts

import axiosInstance from "~/mocks"

export const categoryApi = {
  getCategories: async (locale: string): Promise<CategoryClient[]> => {
    const response = await axiosInstance.get<CategoryClient[]>(
      "/api/categories",
      {
        params: { locale },
      }
    )
    return response.data
  },
  getCategoriesGrid: async (locale: string): Promise<CategoryGridClient[]> => {
    const response = await axiosInstance.get<CategoryGridClient[]>(
      "/api/categories-grid",
      {
        params: { locale },
      }
    )
    return response.data
  },
}
