"use client";

import Image from "next/image";
import { useTranslation } from "next-i18next";

import CountTimer from "../countdown-timer";
import MyButton from "../custom/button";

export default function Hero() {
  const { t } = useTranslation("common");

  const targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  return (
    <div className="bg-black lg:min-h-[500px]">
      <div className="mx-auto p-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center gap-20 pb-[20px] pt-[40px] md:flex-row">
          {/* Left Content */}
          <div className="flex flex-col items-center justify-center gap-8 md:items-start md:justify-start">
            <span className="text-16 font-semibold text-button-1">
              {t("hero.categories")}
            </span>

            <h2 className="text-center font-inter text-32 font-semibold tracking-[0.04] text-secondary-2 md:text-left lg:text-48">
              {t("hero.title")}
            </h2>

            {/* Countdown Timer */}
            <CountTimer targetDate={targetDate} variant="circular" />

            <MyButton myVariant="button1" className="">
              {t("hero.buy_now")}
            </MyButton>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center">
            {/* Glow effect layer */}
            <div
              className="absolute z-0 h-[300px] w-[500px] rounded-full bg-white/30 blur-[100px]"
              style={{
                transform: "scale(0.9)",
              }}
            />

            <div className="relative z-10 h-[140px] w-[250px] xss:h-[170px] xss:w-[300px] lg:h-[300px] lg:w-[500px]">
              <Image
                src="/images/single_speaker.png"
                alt="JBL Boombox with glow"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
