import Image from "next/image"

import Container from "../container"
import { ServiceFeatures } from "../section"

import { ManagerCarousel } from "./manager-carousel"
import { PerformancesCarousel } from "./performance-carousel"

export const About = () => {
    return (
        <>
        <div className="w-full xl:bg-[url('/images/story.png')] bg-no-repeat bg-right mt-[60px] mb-10 xl:mb-[140px]">
        <Container className="flex py-10 xl:py-[136px] xl:justify-normal justify-center gap-10 flex-col lg:flex-row items-center">
            <div className="xl:max-w-[40%] lg:w-[50%] w-[80%]">
            <h1 className="text-54 font-inter pb-8 font-semibold lg:text-left text-center">Our Story</h1>
            <p className="text-16 font-normal">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
            <p className="pt-4 text-16 font-normal">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
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