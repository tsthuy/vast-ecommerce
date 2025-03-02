// product-list.tsx
import * as React from "react";

import ProductCard from "./product-card";

interface ProductListProps {
  products: NewProduct[];
  limit?: number;
  paginated?: boolean;
  currentPage?: number;
  className?: string;
}

export default function ProductList({
  products,
  limit = 4,
  paginated = false,
  currentPage = 1,
  className = "",
}: ProductListProps) {
  const getCurrentProducts = () => {
    if (!paginated) {
      return products.slice(0, limit);
    }
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return products && products.slice(startIndex, endIndex);
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap justify-center gap-[30px] pt-8 sm:justify-start lg:justify-start lg:pt-[60px] ${className}`}
      >
        {getCurrentProducts() &&
          getCurrentProducts().map((product) => (
            <div
              key={product.id}
              className="sm:w-[calc((100%-30px)/2)] md:w-[calc((100%-60px)/3)] lg:w-[calc((100%-90px)/4)]"
            >
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}
