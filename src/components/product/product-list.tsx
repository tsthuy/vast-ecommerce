// product-list.tsx
import * as React from "react";

import { NewProduct } from "~/types/product";

import Container from "../container";

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
    return products.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <div className="relative">
        <div
          className={`flex flex-wrap justify-center sm:justify-start gap-[30px] pt-[60px] lg:justify-start ${className}`}
        >
          {getCurrentProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
}
