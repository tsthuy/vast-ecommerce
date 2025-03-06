import { memo } from "react";
import { useTranslation } from "next-i18next";
import { Headphones, Shield, Truck } from "lucide-react";

const ServiceFeatures = memo(function ServiceFeatures() {
  console.log("ServiceFeatures");
  const { t } = useTranslation("common");

  return (
    <section className="pt-[140px]">
      <div className="flex flex-wrap justify-center gap-[88px]">
        {/* Free Delivery Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Truck className="size-11 rounded-full bg-black p-2 text-white" />
          </div>
          <h3 className="pt-2 text-20 font-semibold">
            {t("service.free_delivery")}
          </h3>
          <p className="text-14 font-normal">
            {t("service.delivery_description")}
          </p>
        </div>

        {/* Customer Service Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Headphones className="size-11 rounded-full bg-black p-2 text-white" />
          </div>
          <h3 className="pt-2 text-20 font-semibold">
            {t("service.customer_service")}
          </h3>
          <p className="text-14 font-normal">
            {t("service.customer_description")}
          </p>
        </div>

        {/* Money Back Guarantee Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Shield className="size-11 rounded-full bg-black p-2 text-white" />
          </div>
          <h3 className="pt-2 text-20 font-semibold">
            {t("service.money_back")}
          </h3>
          <p className="text-14 font-normal">
            {t("service.money_description")}
          </p>
        </div>
      </div>
    </section>
  );
});

export { ServiceFeatures };
