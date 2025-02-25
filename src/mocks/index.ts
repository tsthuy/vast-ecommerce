import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Import your axios instance(s)
// import axiosInstance from "~/services/axios-instance.service";
// Import mock setup functions
import { setupCartsMock } from "./carts.mock";
import { setupCategoriesMock } from "./categories.mock";
import { setupCouponsMock } from "./coupons.mock";
import { setupProductsMock } from "./products.mock";
import { setupSlidesMock } from "./slides.mock";
import { setupWishlistsMock } from "./wishlists.mock";

const axiosInstance = axios.create();

// Factory function to create and configure a mock adapter for any Axios instance
const createMockAdapter = (
  axiosInstance: any,
  options = { delayResponse: 10 }
) => {
  const mock = new MockAdapter(axiosInstance, options);

  // Apply all mock setups to the provided instance
  setupCategoriesMock(mock);
  setupSlidesMock(mock);
  setupProductsMock(mock);
  setupWishlistsMock(mock);
  setupCartsMock(mock);
  setupCouponsMock(mock);

  return mock; // Optionally return the mock instance for further customization
};

// Default setup for the primary axiosInstance
createMockAdapter(axiosInstance);

// Export the axiosInstance (optional, depending on your use case)
export default axiosInstance;

// Export the createMockAdapter function for flexibility
export { createMockAdapter };
