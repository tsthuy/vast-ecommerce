import { memo } from "react";

interface ProductVariantSelectionProps {
  product: NewProduct;
  selectedVariant: ProductVariant;
  onVariantChange: (colorId: string, sizeId: string) => void;
}

const ProductVariantSelection = ({
  product,
  selectedVariant,
  onVariantChange,
}: ProductVariantSelectionProps) => {
  console.log("selectedVariant", selectedVariant);
  const colorAttribute = product.attributes.find(
    (attr) =>
      attr.name.toLowerCase() === "color" ||
      attr.name.toLowerCase() === "màu sắc"
  );
  const sizeAttribute = product.attributes.find(
    (attr) =>
      attr.name.toLowerCase() === "size" ||
      attr.name.toLowerCase() === "kích thước"
  );

  console.log(
    colorAttribute?.values
      .map((color) => (
        <button
          key={color.id}
          className={`h-4 w-4 rounded-full border-2 ${
            selectedVariant.attributes.some((attr) => attr.valueId === color.id)
              ? "border-black"
              : "border-gray-300"
          }`}
          style={{ backgroundColor: color.value }}
          onClick={() =>
            onVariantChange(
              color.id,
              selectedVariant.attributes.find(
                (attr) => attr.attributeId === (sizeAttribute?.id || "attr2")
              )?.valueId || "s1"
            )
          }
        />
      ))
      .map((item) => {
        return item.toString();
      })
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        {colorAttribute && (
          <div className="flex items-center gap-6">
            <label className="block font-inter text-16">
              {colorAttribute.name}:
            </label>
            <div className="flex gap-2">
              {colorAttribute.values.map((color) => (
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
                        (attr) =>
                          attr.attributeId === (sizeAttribute?.id || "attr2")
                      )?.valueId || "s1"
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        {sizeAttribute && (
          <div className="flex items-center gap-6">
            <label className="block font-inter text-16">
              {sizeAttribute.name}:
            </label>
            <div className="flex gap-2">
              {sizeAttribute.values.map((size) => (
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
                        (attr) =>
                          attr.attributeId === colorAttribute?.id || "attr1"
                      )?.valueId || "c1",
                      size.id
                    )
                  }
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductVariantSelection);
