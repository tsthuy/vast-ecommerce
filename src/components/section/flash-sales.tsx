import { memo } from "react";
import { useTranslation } from "next-i18next";

import MyButton from "../custom/button";
import { ProductSlider } from "../product";

export default memo(function FlashSales() {
  const { t } = useTranslation("common");
  return (
    <>
      <ProductSlider />

      <div className="flex items-center justify-center border-b py-[60px]">
        <MyButton>{t("common.view_all_products")}</MyButton>
      </div>
    </>
  );
});
