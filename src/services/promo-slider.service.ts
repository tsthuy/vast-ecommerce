import axiosInstance from "~/mocks"

export const promoSliderApi = {
  getPromoSlider: async (locale: string): Promise<SlideClient[]> => {
    const response = await axiosInstance.get<SlideClient[]>("/api/slides", {
      params: { locale },
    })
    return response.data
  },
}
