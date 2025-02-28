import MockAdapter from "axios-mock-adapter";

import axiosInstance from "~/services/axios-instance.service";

import { setupCartsMock } from "./carts.mock";
import { setupCategoriesMock } from "./categories.mock";
import { setupCouponsMock } from "./coupons.mock";
import { setupProductsMock } from "./products.mock";
import { setupSlidesMock } from "./slides.mock";
import { setupWishlistsMock } from "./wishlists.mock";

const createMockAdapter = (
  axiosInstance: any,
  options = { delayResponse: 10 }
) => {
  const mock = new MockAdapter(axiosInstance, options);

  setupCategoriesMock(mock);
  setupSlidesMock(mock);
  setupProductsMock(mock);
  setupWishlistsMock(mock);
  setupCartsMock(mock);
  setupCouponsMock(mock);

  return mock; 
};

createMockAdapter(axiosInstance);

export default axiosInstance;

export { createMockAdapter };
