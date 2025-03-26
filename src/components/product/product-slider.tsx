import * as React from "react";
import { useRouter } from "next/router";

import { useProductsFlashSales } from "~/hooks";

import CountTimer from "../countdown-timer";
import SectionHeading from "../section-heading";
import { FlashSalesSkeleton } from "../skeletons";
import TitleHeading from "../title-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import ProductCard from "./product-card";

export default React.memo(function ProductSlider() {
  const router = useRouter();

  const { data: products, isLoading } = useProductsFlashSales(
    router.locale || "en"
  );
  if (isLoading)
    return (
      <div className="pt-[80px]">
        <FlashSalesSkeleton />
      </div>
    );

  const targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  return (
    <>
      <SectionHeading section_key="today" />

      <div className="flex-col pb-[40px] lg:flex-row">
        <div className="flex flex-col items-center gap-6 md:gap-20 lg:flex-row">
          <TitleHeading heading_key="flash_sale" />

          <CountTimer targetDate={targetDate} />
        </div>
      </div>

      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="no-scrollbar w-full [&>div]:overflow-visible"
        >
          <CarouselContent className="-ml-4 gap-[30px]">
            {products &&
              products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="min-w-[270px] basis-[calc((100%-30px)/2)] md:basis-[calc((100%-60px)/3)] lg:basis-[calc((100%-90px)/4)]"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
          </CarouselContent>

          <div className="absolute -top-[60px] right-12 flex">
            <CarouselPrevious className="size-11 rounded-full bg-secondary-2" />

            <CarouselNext className="size-11 rounded-full bg-secondary-2" />
          </div>
        </Carousel>
      </div>
    </>
  );
});
