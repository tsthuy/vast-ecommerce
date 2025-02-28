import  axiosInstance from '~/mocks';

export const categoryApi = {
  getCategories: async (locale: string): Promise<CategoryClient[]> => {
    const response = await axiosInstance.get<CategoryClient[]>('/api/categories', {
      locale
    });
    return response.data;
  },
  
  getCategoriesGrid: async (locale: string): Promise<CategoryGridClient[]> => {
    const response = await axiosInstance.get<CategoryGridClient[]>('/api/categories-grid', {
      locale 
    });
    return response.data;
  },
};