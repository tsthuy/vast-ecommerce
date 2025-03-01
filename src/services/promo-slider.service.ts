import axiosInstance from "~/mocks";

export const promoSliderApi = {
  getPromoSlider: async (): Promise<Slide[]> => {
    const response = await axiosInstance.get<Slide[]>("/api/slides");
    return response.data;
  },
};
