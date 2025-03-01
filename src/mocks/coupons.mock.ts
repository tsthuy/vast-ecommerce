import MockAdapter from "axios-mock-adapter";

import { coupons } from "./data/coupons";

export const setupCouponsMock = (mock: MockAdapter) => {
  mock.onGet("/api/coupons").reply(200, { coupons });

  mock.onGet(/\/api\/coupons\/\w+/).reply((config) => {
    const couponId = config.url?.split("/").pop();
    const coupon = coupons.find((c) => c.id === couponId);

    if (!coupon) {
      return [404, { error: "Coupon not found" }];
    }

    return [200, coupon];
  });

  mock.onPost("/api/coupons/apply").reply((config) => {
    const { couponCode, productPrice } = JSON.parse(config.data);
    const coupon = coupons.find((c) => c.code === couponCode);

    if (!coupon) {
      return [404, { error: "Coupon not found" }];
    }

    if (coupon.expiresAt < new Date()) {
      return [400, { error: "Coupon has expired" }];
    }

    if (!coupon.isActive) {
      return [400, { error: "Coupon is not active" }];
    }

    if (productPrice < coupon.minPurchaseAmount) {
      return [
        400,
        {
          error: `Minimum purchase amount of ${coupon.minPurchaseAmount} is required`,
        },
      ];
    }

    if (coupon.currentUses >= (coupon.maxUses ?? Infinity)) {
      return [400, { error: "Coupon has reached its maximum usage limit" }];
    }

    return [200, coupon];
  });

  mock.onPost("/api/coupons/validate").reply((config) => {
    const { couponCode } = JSON.parse(config.data);
    const coupon = coupons.find((c) => c.code === couponCode);

    if (!coupon) {
      return [404, { isValid: false, message: "Coupon not found" }];
    }

    if (coupon.expiresAt < new Date()) {
      return [200, { isValid: false, message: "Coupon has expired" }];
    }

    if (!coupon.isActive) {
      return [200, { isValid: false, message: "Coupon is not active" }];
    }

    return [200, { isValid: true, message: "Coupon is valid" }];
  });
};
