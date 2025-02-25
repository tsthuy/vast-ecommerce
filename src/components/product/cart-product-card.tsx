import Image from "next/image";

import { Button } from "~/components/ui/button";

import type { NewProduct, ProductVariant } from "~/types/product";

import { useCartStore } from "~/stores";

interface CartProductCardProps {
  product: NewProduct;
  variant: ProductVariant;
  quantity: number;
}

export default function CartProductCard({
  product,
  variant,
  quantity,
}: CartProductCardProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, variant.id, newQuantity);
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square items-center justify-center flex overflow-hidden rounded-lg bg-gray-100">
          <div className="relative size-[70%]">
            <Image
              src={variant.image.url || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              className="transition-transform duration-300 hover:drop-shadow-[0_0_20px_var(--color-button-1)]"
            />
          </div>
        </div>

        {/* NEW tag */}
        {product.isNew && (
          <div className="absolute left-4 top-4 z-10">
            <div className="rounded bg-button-1 px-3 py-1 text-12 font-normal text-white">
              NEW
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 py-2 px-4 flex justify-between items-center">
          <span className="text-white">Qty: {quantity}</span>

          <div>
            <Button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-2 py-1 bg-gray-700 text-white mr-2"
            >
              -
            </Button>

            <Button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 bg-gray-700 text-white"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-sm text-muted-foreground">{product.description}</p>

        {/* Variant Information */}
        <div className="text-sm">
          {variant.attributes.map((attr) => {
            const attribute = product.attributes.find(
              (a) => a.id === attr.attributeId
            );
            const value = attribute?.values.find((v) => v.id === attr.valueId);
            return (
              <div key={attr.attributeId}>
                <span className="font-medium">{attribute?.name}: </span>

                {value?.label}
              </div>
            );
          })}
        </div>

        {/* Price */}
        <div className="text-lg font-bold">${variant.price.toFixed(2)}</div>

        {/* Remove from Cart Button */}
        <Button
          onClick={() => handleQuantityChange(0)}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          remove-from-cart
        </Button>
      </div>
    </div>
  );
}
