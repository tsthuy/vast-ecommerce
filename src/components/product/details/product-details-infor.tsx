import { memo } from "react";

import { renderStars } from "~/components/product/render-stars";

interface ProductInfoProps {
  product: NewProduct;
  selectedVariant: ProductVariant;
}

const ProductInfo = ({ product, selectedVariant }: ProductInfoProps) => {
  return (
    <div className="space-y-4">
      <h1 className="font-inter text-24 font-semibold">{product.name}</h1>
      <div className="flex items-center gap-2">
        <div className="flex">{renderStars(product.ratings)}</div>
        <span>({product.reviews} Reviews)</span>
        <span>|</span>
        <span className="text-green-500">In Stock</span>
      </div>
      <p className="font-inter text-24">${selectedVariant.price.toFixed(2)}</p>
      <p className="text-14 font-normal">{product.description}</p>
    </div>
  );
};

export default memo(ProductInfo);
