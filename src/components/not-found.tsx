import Link from "next/link"
import { Slash } from "lucide-react"

import MyButton from "./custom/button"
import Container from "./container"

export const NotFound = () => {
  return (
    <Container className="py-20 lg:pb-[140px] lg:pt-[80px]">
      <div className="flex h-full flex-col">
        <nav className="flex items-start justify-start">
          <ol className="text-muted-foreground flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
              >
                Home
              </Link>
            </li>

            <li>
              <Slash className="size-4" />
            </li>

            <li className="text-14 font-normal hover:underline">404 Error</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="space-y-4 text-center">
          <h1 className="pt-[20px] font-inter text-32 font-medium tracking-[0.03em] sm:text-48 md:text-8xl lg:pt-[140px] lg:text-[110px]">
            404 Not Found
          </h1>

          <p className="py-[20px] text-16 font-normal lg:pb-[80px] lg:pt-[40px]">
            Your visited page not found. You may go home page.
          </p>

          <MyButton>
            <Link href="/">Back to home page</Link>
          </MyButton>
        </div>
      </div>
    </Container>
  )
}
