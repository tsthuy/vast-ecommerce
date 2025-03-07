import { memo } from "react";

interface ProductVariantSelectionProps {
  product: { attributes: ProductAttribute[]; variants: ProductVariant[] };
  selectedVariant: ProductVariant;
  onVariantChange: (color: string, size: string) => void;
}

const ProductVariantSelection = ({
  product,
  selectedVariant,
  onVariantChange,
}: ProductVariantSelectionProps) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <label className="block font-inter text-20">Colours:</label>
          <div className="flex gap-2">
            {product.attributes
              .find((attr) => attr.name === "Color")
              ?.values.map((color) => (
                <button
                  key={color.id}
                  className={`h-4 w-4 rounded-full border-2 ${
                    selectedVariant.attributes.some(
                      (attr) => attr.valueId === color.id
                    )
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() =>
                    onVariantChange(
                      color.id,
                      selectedVariant.attributes.find(
                        (attr) => attr.attributeId === "attr2"
                      )?.valueId || "s1"
                    )
                  }
                />
              ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="block font-inter text-20">Size:</label>
          <div className="flex gap-2">
            {product.attributes
              .find((attr) => attr.name === "Size")
              ?.values.map((size) => (
                <button
                  key={size.id}
                  className={`rounded border px-3 py-1 ${
                    selectedVariant.attributes.some(
                      (attr) => attr.valueId === size.id
                    )
                      ? "border-black bg-button-2 text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    onVariantChange(
                      selectedVariant.attributes.find(
                        (attr) => attr.attributeId === "attr1"
                      )?.valueId || "c1",
                      size.id
                    )
                  }
                >
                  {size.value}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVariantSelection);
