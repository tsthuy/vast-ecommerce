import * as React from "react";
import { memo } from "react";
import { Star } from "lucide-react";

import { Skeleton } from "~/components/ui/skeleton";

export default memo(function FlashSalesSkeleton() {
  const [numberOfItems, setNumberOfItems] = React.useState(1);

  React.useEffect(() => {
    const updateNumberOfItems = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setNumberOfItems(4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setNumberOfItems(2);
      } else {
        setNumberOfItems(1);
      }
    };

    updateNumberOfItems();

    window.addEventListener("resize", updateNumberOfItems);

    return () => {
      window.removeEventListener("resize", updateNumberOfItems);
    };
  }, []);

  return (
    <>
      <div className="w-full pt-[80px]">
        <div className="flex items-center gap-3 pb-4">
          <Skeleton className="h-10 w-[30px]" />

          <Skeleton className="h-8 w-[100px]" />
        </div>

        <div className="flex justify-center gap-3 pb-[50px] pt-[16px] lg:justify-between">
          <div className="flex flex-col items-center justify-end gap-6 md:gap-20 lg:flex-row lg:justify-normal">
            <Skeleton className="h-10 w-[250px] rounded-lg" />

            {/* TitleHeading Skeleton */}
            <Skeleton className="h-10 w-72 rounded-lg" />

            {/* CountTimer Skeleton */}
          </div>

          <div className="hidden gap-2 sm:flex">
            <Skeleton className="size-10 rounded-full" />

            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>

        <div className="w-full overflow-visible">
          <div className="no-scrollbar w-full">
            <div className="-ml-4 flex justify-center lg:gap-[30px]">
              {[...Array(numberOfItems)].map((_, index) => (
                <div
                  key={index}
                  className="relative pl-4 sm:basis-[calc((100%-90px)/2)] lg:basis-[calc((100%-90px)/4)]"
                >
                  <div className="border-red relative overflow-hidden rounded-lg border bg-white lg:min-w-[calc((100%-90px)/4)]">
                    {/* Product Image Skeleton */}
                    <div className="flex aspect-square min-h-[250px] items-center justify-center overflow-hidden">
                      <Skeleton className="size-[70%] rounded-lg" />
                    </div>

                    {/* Icons Overlay Skeleton */}
                    <div className="absolute right-1 top-2 flex flex-col gap-2">
                      <Skeleton className="size-8 rounded-full" />

                      <Skeleton className="size-8 rounded-full" />
                    </div>

                    <div className="absolute left-1 top-2 flex flex-col gap-2">
                      <Skeleton className="h-6 w-10" />
                    </div>

                    {/* Product Details Skeleton */}
                    <div className="flex flex-col px-4">
                      <Skeleton className="h-6 w-3/4 rounded-lg border" />{" "}
                      {/* Product Name Skeleton */}
                      <div className="mt-2 flex flex-col gap-3">
                        <div className="flex gap-4">
                          <Skeleton className="h-6 w-16 rounded-lg" />
                          {/* Discount Price Skeleton */}
                          <Skeleton className="h-6 w-16 rounded-lg" />{" "}
                          {/* Original Price Skeleton */}
                        </div>
                      </div>
                      {/* Color Options Skeleton */}
                      <div className="flex pt-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`size-5 animate-pulse fill-gray-200 text-gray-200`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
