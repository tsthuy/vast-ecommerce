import MockAdapter from "axios-mock-adapter";

import { new_products_schema } from "./data/new_product_schema";

const wishlistItems: Array<{
  wishlist_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
}> = [];

export const setupWishlistsMock = (mock: MockAdapter) => {
  // Create wishlist item
  mock.onPost("/api/wishlist/items").reply((config) => {
    const { user_id, product_id, variant_id } = JSON.parse(config.data);

    // Find if the same product exists in user's wishlist (regardless of variant)
    const existingWishlistItem = wishlistItems.find(
      (item) =>
        item.user_id === user_id &&
        item.product_id === product_id &&
        item.variant_id === variant_id
    );

    // Find product and variant to check existence
    const product = new_products_schema.find((p) => p.id === product_id);
    const variant = product?.variants.find((v) => v.id === variant_id);

    if (!product || !variant) {
      return [404, { error: "Product or variant not found" }];
    }

    if (existingWishlistItem) {
      return [400, { error: "Variant of product already exists in wishlist" }];
    } else {
      const wishlist_item_id = `wishlist_${Date.now()}`;
      wishlistItems.push({
        wishlist_item_id,
        user_id,
        product_id,
        variant_id,
      });

      return [
        200,
        {
          wishlist_item_id,
          user_id,
          product_id,
          variant_id,
        },
      ];
    }
  });

  // Get wishlist items
  mock.onGet("/api/wishlist/items").reply((config) => {
    const { user_id } = config.params;
    const userWishlistItems = wishlistItems.filter(
      (item) => item.user_id === user_id
    );

    const wishlistItemsDetails = userWishlistItems.map((item) => {
      const product = new_products_schema.find((p) => p.id === item.product_id);
      return {
        wishlist_item_id: item.wishlist_item_id,
        user_id: item.user_id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        product,
      };
    });

    return [200, { wishlist_items: wishlistItemsDetails }];
  });

  // Update wishlist item variant
  mock.onPut(/\/api\/wishlist\/items\/\w+/).reply((config) => {
    const wishlistItemId = config.url?.split("/").pop();
    const { variant_id } = JSON.parse(config.data);

    if (!wishlistItemId) {
      return [400, { error: "Invalid wishlist item id" }];
    }

    const wishlistItem = wishlistItems.find(
      (item) => item.wishlist_item_id === wishlistItemId
    );

    if (!wishlistItem) {
      return [404, { error: "Wishlist item not found" }];
    }

    // Verify the variant exists
    const product = new_products_schema.find(
      (p) => p.id === wishlistItem.product_id
    );
    const variant = product?.variants.find((v) => v.id === variant_id);

    if (!variant) {
      return [404, { error: "Variant not found" }];
    }

    wishlistItem.variant_id = variant_id;

    return [200, { wishlist_item_id: wishlistItemId, variant_id }];
  });

  // Delete wishlist item
  mock.onDelete(/\/api\/wishlist\/items\/\w+/).reply((config) => {
    const wishlistItemId = config.url?.split("/").pop();

    if (!wishlistItemId) {
      return [400, { error: "Invalid wishlist item id" }];
    }

    const index = wishlistItems.findIndex(
      (item) => item.wishlist_item_id === wishlistItemId
    );

    if (index === -1) {
      return [404, { error: "Wishlist item not found" }];
    }

    wishlistItems.splice(index, 1);

    return [200, { wishlist_item_id: wishlistItemId }];
  });
};
