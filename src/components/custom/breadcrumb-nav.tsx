import { usePathname } from "next/navigation"
import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()

  const segments = pathname.split("/").filter((segment) => segment !== "")

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1

          return (
            <BreadcrumbItem key={href}>
              <div className="text-muted-foreground mx-2">
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </div>

              {isLast ? (
                <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>
                  {formatSegment(segment)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
