import React, { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Slash } from "lucide-react";
import { toast } from "sonner";

import { customErrorMessage } from "~/utils/custom-error.util";

const Breadcrumbs = () => {
  console.log("Breadcrumbs");
  const router = useRouter();
  const pathnames = router.asPath
    .split("/")
    .filter((x) => x)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch (error) {
        toast.error(customErrorMessage(error));
        return segment;
      }
    });

  return (
    <nav className="flex items-start justify-start pt-8 lg:pt-[80px]">
      <ol className="text-muted-foreground flex items-center gap-3 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
          >
            Home
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={href}>
              <li>
                <Slash className="size-4" />
              </li>

              <li key={href}>
                {isLast ? (
                  <span className="text-14 font-normal hover:underline">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default memo(Breadcrumbs);
