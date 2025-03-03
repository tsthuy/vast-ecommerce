import MockAdapter from "axios-mock-adapter";

import { coupons } from "./data/coupons";

export const setupCouponsMock = (mock: MockAdapter) => {
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
};
