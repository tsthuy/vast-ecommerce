import { Container } from "~/components"

export default function FlashSaleTrickNeedFix() {
  return (
    <Container>
      <div className="flex w-full">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="group w-full animate-pulse overflow-hidden rounded-lg bg-white lg:w-[calc((100%-90px)/4)]"
          >
            <div className="relative">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-200">
                <div className="relative size-[70%] bg-gray-300"></div>
              </div>

              <div className="absolute right-3 top-3 flex flex-col gap-3">
                <div className="rounded-full bg-gray-300 p-2"></div>

                <div className="rounded-full bg-gray-300 p-2"></div>
              </div>

              <div className="absolute left-4 top-4 z-10 rounded bg-gray-300 px-3 py-1 text-12 font-normal"></div>

              <div className="absolute left-4 top-12 z-10 rounded bg-gray-300 px-3 py-1 text-12 font-normal"></div>
            </div>

            <div className="flex flex-col py-4">
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>

              <div className="mt-2 flex gap-3">
                <div className="flex gap-4">
                  <div className="h-4 w-1/4 rounded bg-gray-300"> </div>

                  <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="h-4 w-[50px] rounded bg-gray-300">1</div>

                  <div className="h-4 w-[50px] rounded bg-gray-300">2</div>
                </div>
              </div>

              <div className="flex gap-1 pt-2">
                <button className="h-5 w-6 rounded bg-gray-300"></button>

                <button className="h-5 w-6 rounded bg-gray-300"></button>

                <button className="h-5 w-6 rounded bg-gray-300"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
