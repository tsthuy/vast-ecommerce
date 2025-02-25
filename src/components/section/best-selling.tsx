import { useTranslation } from "next-i18next";

import { NewProduct } from "~/types/product";

import MyButton from "../custom/button";
import ProductList from "../product/product-list";
import SectionHeading from "../section-heading";
import TitleHeading from "../title-heading";

interface BestSellingProps {
  initialProducts: NewProduct[];
}

export default function BestSelling({ initialProducts }: BestSellingProps) {
  const { t } = useTranslation("common");
  return (
    <>
      <SectionHeading section_key="this_month" />

      <div className="flex justify-between gap-2">
        <TitleHeading heading_key="best_sales" />

        <MyButton className="">{t("view_all")}</MyButton>
      </div>

      <ProductList products={initialProducts} />
    </>
  );
}
