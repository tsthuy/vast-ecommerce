import MockAdapter from "axios-mock-adapter";

import { new_products_schema } from "./data/new_product_schema";
import { wishlistItems } from "./wishlists.mock";

const cartItems: Array<{
  cart_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
  quantity: number;
}> = [];

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

      return [201, { cart_item_id, user_id, product_id, variant_id, quantity }];
    }
  });

  mock.onGet("/api/cart/items").reply((config) => {
    const user_id = config.params?.user_id;
    const userCartItems = cartItems.filter((item) => item.user_id === user_id);
    const cartItemsWithDetails = userCartItems
      .map((item) => {
        const product = new_products_schema.find(
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
            name: product.name,
            description: product.description,
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

    return [200, { success: true }];
  });

  mock.onPost(/\/api\/cart\/[^/]+\/move-from-wishlist/).reply((config) => {
    wishlistItems.length = 0;

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

    return [200, { success: true }];
  });
};
