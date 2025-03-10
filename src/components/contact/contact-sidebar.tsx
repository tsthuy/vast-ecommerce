import { memo } from "react";
import { useTranslation } from "next-i18next";
import { Mail, Phone } from "lucide-react";

export const ContactSidebar = memo(() => {
  const { t } = useTranslation("common");
  return (
    <div className="flex w-full flex-col justify-around gap-8 px-[35px] py-10 shadow sm:flex-row md:w-1/3 md:flex-col md:justify-normal">
      <div className="flex flex-col space-y-6 border-black pb-8 md:border-b-2">
        <div className="flex items-center gap-4">
          <button className="rounded-full border bg-button-2 p-4 text-white">
            <Phone size={24} />
          </button>

          <h3 className="text-16 font-medium">{t("contact.call_to_us")}</h3>
        </div>

        <p className="text-14">{t("contact.we_are_available")}</p>

        <p className="text-14">{t("contact.phone")}: +8801611112222</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button className="rounded-full border bg-button-2 p-4 text-white">
            <Mail size={24} />
          </button>

          <h3 className="text-16 font-medium">{t("contact.write_to_us")}</h3>
        </div>

        <p className="text-14">{t("contact.fill_out_the_form")}</p>

        <p className="text-14">Emails: customer@exclusive.com</p>

        <p className="text-14">Emails: support@exclusive.com</p>
      </div>
    </div>
  );
});
ContactSidebar.displayName = "ContactSidebar";
