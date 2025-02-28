import Image from "next/image"
import { useTranslation } from "next-i18next"

import Container from "../container"
import { ServiceFeatures } from "../section"

import { ManagerCarousel } from "./manager-carousel"
import { PerformancesCarousel } from "./performance-carousel"

export const About = () => {
    const { t } = useTranslation("about")
    return (
        <>
        <div className="w-full xl:bg-[url('/images/story.png')] bg-no-repeat bg-right mt-[60px] mb-10 xl:mb-[140px]">
        <Container className="flex py-10 xl:py-[136px] xl:justify-normal justify-center gap-10 flex-col lg:flex-row items-center">
            <div className="xl:max-w-[40%] lg:w-[50%] w-[80%]">
            <h1 className="text-54 font-inter pb-8 font-semibold lg:text-left text-center">{t("our_story")}</h1>
            <p className="text-16 font-normal">{t("launch_2015")}</p>
            <p className="pt-4 text-16 font-normal">{t("1_million_offers")}</p>
            </div>
            <div className="relative xl:hidden ">
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
            <ManagerCarousel/>
            <div className="pb-[140px]">
            <ServiceFeatures/>
            </div>
        </Container>
        </>
    )
}