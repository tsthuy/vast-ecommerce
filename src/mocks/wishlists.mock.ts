import MockAdapter from "axios-mock-adapter";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "~/utils/localstorage.util";
import { filterProductByLocale } from "~/utils/product.util";

import { new_products_backend } from "./data/new_product_backend";
import { new_products_schema } from "./data/new_product_schema";

export const wishlistItems: Array<{
  wishlist_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
}> = loadFromLocalStorage<typeof wishlistItems>("wishlistItems", []);

export const setupWishlistsMock = (mock: MockAdapter) => {
  mock.onPost("/api/wishlist/items").reply((config) => {
    const { user_id, product_id, variant_id } = JSON.parse(config.data);

    const existingWishlistItem = wishlistItems.find(
      (item) =>
        item.user_id === user_id &&
        item.product_id === product_id &&
        item.variant_id === variant_id
    );

    const product = new_products_schema.find((p) => p.id === product_id);
    const variant = product?.variants.find(
      (v: ProductVariant) => v.id === variant_id
    );

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

      // Save the updated wishlistItems to localStorage
      saveToLocalStorage("wishlistItems", wishlistItems);

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

  mock.onGet("/api/wishlist/items").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const { user_id } = config.params;
    const userWishlistItems = wishlistItems.filter(
      (item) => item.user_id === user_id
    );

    const wishlistItemsDetails = userWishlistItems.map((item) => {
      const rawProduct = new_products_backend.find(
        (p) => p.id === item.product_id
      );

      const product = filterProductByLocale(rawProduct!, locale);
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

    const product = new_products_schema.find(
      (p) => p.id === wishlistItem.product_id
    );
    const variant = product?.variants.find(
      (v: ProductVariant) => v.id === variant_id
    );

    if (!variant) {
      return [404, { error: "Variant not found" }];
    }

    wishlistItem.variant_id = variant_id;

    // Save the updated wishlistItems to localStorage
    saveToLocalStorage("wishlistItems", wishlistItems);

    return [200, { wishlist_item_id: wishlistItemId, variant_id }];
  });

  mock.onDelete(/\/api\/wishlist\/items\/\w+/).reply((config) => {
    const wishlistItemId = config.url?.match(
      /\/api\/wishlist\/items\/(\w+)/
    )?.[1];
    const { user_id } = JSON.parse(config.data || "{}");

    if (!wishlistItemId || !user_id) {
      return [400, { error: "User or wishlist Id is missing!" }];
    }

    const index = wishlistItems.findIndex(
      (item) =>
        item.wishlist_item_id === wishlistItemId && item.user_id === user_id
    );

    if (index === -1) {
      return [404, { error: "Wishlist item not found" }];
    }

    wishlistItems.splice(index, 1);

    // Save the updated wishlistItems to localStorage
    saveToLocalStorage("wishlistItems", wishlistItems);

    return [200, { wishlist_item_id: wishlistItemId }];
  });

  mock.onPost("/api/wishlist/transfer").reply((config) => {
    const { fromUserId, toUserId } = JSON.parse(config.data);

    if (!fromUserId || !toUserId) {
      return [400, { error: "Missing fromUserId or toUserId" }];
    }

    const guestWishlistItems = wishlistItems.filter(
      (item) => item.user_id === fromUserId
    );

    guestWishlistItems.forEach((item) => {
      const existingItem = wishlistItems.find(
        (existing) =>
          existing.user_id === toUserId &&
          existing.product_id === item.product_id &&
          existing.variant_id === item.variant_id
      );

      if (!existingItem) {
        item.user_id = toUserId;
      } else {
        const index = wishlistItems.indexOf(item);
        wishlistItems.splice(index, 1);
      }
    });

    saveToLocalStorage("wishlistItems", wishlistItems);

    return [200, { success: true }];
  });
};
