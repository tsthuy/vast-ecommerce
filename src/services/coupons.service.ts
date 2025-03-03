import axiosInstance from "~/mocks";

export const couponApi = {
  applyCoupon: async (
    couponCode: string,
    productPrice: number
  ): Promise<Coupon> => {
    const response = await axiosInstance.post<Coupon>("/api/coupons/apply", {
      couponCode,
      productPrice,
    });
    return response.data;
  },
};
