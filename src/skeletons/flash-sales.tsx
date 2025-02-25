import * as React from "react"

import { Skeleton } from "~/components/ui/skeleton"

export default function FlashSalesSkeletonNeedFix() {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between pb-[40px]">
          <div className="flex items-center justify-around gap-6 md:gap-20">
            <Skeleton className="h-8 w-[250px] rounded-lg bg-red-700 pt-20" />{" "}

            {/* TitleHeading Skeleton */}
            <Skeleton className="h-8 w-48 rounded-lg" />{" "}

            {/* CountTimer Skeleton */}
          </div>
        </div>

        <div className="w-full">
          <div className="no-scrollbar w-full">
            <div className="-ml-4 flex flex-wrap justify-center lg:gap-[30px]">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="basis-[calc((100%-90px)/2)] lg:basis-[calc((100%-90px)/4)]"
                >
                  <div className="border-red relative overflow-hidden rounded-lg border bg-white lg:min-w-[calc((100%-90px)/4)]">
                    {/* Product Image Skeleton */}
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-text-secondary">
                      <Skeleton className="size-[70%] rounded-lg" />
                    </div>

                    {/* Icons Overlay Skeleton */}
                    <div className="absolute -top-[60px] right-0 flex w-[240px] gap-3 border bg-rose-300">
                      <Skeleton className="size-10 rounded-full" />{" "}

                      <Skeleton className="size-10 rounded-full" />
                    </div>

                    {/* Product Details Skeleton */}
                    <div className="flex flex-col py-4">
                      <Skeleton className="h-6 w-3/4 rounded-lg border" />{" "}

                      {/* Product Name Skeleton */}
                      <div className="mt-2 flex flex-col gap-3">
                        <div className="flex gap-4 [&>div]:bg-red-700">
                          <Skeleton className="h-6 w-16 rounded-lg bg-button-2" />

                          {"  "}

                          {/* Discount Price Skeleton */}
                          <Skeleton className="h-6 w-16 rounded-lg bg-pink-700" />{" "}

                          {/* Original Price Skeleton */}
                        </div>

                        <div className="flex items-center gap-1">
                          <Skeleton className="h-4 w-20 rounded-lg" />{" "}

                          {/* Rating Skeleton */}
                        </div>
                      </div>

                      {/* Color Options Skeleton */}
                      <div className="flex gap-1 pt-2">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="size-6 rounded-full" />
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
  )
}
