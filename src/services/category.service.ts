import axiosInstance from "~/mocks";

export const categoryApi = {
  getCategories: async (locale: string): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>("/api/categories", {
      locale,
    });
    return response.data;
  },

  getCategoriesGrid: async (locale: string): Promise<CategoryGrid[]> => {
    const response = await axiosInstance.get<CategoryGrid[]>(
      "/api/categories-grid",
      {
        locale,
      }
    );
    return response.data;
  },
};
