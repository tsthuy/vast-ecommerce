import { useRouter } from "next/router";

import { useRelatedProducts } from "~/hooks";

import SectionHeading from "../section-heading";

import ProductList from "./product-list";

interface RelatedProductProps {
  categoryId: string;
  productId: number;
}

export const RelatedProduct = ({
  categoryId,
  productId,
}: RelatedProductProps) => {
  const router = useRouter();
  const { data: relatedProducts } = useRelatedProducts(
    router.locale as string,
    categoryId,
    productId
  );

  return (
    <>
      <SectionHeading section_key="related_products" />
      <h1
        onClick={() => {
          console.log(document.getElementById("related_products")?.offsetTop);
        }}
        id="related_products"
      >
        current offsetHeight
      </h1>
      <div className="pb-[140px]">
        <ProductList products={relatedProducts || []} />
      </div>
    </>
  );
};
