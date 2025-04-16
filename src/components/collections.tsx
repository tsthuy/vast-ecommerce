import { memo } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

function Collections() {
  const { t } = useTranslation("common");

  return (
    <div className="">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - PlayStation */}
        <Card className="overflow-hidden bg-black">
          <CardContent className="relative flex aspect-square min-h-[600px] items-center p-0">
            <div className="relative flex size-[50%] items-center justify-center xs:size-3/5 sm:size-4/5">
              <Image
                src="https://s3-alpha-sig.figma.com/img/1c36/0f79/0c1817d3afa266b3c9f8c81ff0ed4428?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NYtjPHdKjsvXDaYFA5TdFzyP3MRFL5CGnIswJklwx2x05o0P9m2oy-TPMu3SFTf16~bChIVBEsBh3iT-0jvpEbStY6VOa8T1cRGfpXT~A4K6Cj2Mrn~sqDJF9JAF5zvIi9N7GEqC4E~aXT~PBqzQEXOR4GEDSFkbKaMaJplskvoarIxhjkbScnmUjkKrXk0-4fH-Y6xx4B98qON6u7swMmzNPasYBBg1HIQ3yPawDyEkFxD5xO~~38qgLLmXMaMZOj6NCtlnH1lcc7UbvRYqCv3V2SAmDliWdvhfHENEbb2kxw0~sfybHaV-0SfpokcnEP6AH0mGmeofw-7UZUR8GA__"
                alt="PlayStation 5 Console"
                fill
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                priority
              />
            </div>

            <div className="absolute bottom-2 left-0 w-full p-8">
              <h2 className="font-inter text-xl font-semibold text-secondary-2 xss:text-24">
                {t("collection.ps5_title")}
              </h2>

              <p className="max-w-[40%] py-4 text-14 font-normal text-secondary-2 xs:max-w-[80%]">
                {t("collection.ps5_description")}
              </p>

              <Button
                variant="link"
                className="flex h-auto p-0 text-16 font-medium text-secondary-2 underline hover:text-button-2"
              >
                {t("common.shop-now")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="grid gap-6">
          {/* Top Right - Women's Collections */}
          <Card className="overflow-hidden bg-black pb-0 text-white">
            <CardContent className="relative flex min-h-[280px] items-center justify-center p-0">
              <Image
                src="/images/women.png"
                alt="Women's Collections"
                fill
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />

              <div className="absolute bottom-6 left-0 w-full px-8">
                <h2 className="font-inter text-xl font-semibold text-secondary-2 xss:text-24">
                  {t("collection.women_collections")}
                </h2>

                <p className="py-4 text-14 font-normal text-secondary-2">
                  {t("collection.women_description")}
                </p>

                <Button
                  variant="link"
                  className="flex h-auto p-0 text-16 font-medium text-secondary-2 underline hover:text-button-2"
                >
                  {t("common.shop-now")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Right Grid */}
          <div className="grid grid-cols-1 gap-6 xs:grid-cols-2">
            {/* Bottom Left - Speakers */}
            <Card className="overflow-hidden bg-black text-white">
              <CardContent className="relative flex aspect-square min-h-[220px] items-center justify-center p-0">
                <div className="relative h-[65%] w-[65%]">
                  <Image
                    src="/images/speaker.png"
                    alt="Speakers"
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-6 left-0 w-full px-6">
                  <h2 className="max-w-fit bg-black/50 font-inter text-xl font-semibold text-secondary-2 xss:text-24 sm:max-w-none sm:bg-transparent">
                    {t("collection.speakers_title")}
                  </h2>

                  <p className="max-w-[60%] py-4 text-14 font-normal text-secondary-2 xss:max-w-[90%]">
                    {t("collection.speakers_description")}
                  </p>

                  <Button
                    variant="link"
                    className="flex h-auto p-0 text-16 font-medium text-secondary-2 underline hover:text-button-2"
                  >
                    {t("common.shop-now")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Right - Perfume */}
            <Card className="overflow-hidden bg-black text-white">
              <CardContent className="relative flex aspect-square min-h-[220px] items-center p-0 sm:justify-center">
                <div className="relative size-[55%] xss:size-[70%]">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/1531/5cd1/5102562cf220504d288fa568eaa816dd?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G28aXSN-C04ul-RAUWx4jrcbxChwfIEUUlu4VeXUjDGlkJF~jmFRzu7c5G34ITD~MMcoExgwDjrOcTvXoZPcih7VsOIBEANsM0aZz0DDkUsqHtJoe-Yp0HpmXO-bFQ3Iu0UkjtICZdGGKnoXlPz-fafJIhdJV8dh2-o9CYsfOjlAeANDg5rEhFVSLQ~zkBFd5JekvImRFKaFL7Z1UXTQvPdPkXaMF1efwtzqc1JfnF6J4hrcY3gGy5HOnvg7Rn5q70St64S0sDL7ssXOduZsN74GnNP2kwFr18lVzdSC7aVnRiuAMg9z1BqtP~lueuLWzbRSXRZQnL~xbovbhkwQTQ__"
                    alt="Perfume"
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-6 left-0 w-full px-6">
                  <h2 className="font-inter text-24 font-semibold text-secondary-2">
                    {t("collection.perfume_title")}
                  </h2>

                  <p className="max-w-[70%] py-4 text-14 font-normal text-secondary-2 xss:max-w-[90%]">
                    {t("collection.perfume_description")}
                  </p>

                  <Button
                    variant="link"
                    className="flex h-auto p-0 text-16 font-medium text-secondary-2 underline hover:text-button-2"
                  >
                    {t("common.shop-now")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Collections);
