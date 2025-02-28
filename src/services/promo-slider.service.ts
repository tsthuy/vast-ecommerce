import axiosInstance from "~/mocks"

export const promoSliderApi = {
  getPromoSlider: async (): Promise<SlideClient[]> => {
    const response = await axiosInstance.get<SlideClient[]>("/api/slides")
    return response.data
  },
}
