import MockAdapter from "axios-mock-adapter";

import { new_products_schema } from "./data/new_product_schema";

const cartItems: Array<{
  cart_item_id: string;
  user_id: string;
  product_id: number;
  variant_id: string;
  quantity: number;
}> = [];

export const setupCartsMock = (mock: MockAdapter) => {
  // Create cart item
  mock.onPost("/api/cart/items").reply((config) => {
    const { user_id, product_id, variant_id, quantity } = JSON.parse(
      config.data
    );

    // Find if the same product variant exists in user's cart
    const existingCartItem = cartItems.find(
      (item) =>
        item.user_id === user_id &&
        item.product_id === product_id &&
        item.variant_id === variant_id
    );

    // Find product and variant to check stock
    const product = new_products_schema.find((p) => p.id === product_id);
    const variant = product?.variants.find((v) => v.id === variant_id);

    if (!product || !variant) {
      return [404, { error: "Product or variant not found" }];
    }

    if (existingCartItem) {
      // Calculate new quantity
      const newQuantity = existingCartItem.quantity + quantity;

      // Check if new quantity exceeds stock
      if (newQuantity > variant.stock) {
        return [
          400,
          {
            error: "Not enough stock",
            available: variant.stock,
          },
        ];
      }

      // Update existing item quantity
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
      // Check if initial quantity exceeds stock
      if (quantity > variant.stock) {
        return [
          400,
          {
            error: "Not enough stock",
            available: variant.stock,
          },
        ];
      }

      // Create new cart item
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

  // Get cart items
  mock.onGet("/api/cart/items").reply((config) => {
    const user_id = config.params?.user_id;
    const userCartItems = cartItems.filter((item) => item.user_id === user_id);

    const cartItemsWithDetails = userCartItems
      .map((item) => {
        const product = new_products_schema.find(
          (p) => p.id === item.product_id
        );
        const variant = product?.variants.find((v) => v.id === item.variant_id);

        if (!product || !variant) {
          return null; // Handle missing product or variant
        }

        // Map variant attributes to their names and values
        const variantAttributes = variant.attributes.reduce(
          (acc, attr) => {
            const attribute = product.attributes.find(
              (a) => a.id === attr.attributeId
            );
            const value = attribute?.values.find((v) => v.id === attr.valueId);

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
            name: product.name,
            description: product.description,
            // Use variant price instead of product price
            price: variant.price,
            // Use variant image instead of product images
            images: [variant.image.url],
            // Add variant stock for availability checking
            stock: variant.stock,
          },
          variant: variantAttributes,
        };
      })
      .filter(Boolean); // Remove any null items

    // Calculate totals using variant prices
    const total_items = userCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const total_price = userCartItems.reduce((sum, item) => {
      const product = new_products_schema.find((p) => p.id === item.product_id);
      const variant = product?.variants.find((v) => v.id === item.variant_id);
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

  // Update cart item quantity
  mock.onPut(/\/api\/cart\/items\/.+/).reply((config) => {
    const cart_item_id = config.url?.split("/").pop();
    const { quantity } = JSON.parse(config.data);

    const cartItem = cartItems.find(
      (item) => item.cart_item_id === cart_item_id
    );

    if (!cartItem) {
      return [404, { error: "Cart item not found" }];
    }

    // Find product and variant to check stock
    const product = new_products_schema.find(
      (p) => p.id === cartItem.product_id
    );
    const variant = product?.variants.find((v) => v.id === cartItem.variant_id);

    if (!product || !variant) {
      return [404, { error: "Product or variant not found" }];
    }

    // Check if new quantity exceeds stock
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
};

//delete cart item
