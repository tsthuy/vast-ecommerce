import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { setLocale } from "~/services/axios-instance.service";

import Container from "../container";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TopHeader() {

  const { t } = useTranslation(["common", "header"]);
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="w-full bg-black text-white">
      <Container className="flex items-center justify-between gap-6">
        <div className="font-arial hidden flex-1 2xl:flex"></div>

        <div className="flex items-center gap-[8px] py-[12px]">
          <p className="text-wrap text-center text-14 font-normal">
            {t("header:sale-off")}
          </p>

          <Button
            variant="link"
            className="hidden h-auto p-0 text-14 font-semibold text-white underline hover:text-button-2 md:flex"
          >
            {t("shop-now")}
          </Button>
        </div>

        <div className="flex flex-1 justify-end">
          <Select defaultValue={router.locale} onValueChange={changeLanguage}>
            <SelectTrigger className="bg-bu size-auto border-0 bg-transparent p-0 text-sm text-white hover:text-button-2 focus:ring-0 [&>svg]:ml-2 [&>svg]:opacity-100">
              <SelectValue placeholder={t("language")} className="" />
            </SelectTrigger>

            <SelectContent className="backdrop-blur-3xl bg-transparent/50">
              <SelectItem value="en">English</SelectItem>

              <SelectItem value="vi">Vietnamese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Container>
    </div>
  );
}
