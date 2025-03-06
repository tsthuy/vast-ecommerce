import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function AccountSidebar() {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col sm:w-1/3 lg:w-1/4">
      <div className="">
        <h2 className="text-16 font-medium">{t("common.manage_my_account")}</h2>

        <div className="space-y-2 pb-6 pl-[35px] pt-4">
          <Link
            href="/account/profile"
            className="block text-16 font-normal text-red-500 hover:underline"
          >
            {t("account.my_profile")}
          </Link>

          <Link
            href="/account/address-book"
            className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline"
          >
            {t("account.address_book")}
          </Link>

          <Link
            href="/account/payment-options"
            className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline"
          >
            {t("account.my_payment_options")}
          </Link>
        </div>
      </div>

      <div className="">
        <h3 className="text-16 font-medium">{t("account.my_orders")}</h3>

        <div className="space-y-2 pb-4 pl-[35px] pt-4">
          <Link
            href="/account/returns"
            className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline"
          >
            {t("account.my_returns")}
          </Link>

          <Link
            href="/account/cancellations"
            className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline"
          >
            {t("account.my_cancellations")}
          </Link>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-16 font-medium">{t("account.my_wishlist")}</h3>
      </div>
    </div>
  );
}
