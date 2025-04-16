import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { Input } from "./ui/input";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-black text-white">
      <div className="px-4 py-[80px] xl:px-[135px]">
        <div className="flex flex-wrap justify-center gap-[87px]">
          {/* Exclusive Section */}
          <div className="space-y-4">
            <h2 className="text-center font-inter text-24 font-bold text-secondary-2 sm:text-start">
              Exclusive
            </h2>

            <div className="space-y-4">
              <h3 className="text-20 font-medium">{t("footer.subscribe")}</h3>

              <p className="max-w-[213px] break-words text-16 font-normal text-secondary-2">
                {t("footer.get_10_off")}
              </p>

              <form className="flex max-w-[213px] rounded border p-1">
                <Input
                  type="email"
                  placeholder={t("footer.enter_email")}
                  className="hover- rounded-r-none border-0 bg-transparent text-white focus:border-0"
                />

                <button
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                  className="rounded text-white hover:bg-button-2"
                >
                  <svg
                    className="mx-2"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.91199 9.99999H2.99999L1.02299 2.13499C1.01033 2.08928 1.00262 2.04234 0.999989 1.99499C0.977989 1.27399 1.77199 0.773987 2.45999 1.10399L21 9.99999L2.45999 18.896C1.77999 19.223 0.995989 18.737 0.999989 18.029C1.00201 17.9657 1.01313 17.9031 1.03299 17.843L2.49999 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h2 className="text-20 font-medium">{t("footer.support")}</h2>

            <div className="space-y-4 text-16 font-normal">
              <p>111 Bijoy sarani, Dhaka,</p>

              <p>DH 1515, Bangladesh.</p>

              <p>exclusive@gmail.com</p>

              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h2 className="text-20 font-medium">{t("footer.account")}</h2>

            <nav className="space-y-4 text-16 font-normal">
              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.my_account")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.login_register")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.cart")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.wishlist")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.shop")}
              </Link>
            </nav>
          </div>

          {/* Quick Link Section */}
          <div className="space-y-4">
            <h2 className="text-20 font-medium">{t("footer.quick_link")}</h2>

            <nav className="space-y-4 text-16 font-normal">
              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.privacy_policy")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.terms_of_use")}
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                FAQ
              </Link>

              <Link
                href="#"
                className="block hover:text-button-2 hover:underline"
              >
                {t("footer.contact")}
              </Link>
            </nav>
          </div>

          {/* Download App Section */}
          <div className="space-y-4">
            <h2 className="text-20 font-medium">{t("footer.download_app")}</h2>

            <p className="text-12 font-medium opacity-70">
              {t("footer.download_app")}
            </p>

            <div className="flex flex-row">
              <div className="relative size-[76px]">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/9913/87c0/5dd6d44594e01b675513068803e2426d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V2R6pYbCTKdQmFAttEEG2xvzM-9BYW6LjHrVdll2oXYLlHDbkyj4qAh6as8~Mjdh4YyDmkxrRvEANSPg58Bsf0sqLqeTA~XLQQBSbYpoDzaDaAyxfoq9javj2rjhkQa06whVBP-4lmQ3BJnqJRc-uksO~dCPDKyYseml5Q89i8B2M8P0ed9APFV4DRk4v1~wud2eswqGnIiaDZ~cNe-rAoTLbb9BdmCno5RCdnfwXNXM-Gs8lQ4GLy3XGddOG~oit7akwUrPLgOamMvFtXPJzYn9KgUHZi2L157JXNsoKpH76BiNJjzvXOn9ziZuIs8h2WKzbYdxARYbpHnMUwjN6A__"
                  alt="QR Code"
                  className="rounded-lg object-contain"
                  fill
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <button className="relative h-[30px] w-[104px] py-4">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/a61d/4c71/10b18ab55a1e1a07ebf54a46ebb07284?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZjI4nXN8D-Sft9xzhEDaq~C9~x1P63YlklzxCLKdwchHVumSgPE88386JZziBmsRfDecVUEp5Fm1cOOr-hUkrXVYwxT7EjOz0kOP7Ys-3dBvhyz5V3iL0-zjwqgQ72mUqnZPB9VFWNSDbGosY2n1MmSfX~xLXXr4K~DJ~85StI2-4w2VJMLs93OMa38sOgJt~7K90PrwPvBxPlm9N73qCWuc9T4oxF~Br06HrS1Tex07vRtdsXsgeipiQxNsLAaXFaqHj7zJLoB53L6xfBljgc~xaHGWuSY88UjbAkO~jmUl7rPQcjQAxgeODJpZvOnLc9-gK8gneqGgqzMqUQgJQQ__"
                    alt="Google Play"
                    fill
                    className="rounded-lg object-cover"
                  />
                </button>

                <button className="relative h-[30px] w-[104px] py-4">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/3893/2d5a/ccb54c528f9bcf326ca48ea29bd6d890?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fVAnQe6AaYUais0Gm6Cr4Rq80ykp2knK~GDPp6w2-sQYZkZ7xI9g4-7J4Uy~UwR2cAaqge3fS4OXjQsLEn6kcRyF8LA0Pa3HcXRfAcSvzp4h2-~hrFp6a0LPWIHeGvcy6OGDX56lzu7N2LrNCPpAX-9KgXDeiZJPIZlxdPnU473eXNsJymk37WZzZlsUZBxjtuKMUJCZKJMq-yU~1N5huoKGSGWt1i6izkJhPggu6Bh~ViOY3zMa-YaaUj4SVQmo66csyuNxbDL57mxGrZcY7K4lzQ2b9p1bssVcLmrKwL36Lt35pFffj0Nqis7Jlhkg-XtwoelzUxIRQsjwcxMbwA__"
                    alt="App Store"
                    fill
                    className="rounded-lg object-cover"
                  />
                </button>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>

              <Link
                href="#"
                className="text-gray-400 hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>

              <Link
                href="#"
                className="text-gray-400 hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagra"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />

                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>

              <Link
                href="#"
                className="text-gray-400 hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

                  <rect width="4" height="12" x="2" y="9" />

                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto p-4 opacity-40">
          <p className="text-center text-16 font-normal text-secondary-2">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
