import { useTranslation } from "next-i18next"
import { Headphones, Shield, Truck } from "lucide-react"

export default function ServiceFeatures() {
  const { t } = useTranslation("service")

  return (
    <section className="pt-[140px]">
      <div className="flex flex-wrap justify-center gap-[88px]">
        {/* Free Delivery Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Truck className="size-12 rounded-full bg-black p-1 text-white" />
          </div>

          <h3 className="pt-2 text-20 font-semibold">{t("free_delivery")}</h3>

          <p className="text-14 font-normal">
            {t("delivery_description")}
          </p>{" "}
        </div>

        {/* Customer Service Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Headphones className="size-12 rounded-full bg-black p-1 text-white" />
          </div>

          <h3 className="pt-2 text-20 font-semibold">
            {t("customer_service")}
          </h3>{" "}

          {/* Translated */}
          <p className="text-14 font-normal">
            {t("customer_description")}
          </p>{" "}

          {/* Translated */}
        </div>

        {/* Money Back Guarantee Feature */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-300 hover:bg-button-1 hover:text-white">
            <Shield className="size-12 rounded-full bg-black p-1 text-white" />
          </div>

          <h3 className="pt-2 text-20 font-semibold">{t("money_back")}</h3>{" "}

          {/* Translated */}
          <p className="text-14 font-normal">{t("money_description")}</p>{" "}

          {/* Translated */}
        </div>
      </div>
    </section>
  )
}
