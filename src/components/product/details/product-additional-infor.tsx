import { memo } from "react";
import { useTranslation } from "next-i18next";
import { RefreshCcw, Truck } from "lucide-react";

const ProductAdditionalInfo = () => {
  const { t } = useTranslation("common");

  return (
    <div className="mt-8 max-w-[400px] rounded-md border border-black">
      <div className="flex items-center gap-4 p-3">
        <button>
          <Truck className="size-8" />
        </button>
        <div className="">
          <p className="text-16 font-medium">{t("service.free_delivery")}</p>
          <span className="cursor-pointer text-12 font-medium underline hover:text-button-2">
            {t("details.enter_postcode")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 border-t border-black p-3">
        <button>
          <RefreshCcw className="size-8" />
        </button>
        <div className="">
          <p className="text-16 font-medium">{t("details.return_delivery")}</p>
          <span className="text-12 font-medium">
            {t("details.free_30_days_return")}
          </span>
          <span className="cursor-pointer text-12 font-medium underline hover:text-button-2">
            {t("details.details")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductAdditionalInfo);
