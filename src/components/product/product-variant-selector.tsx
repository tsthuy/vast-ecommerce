"use client";

import { useMemo, useState } from "react";

import { cn } from "~/libs/utils";

import type {
  AttributeValue,
  NewProduct,
  ProductVariant,
} from "~/types/product";

interface VariantSelectorProps {
  product: NewProduct;
  onVariantChange: (variant: ProductVariant) => void;
  selectedVariant: ProductVariant;
  disabled?: boolean;
}

export default function VariantSelector({
  product,
  onVariantChange,
  selectedVariant,
  disabled = false,
}: VariantSelectorProps) {
  // Find color and size attributes
  const colorAttribute = product.attributes.find(
    (attr) => attr.name === "Color"
  );
  const sizeAttribute = product.attributes.find((attr) => attr.name === "Size");

  // Get unique color and size values
  const colors = useMemo(() => colorAttribute?.values || [], [colorAttribute]);
  const sizes = useMemo(() => sizeAttribute?.values || [], [sizeAttribute]);
  // Track selected attributes
  const [selectedColor, setSelectedColor] = useState<AttributeValue>(
    colors.find((color) =>
      selectedVariant.attributes.some(
        (attr) =>
          attr.attributeId === colorAttribute?.id && attr.valueId === color.id
      )
    ) || colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<AttributeValue>(
    sizes.find((size) =>
      selectedVariant.attributes.some(
        (attr) =>
          attr.attributeId === sizeAttribute?.id && attr.valueId === size.id
      )
    ) || sizes[0]
  );

  // Find variant based on selected attributes
  const findVariant = (
    colorValue: AttributeValue,
    sizeValue: AttributeValue
  ) => {
    return product.variants.find(
      (variant) =>
        variant.attributes.some(
          (attr) =>
            attr.attributeId === colorAttribute?.id &&
            attr.valueId === colorValue.id
        ) &&
        variant.attributes.some(
          (attr) =>
            attr.attributeId === sizeAttribute?.id &&
            attr.valueId === sizeValue.id
        )
    );
  };

  // Get stock for a specific combination
  const getStockForVariant = (
    colorValue: AttributeValue,
    sizeValue: AttributeValue
  ) => {
    const variant = findVariant(colorValue, sizeValue);
    return variant?.stock || 0;
  };

  // Handle selection changes
  const handleColorChange = (color: AttributeValue) => {
    setSelectedColor(color);
    const newVariant = findVariant(color, selectedSize);

    if (newVariant) {
      onVariantChange(newVariant);
    }
  };

  const handleSizeChange = (size: AttributeValue) => {
    setSelectedSize(size);
    const newVariant = findVariant(selectedColor, size);

    if (newVariant) {
      onVariantChange(newVariant);
    }
  };

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <span className="text-12 font-medium">
            Color: {selectedColor.label}
          </span>

          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const stock = getStockForVariant(color, selectedSize);
              return (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-all hover:border-black relative",
                    selectedColor.id === color.id
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300",
                    stock === 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={disabled || stock === 0}
                >
                  <span
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />

                  {stock === 0 && (
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-50">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="space-y-2">
          <span className="text-12 font-medium">
            Size: {selectedSize.label}
          </span>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const stock = getStockForVariant(selectedColor, size);
              return (
                <button
                  key={size.id}
                  onClick={() => handleSizeChange(size)}
                  className={cn(
                    "flex h-10 min-w-[2rem] items-center justify-center rounded-md border-2 px-2 text-xs transition-all",
                    selectedSize.id === size.id
                      ? "border-black bg-black group text-white"
                      : "border-gray-200 hover:border-gray-300 text-12",
                    stock === 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={disabled || stock === 0}
                >
                  {size.label}

                  {stock > 0 && <span className="ml-1 text-xs">({stock})</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Information */}
    </div>
  );
}
