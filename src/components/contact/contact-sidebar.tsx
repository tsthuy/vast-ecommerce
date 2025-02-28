import { useTranslation } from "next-i18next"
import { Mail,Phone } from "lucide-react"

export const ContactSidebar = () => {
    const { t } = useTranslation("contact")
return (
    <div className="py-10 px-[35px] flex md:flex-col flex-row w-full md:w-1/3 shadow justify-around md:justify-normal gap-8">
        <div className="flex flex-col space-y-6 pb-8 md:border-b-2 border-black">
            <div className="flex gap-4 items-center">
                <button className="border bg-button-2 p-4 rounded-full text-white">
                    <Phone size={24} />
                </button>
                <h3 className="text-16 font-medium">{t("call_to_us")}</h3>
            </div>
            <p className="text-14">{t("we_are_available")}</p>
            <p className="text-14">{t("phone")}: +8801611112222</p>
        </div>

        <div className="space-y-6">
         <div className="flex gap-4 items-center">
                <button className="border bg-button-2 p-4 rounded-full text-white">
                    <Mail size={24} />
                </button>
                <h3 className="text-16 font-medium">{t("write_to_us")}</h3>
        </div>
            <p className="text-14">{t("fill_out_the_form")}</p>
            <p className="text-14">Emails: customer@exclusive.com</p>            
            <p className="text-14">Emails: support@exclusive.com</p>

        </div>
    </div>
)
}