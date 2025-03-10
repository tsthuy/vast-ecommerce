import { memo } from "react";

export default memo(function PromoSkeleton() {
  return (
    <div className="pt-10">
      <div className="relative w-full">
        <div className="flex min-h-[368px] animate-pulse flex-col justify-evenly overflow-hidden bg-black py-2">
          <div className="flex flex-col justify-center gap-2 xs:flex-row xs:justify-around">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center gap-4 pb-4 xs:flex-row">
                <div className="mb-4 size-12 rounded-full bg-gray-200"></div>

                <div className="mb-4 h-8 w-28 rounded bg-gray-200"></div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-5 w-[50%] rounded bg-gray-200 xs:h-10 xs:w-full"></div>

                <div className="h-0 w-[50%] rounded bg-gray-200 xs:h-10 xs:w-full"></div>
              </div>

              <div className="flex justify-center pt-8 xs:justify-normal">
                <div className="h-10 w-24 rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="flex justify-center pb-6">
              <div className="mt-4 min-h-[200px] w-52 rounded bg-gray-200 sm:w-80"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-[43%] flex animate-pulse justify-center gap-2 xs:left-[51%]">
          <div className="size-2 rounded-full bg-gray-200 p-0"></div>

          <div className="size-2 rounded-full bg-gray-200 p-0"></div>

          <div className="size-2 rounded-full bg-gray-200 p-0"></div>

          <div className="size-2 rounded-full bg-gray-200 p-0"></div>
        </div>
      </div>
    </div>
  );
});
