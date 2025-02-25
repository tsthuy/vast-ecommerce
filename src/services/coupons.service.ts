import { Coupon } from "~/types/coupons";

import axiosInstance from "~/mocks";

export const couponApi = {
  getCoupons: async (): Promise<Coupon[]> => {
    const response = await axiosInstance.get<Coupon[]>("/api/coupons");
    return response.data;
  },

  getCoupon: async (couponId: string): Promise<Coupon> => {
    const response = await axiosInstance.get<Coupon>(
      `/api/coupons/${couponId}`
    );
    return response.data;
  },

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

  validateCoupon: async (
    couponCode: string
  ): Promise<{ isValid: boolean; message: string }> => {
    const response = await axiosInstance.post<{
      isValid: boolean;
      message: string;
    }>("/api/coupons/validate", {
      couponCode,
    });
    return response.data;
  },
};
