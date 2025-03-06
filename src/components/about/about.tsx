import Image from "next/image";
import { useTranslation } from "next-i18next";

import Container from "../container";
import { ServiceFeatures } from "../section";

import { ManagerCarousel } from "./manager-carousel";
import { PerformancesCarousel } from "./performance-carousel";

export const About = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="mb-10 mt-[60px] w-full bg-right bg-no-repeat xl:mb-[140px] xl:bg-[url('/images/story.png')]">
        <Container className="flex flex-col items-center justify-center gap-10 py-10 lg:flex-row xl:justify-normal xl:py-[136px]">
          <div className="w-[80%] lg:w-[50%] xl:max-w-[40%]">
            <h1 className="pb-8 text-center font-inter text-54 font-semibold lg:text-left">
              {t("about.our_story")}
            </h1>

            <p className="text-16 font-normal">{t("about.launch_2015")}</p>

            <p className="pt-4 text-16 font-normal">
              {t("about.1_million_offers")}
            </p>
          </div>

          <div className="relative xl:hidden">
            <Image
              src={"/images/story.png"}
              alt="story"
              className="rounded-lg"
              width={500}
              height={500}
            />
          </div>
        </Container>
      </div>

      <Container>
        <PerformancesCarousel />

        <ManagerCarousel />

        <div className="pb-[140px]">
          <ServiceFeatures />
        </div>
      </Container>
    </>
  );
};
