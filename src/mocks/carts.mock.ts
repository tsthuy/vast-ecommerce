import MockAdapter from "axios-mock-adapter";

import {
  loadFromLocalStorage,
  loadFromLocalStorageWithExpiration,
  saveToLocalStorage,
} from "~/utils/localstorage.util";

import { coupons } from "./data/coupons";
import { new_products_backend } from "./data/new_product_backend";
import { new_products_schema } from "./data/new_product_schema";
import { wishlistItems } from "./wishlists.mock";

const tempCarts: Array<{
  temp_cart_id: string;
  user_id: string;
  cart_items: Array<{
    cart_item_id: string;
    product_id: number;
    variant_id: string;
    quantity: number;
  }>;
  applied_coupon?: { code: string; type: string; value: number };
  created_at: number;
}> = loadFromLocalStorageWithExpiration<typeof tempCarts>("tempCarts", []);

const orders: Array<{
  order_id: string;
  user_id: string;
  cart_items: Array<{
    cart_item_id: string;
    product_id: number;
    variant_id: string;
    quantity: number;
  }>;
  applied_coupon?: { code: string; type: string; value: number };
  total_price: number;
  created_at: number;
}> = loadFromLocalStorage("orders", []);

const cartItems: Array<{
  cart_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
  quantity: number;
}> = loadFromLocalStorage("cartItems", []);

export const setupCartsMock = (mock: MockAdapter) => {
  mock.onPost("/api/cart/items").reply((config) => {
    const { user_id, product_id, variant_id, quantity } = JSON.parse(
      config.data
    );

    const existingCartItem = cartItems.find(
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

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;

      if (newQuantity > variant.stock) {
        return [
          400,
          {
            error: "Not enough stock",
            available: variant.stock,
          },
        ];
      }

      existingCartItem.quantity = newQuantity;

      // Save the updated cartItems to localStorage
      saveToLocalStorage("cartItems", cartItems);

      return [
        200,
        {
          cart_item_id: existingCartItem.cart_item_id,
          user_id,
          product_id,
          variant_id,
          quantity: newQuantity,
        },
      ];
    } else {
      if (quantity > variant.stock) {
        return [
          400,
          {
            error: "Not enough stock",
            available: variant.stock,
          },
        ];
      }

      const cart_item_id = `cart_${Date.now()}`;
      cartItems.push({
        cart_item_id,
        user_id,
        product_id,
        variant_id,
        quantity,
      });

      // Save the updated cartItems to localStorage
      saveToLocalStorage("cartItems", cartItems);

      return [201, { cart_item_id, user_id, product_id, variant_id, quantity }];
    }
  });

  mock.onGet("/api/cart/items").reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";
    const user_id = config.params?.user_id;
    const userCartItems = cartItems.filter((item) => item.user_id === user_id);
    const cartItemsWithDetails = userCartItems
      .map((item) => {
        const product = new_products_backend.find(
          (p) => p.id === item.product_id
        );
        const variant = product?.variants.find(
          (v: ProductVariant) => v.id === item.variant_id
        );

        if (!product || !variant) {
          return null;
        }

        const variantAttributes = variant.attributes.reduce(
          (acc: Record<string, string>, attr: VariantAttribute) => {
            const attribute = product.attributes.find(
              (a: ProductAttribute) => a.id === attr.attributeId
            );
            const value = attribute?.values.find(
              (v: AttributeValue) => v.id === attr.valueId
            );

            if (attribute && value) {
              acc[attribute.name.toLowerCase()] = value.label;
            }
            return acc;
          },
          {} as Record<string, string>
        );

        return {
          cart_item_id: item.cart_item_id,
          user_id: item.user_id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          product: {
            name: product.name[locale] || product.name.en,
            description: product.description[locale] || product.description.en,
            price: variant.price,
            images: [variant.image.url],
            stock: variant.stock,
          },
          variant: variantAttributes,
        };
      })
      .filter(Boolean);

    const total_items = userCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const total_price = userCartItems.reduce((sum, item) => {
      const product = new_products_schema.find((p) => p.id === item.product_id);
      const variant = product?.variants.find(
        (v: ProductVariant) => v.id === item.variant_id
      );
      return sum + (variant?.price || 0) * item.quantity;
    }, 0);

    return [
      200,
      {
        cart_items: cartItemsWithDetails,
        meta: {
          total_items,
          total_price,
        },
      },
    ];
  });

  mock.onPut(/\/api\/cart\/items\/.+/).reply((config) => {
    const cart_item_id = config.url?.split("/").pop();
    const { quantity } = JSON.parse(config.data);

    const cartItem = cartItems.find(
      (item) => item.cart_item_id === cart_item_id
    );

    if (!cartItem) {
      return [404, { error: "Cart item not found" }];
    }

    const product = new_products_schema.find(
      (p) => p.id === cartItem.product_id
    );
    const variant = product?.variants.find(
      (v: ProductVariant) => v.id === cartItem.variant_id
    );

    if (!product || !variant) {
      return [404, { error: "Product or variant not found" }];
    }

    if (quantity > variant.stock) {
      return [
        400,
        {
          error: "Not enough stock",
          available: variant.stock,
        },
      ];
    }

    cartItem.quantity = quantity;

    // Save the updated cartItems to localStorage
    saveToLocalStorage("cartItems", cartItems);

    return [200, { cart_item_id, quantity }];
  });

  mock.onDelete(/\/api\/cart\/[^/]+\/items\/[^/]+/).reply((config) => {
    const urlParts = config.url?.split("/");
    const user_id = urlParts?.[3];
    const cart_item_id = urlParts?.[5];

    const cartItemIndex = cartItems.findIndex(
      (item) => item.user_id === user_id && item.cart_item_id === cart_item_id
    );

    if (cartItemIndex === -1) {
      return [403, { error: "Cart item not found " }];
    }

    cartItems.splice(cartItemIndex, 1);

    // Save the updated cartItems to localStorage
    saveToLocalStorage("cartItems", cartItems);

    return [200, { success: true }];
  });

  mock.onPost(/\/api\/cart\/[^/]+\/move-from-wishlist/).reply((config) => {
    wishlistItems.length = 0;
    saveToLocalStorage("wishlistItems", wishlistItems); // Update wishlistItems in localStorage

    const urlParts = config.url?.split("/");
    const user_id = urlParts?.[3];
    const { items } = JSON.parse(config.data);

    if (!items || !user_id) {
      return [400, { error: "Invalid request" }];
    }

    items.forEach(
      ({
        product_id,
        variant_id,
        quantity,
      }: {
        product_id: number;
        variant_id: string;
        quantity: number;
      }) => {
        const existingCartItem = cartItems.find(
          (item) =>
            item.user_id === user_id &&
            item.product_id === product_id &&
            item.variant_id === variant_id
        );
        const product = new_products_schema.find((p) => p.id === product_id);
        const variant = product?.variants.find(
          (v: ProductVariant) => v.id === variant_id
        );

        if (!product || !variant) return;

        if (existingCartItem) {
          const newQuantity = existingCartItem.quantity + quantity;

          if (newQuantity <= variant.stock) {
            existingCartItem.quantity = newQuantity;
          }
        } else {
          if (quantity <= variant.stock) {
            const cart_item_id = `cart_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
            cartItems.push({
              cart_item_id,
              user_id,
              product_id,
              variant_id,
              quantity,
            });
          }
        }
      }
    );

    // Save the updated cartItems to localStorage
    saveToLocalStorage("cartItems", cartItems);

    return [200, { success: true }];
  });

  mock.onPost("/api/cart/create-checkout").reply((config) => {
    const { user_id, cart_items, applied_coupon } = JSON.parse(config.data);

    if (!user_id || !cart_items) {
      return [400, { error: "User ID or cart items are missing" }];
    }

    const tempCartId = `temp_cart_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const tempCart = {
      temp_cart_id: tempCartId,
      user_id,
      cart_items,
      applied_coupon,
      created_at: Date.now(),
    };

    const existingTempCartIndex = tempCarts.findIndex(
      (c) => c.user_id === user_id
    );

    if (existingTempCartIndex !== -1) {
      tempCarts.splice(existingTempCartIndex, 1);
    }

    tempCarts.push(tempCart);
    console.log("tempCarts", tempCarts);

    return [
      200,
      {
        temp_cart_id: tempCartId,
        user_id,
      },
    ];
  });

  mock.onGet(/\/api\/cart\/temp\/\w+/).reply((config) => {
    const locale = config.headers?.["Accept-Language"] || "en";

    const tempCartId = config.url?.match(/\/api\/cart\/temp\/(\w+)/)?.[1];
    if (!tempCartId) {
      return [400, { error: "Temp cart ID is missing" }];
    }

    const tempCart = tempCarts.find((c) => c.temp_cart_id === tempCartId);
    if (!tempCart) {
      return [404, { error: "Temporary cart not found" }];
    }

    const cartItemsWithDetails = tempCart.cart_items
      .map((item) => {
        const product = new_products_backend.find(
          (p) => p.id === item.product_id
        );
        const variant = product?.variants.find(
          (v: ProductVariant) => v.id === item.variant_id
        );

        if (!product || !variant) {
          return null;
        }

        const variantAttributes = variant.attributes.reduce(
          (acc: Record<string, string>, attr: VariantAttribute) => {
            const attribute = product.attributes.find(
              (a: ProductAttribute) => a.id === attr.attributeId
            );
            const value = attribute?.values.find(
              (v: AttributeValue) => v.id === attr.valueId
            );

            if (attribute && value) {
              acc[attribute.name.toLowerCase()] = value.label;
            }
            return acc;
          },
          {} as Record<string, string>
        );

        return {
          cart_item_id: item.cart_item_id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          product: {
            name: product.name[locale] || product.name.en,
            description: product.description[locale] || product.description.en,
            price: variant.price,
            images: [variant.image.url],
            stock: variant.stock,
          },
          variant: variantAttributes,
        };
      })
      .filter(Boolean);

    const total_items = tempCart.cart_items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    let total_price = tempCart.cart_items.reduce((sum, item) => {
      const product = new_products_schema.find((p) => p.id === item.product_id);
      const variant = product?.variants.find(
        (v: ProductVariant) => v.id === item.variant_id
      );
      return sum + (variant?.price || 0) * item.quantity;
    }, 0);

    if (tempCart.applied_coupon) {
      if (tempCart.applied_coupon.type === "fixed") {
        total_price -= tempCart.applied_coupon.value;
      } else if (tempCart.applied_coupon.type === "percentage") {
        total_price -= (total_price * tempCart.applied_coupon.value) / 100;
      }
    }

    return [
      200,
      {
        cart_items: cartItemsWithDetails,
        applied_coupon: tempCart.applied_coupon,
        meta: {
          total_items,
          total_price,
        },
      },
    ];
  });

  mock.onPost(/\/api\/cart\/apply-coupon\/temp\/\w+/).reply((config) => {
    const tempCartId = config.url?.match(
      /\/api\/cart\/apply-coupon\/temp\/(\w+)/
    )?.[1];

    const { coupon_code, total_price } = JSON.parse(config.data);

    if (!tempCartId || !coupon_code || total_price === undefined) {
      return [
        400,
        { error: "Missing temp_cart_id, coupon_code, or total_price" },
      ];
    }

    const tempCart = tempCarts.find((c) => c.temp_cart_id === tempCartId);

    if (!tempCart) {
      return [404, { error: "Temporary cart not found" }];
    }

    const coupon = coupons.find((c) => c.code === coupon_code);

    if (!coupon) {
      return [404, { error: "Coupon not found" }];
    }

    if (coupon.expiresAt < new Date()) {
      return [400, { error: "Coupon has expired" }];
    }

    if (!coupon.isActive) {
      return [400, { error: "Coupon is not active" }];
    }

    if (total_price < coupon.minPurchaseAmount) {
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

    tempCart!.applied_coupon = {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
    };

    // Save the updated tempCarts to localStorage
    saveToLocalStorage("tempCarts", tempCarts);

    return [
      200,
      {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      },
    ];
  });

  mock.onPost(/\/api\/cart\/complete-checkout\/\w+/).reply((config) => {
    const tempCartId = config.url?.match(
      /\/api\/cart\/complete-checkout\/(\w+)/
    )?.[1];
    const { success } = JSON.parse(config.data);

    if (!tempCartId) {
      return [400, { error: "Temp cart ID is missing" }];
    }

    const tempCartIndex = tempCarts.findIndex(
      (c) => c.temp_cart_id === tempCartId
    );
    if (tempCartIndex === -1) {
      return [404, { error: "Temporary cart not found" }];
    }

    const tempCart = tempCarts[tempCartIndex];
    const userId = tempCart.user_id;

    if (success) {
      const order = {
        order_id: `order_${Date.now()}`,
        user_id: userId,
        cart_items: tempCart.cart_items,
        applied_coupon: tempCart.applied_coupon,
        total_price: tempCart.cart_items.reduce((sum, item) => {
          const product = new_products_schema.find(
            (p) => p.id === item.product_id
          );
          const variant = product?.variants.find(
            (v: ProductVariant) => v.id === item.variant_id
          );
          return sum + (variant?.price || 0) * item.quantity;
        }, 0),
        created_at: Date.now(),
      };

      if (order.applied_coupon) {
        if (order.applied_coupon.type === "fixed") {
          order.total_price -= order.applied_coupon.value;
        } else if (order.applied_coupon.type === "percentage") {
          order.total_price -=
            (order.total_price * order.applied_coupon.value) / 100;
        }
      }

      orders.push(order);

      // Xóa cart chính
      for (let i = cartItems.length - 1; i >= 0; i--) {
        if (cartItems[i].user_id === userId) {
          cartItems.splice(i, 1);
        }
      }

      // Save the updated cartItems to localStorage
      saveToLocalStorage("cartItems", cartItems);
    }

    tempCarts.splice(tempCartIndex, 1);

    // Save the updated tempCarts to localStorage
    saveToLocalStorage("tempCarts", tempCarts);

    return [
      success ? 200 : 400,
      {
        message: success
          ? "Checkout completed successfully"
          : "Checkout failed or canceled",
        order_id: success ? orders[orders.length - 1].order_id : undefined,
      },
    ];
  });
};
