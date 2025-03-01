import MockAdapter from "axios-mock-adapter";

import { new_products_schema } from "./data/new_product_schema";

export const wishlistItems: Array<{
  wishlist_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
}> = [];

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

    return [200, { wishlist_item_id: wishlistItemId, variant_id }];
  });

  mock.onDelete(/\/api\/wishlist\/items\/\w+/).reply((config) => {
    const wishlistItemId = config.url?.match(
      /\/api\/wishlist\/items\/(\w+)/
    )?.[1];
    const { user_id } = JSON.parse(config.data || "{}");
    console.log(user_id, wishlistItemId);

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

    return [200, { wishlist_item_id: wishlistItemId }];
  });
};
