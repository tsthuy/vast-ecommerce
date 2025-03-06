import Image from "next/image";
import { useTranslation } from "next-i18next";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Collections() {
  const { t } = useTranslation("common");

  return (
    <div className="">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - PlayStation */}
        <Card className="overflow-hidden bg-black">
          <CardContent className="relative flex aspect-square min-h-[600px] items-center p-0">
            <div className="relative flex size-[50%] items-center justify-center xs:size-3/5 sm:size-4/5">
              <Image
                src="https://s3-alpha-sig.figma.com/img/1c36/0f79/0c1817d3afa266b3c9f8c81ff0ed4428?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YAao6MbW~PAGffE2GoFEVBjpgeRaSWWoDwjc~CznN4xXzO-chZ0h9eNnq4IKfBES4NgZakPKGB0IVJ9XiX2Kz4evzVaKcUimN2kfOvlG5I~kxU7SCU3Pk8FBstAMV4fU1IZ9xUYyBRqgWAu-8f-JBtDLEcsgPJ1owZyMHBTbbvUcQC-NX2YFjfMM8stlzBO6rO5x0-fSQmhylQbrZ65vUNpXEcW7KyIn20uQQmvdOYR06ipqiqA2n-Wt~phhWEpXUntwrLgtHdf9e4y5Y0taqCCvIYv1hSJk5ezVXZRGCsJZLvYOkRb0b6EVouV6OPQyw19QK6NhkZWGMyvYdWCdAw__"
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
                    src="https://s3-alpha-sig.figma.com/img/1531/5cd1/5102562cf220504d288fa568eaa816dd?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JqKR~TifxYFmlKB9oYz0e6ksDak~mmBEX4iV0raWnvQ53oEMTwTmbRFkXmlWob2MVE2qZ-pYN5nfdKZsGANw6f-6Eo3flxmFbziA0h2O2Kzs6kbimXCgFYPBkRMjcyjzl2~tJXLFrJP59c7asSSe4dKQELlXCgjoVVnitHCc16GJXjzM6IVxhgekhknfsqNfCscm72j4tOKpkbGEtT160x1rKTKbN3ESR1i7726493fhSoHHQpDs~huo4gXTkBDYO9QYQoIBpWvxXcREUaENBzSlbwC2zAtK5jetJNdkKImjwyg-HThMObY9WSxSfIFjiXp0TEz2A8u-Y2TQqjomDg__"
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
