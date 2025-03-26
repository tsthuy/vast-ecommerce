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
                  src="https://s3-alpha-sig.figma.com/img/9913/87c0/5dd6d44594e01b675513068803e2426d?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q-AxG7fZIPedIW-f27rRHgN8t80OrCtJWyq9PoMIlZN0X4VfA5LDBYorCqyPzc-mTntSOhZseSO525jGIs4URt3Oo-NU393dOgd1jCBeSrv06~B4bxJxWDdMpKnfsiFAXJWtw04RMNqnltrAwf1BVyUsHk8LE7EK8rDheCSfsYufxfIiqSn4gMTOb3KmoB~oC7yKMqTzpPfr7QwjG-1-a2UZx6DvEC2CpOLl4pcl0QdjJVFEnwueQej0Mtddk-g3walGnJ0fhm7MX~Ft6CkHSkfO3aSmm4h5LPt-0w6cvgj4blbf1WwE-0frlwW1VGzLpPDqQO1TgiwL9xVWWUSHHA__"
                  alt="QR Code"
                  className="rounded-lg object-contain"
                  fill
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <button className="relative h-[30px] w-[104px] py-4">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/a61d/4c71/10b18ab55a1e1a07ebf54a46ebb07284?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QHAv6Wn48rmbL7CHEPmrk3ceiuAY-tVeZvNOD4uEdcWth6hP97AnLkNoZtgtu3lpQqJZwkdprWUiQcX9mKrqHRt7worZyWbiJdPBIqY7fIdVOIlkAJ8wZfer0WRAhPaw75f~q5ib-G4Jg8KuMmW8n53cEZSpcraOH6U-9Cu3XDMXyodlJzjmcUlXlhsn0cWvX31MfHkgIyf5Xk7puedwqhcNiZO1lCXbOZKYxmgKkJbv5n37LF4Ps9B9Ivfj8OxHe18oeiAASh3jhCD~r2x9OG2CiHjZbaEaD2VJmHhK5dOh7OJhEEewytrKHFLaq2xfOC53W0CzAVpOtBOl8bZ5lw__"
                    alt="Google Play"
                    fill
                    className="rounded-lg object-cover"
                  />
                </button>

                <button className="relative h-[30px] w-[104px] py-4">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/3893/2d5a/ccb54c528f9bcf326ca48ea29bd6d890?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cnsza2m6ZxdoMDmOicWvFZY4XDMmPASb0dO1wRDsxWV0krBE8OrjZFasAd4WFeamnurqeJ~0uuM1-siJEAMmxGqaBoIVwMxOYql-3fW-uPlYShFkpYv3qDOX9iJaTY~qzWe9mrqvCA95qxpvJdiq3qMnZpOFnwX19IKaqXlPUI8fjl6FhpsjTk1icIHBDFhHg4EisjsXPG1oz5~-~nQglhappaNjhVaSB3gENNGJ8f0Ye9cnFdoL1nuESvLTXetggyD-yFgIuS67g2tiWwbLx3naKVnnavSpbgndu2o5LaqgVIZIRAzC1o~zfDFc6g8xai2sFX6zk~rLzTiYR5abug__"
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
