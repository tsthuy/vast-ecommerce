"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ArrowRight } from "lucide-react";

import { usePromo } from "~/hooks/use-promo.hook";

import { cn } from "~/libs/utils";

import { ProMoSkeleton } from "../skeletons";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export function PromoSlider() {
  const { t } = useTranslation("common");

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const router = useRouter();
  const { data: slides, isLoading } = usePromo(router.locale || "en");

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  if (isLoading) {
    return <ProMoSkeleton />;
  }

  return (
    <div className="relative">
      <Carousel className="pt-10" setApi={setApi}>
        <CarouselContent>
          {slides &&
            slides.map((slide) => (
              <CarouselItem key={slide.id} className="cursor-pointer">
                <div className="flex min-h-[344px] flex-col justify-evenly overflow-hidden bg-black xs:flex-row">
                  <div className="flex flex-col justify-center pl-8">
                    <div className="sx:pt-0 flex flex-col items-center justify-center pt-2 xs:items-start">
                      <div className="flex flex-col items-center gap-6 md:flex-row">
                        <Image
                          src={slide.icon || "/placeholder.svg"}
                          alt="iphone"
                          width={50}
                          height={50}
                          className="w-12"
                        />

                        <p className="text-white">{slide.title}</p>
                      </div>

                      <div className="py-5">
                        <p className="max-w-72 font-inter text-20 font-semibold text-white md:text-48 md:leading-[60px]">
                          {slide.description}
                        </p>
                      </div>

                      <Link
                        href="#"
                        className="flex items-center gap-2 text-16 font-medium text-text-secondary underline underline-offset-8 hover:text-button-2"
                      >
                        {t("common.shop_now")}

                        <ArrowRight className="size-5 text-white hover:text-button-2" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="mt-4 object-contain"
                      priority
                      width={496}
                      height={352}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Dot indicators */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {slides &&
            slides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-2 w-2 rounded-full p-0",
                  current === index ? "bg-button-2" : "bg-secondary-2"
                )}
                onClick={() => scrollTo(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
        </div>
      </Carousel>
    </div>
  );
}
