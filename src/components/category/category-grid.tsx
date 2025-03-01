import { Smartphone } from "lucide-react";
import type React from "react";

import { cn } from "~/libs/utils";

import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CategoryGridProps {
  initialCategoriesGird: CategoryGrid[];
}

export function CategoryGrid({ initialCategoriesGird }: CategoryGridProps) {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="gap-[30px]">
          {initialCategoriesGird.map((category, index) => (
            <CarouselItem
              key={index}
              className="xs:basis-[calc((100%-30px)/2)] md:basis-[calc((100%-60px)/3)] lg:basis-[calc((100%-90px)/4)] xl:basis-[calc((100%-150px)/6)]"
            >
              <Card
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded p-8 transition-colors hover:bg-button-2 hover:text-white"
                )}
              >
                <Smartphone className="size-9" />

                <span className="font-16 mt-4 font-normal">
                  {category.name}
                </span>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute -top-[90px] right-12 block">
          <CarouselPrevious className="size-11 rounded-full bg-secondary-2" />

          <CarouselNext className="size-11 rounded-full bg-secondary-2" />
        </div>
      </Carousel>
    </div>
  );
}
