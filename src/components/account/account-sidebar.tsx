import Link from "next/link"
import { useTranslation } from "next-i18next"

export default function AccountSidebar() {
  const { t } = useTranslation(["account","common"]);
  return (
    <div className="w-1/3 lg:w-1/4">
      <div className="">
      <h2 className="font-medium text-16">{t("common:manage_my_account")}</h2>

      <div className="space-y-2 pt-4 pb-6 pl-2 md:pl-[35px]">
        <Link href="/account/profile" className="block text-16 font-normal text-red-500 hover:underline">
          {t("my_profile")}
        </Link>
        <Link href="/account/address-book" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
          {t("address_book")}
        </Link>
        <Link href="/account/payment-options" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
         {t("my_payment_options")}
        </Link>
      </div>
    </div>

      <div className="">
        <h3 className="font-medium text-16">{t("my_orders")}</h3>
        <div className="space-y-2 pt-4 pb-4 pl-2 md:pl-[35px]">
          <Link href="/account/returns" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
           {t("my_returns")}
          </Link>
          <Link href="/account/cancellations" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
            {t("my_cancellations")}
          </Link>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-16 mb-2">{t("my_wishlist")}</h3>
      </div>
    </div>
  )
}
