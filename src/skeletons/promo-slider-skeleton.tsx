export default function PromoSliderSkeletonNeedFix() {
  return (
    <div className="">
      what
      <div className="pt-10">
        <div className="flex animate-pulse flex-col gap-6">
          <div className="flex min-h-[344px] justify-evenly overflow-hidden rounded-md bg-gray-800">
            <div className="flex flex-col justify-center pl-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="size-12 rounded-full bg-gray-600" />

                <div className="h-6 w-32 rounded-md bg-gray-600" />
              </div>

              <div className="py-5">
                <div className="h-10 w-64 rounded-md bg-gray-600 md:w-96" />
              </div>

              <div className="h-4 w-24 rounded-md bg-gray-600" />
            </div>

            <div className="flex justify-center">
              <div className="h-[352px] w-[496px] rounded-md bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="size-2 rounded-full bg-gray-600" />
          ))}
        </div>
      </div>
    </div>
  )
}
