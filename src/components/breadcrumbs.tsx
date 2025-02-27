import Link from "next/link";
import { useRouter } from "next/router";
import { Slash } from "lucide-react"; 

const Breadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x); 

  return (
    <nav className="flex items-start justify-start pt-[80px]">
      <ol className="text-muted-foreground flex items-center gap-3 text-sm">
        {/* Home link (always present) */}
        <li>
          <Link
            href="/"
            className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
          >
            Home
          </Link>
        </li>

        {/* Dynamically generate breadcrumb items */}
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const href = `/${pathnames.slice(0, index + 1).join("/")}`; 

          return (
            <>
              {/* Separator */}
              <li>
                <Slash className="size-4" />
              </li>

              {/* Breadcrumb item */}
              <li key={href}>
                {isLast ? (
                  <span className="text-14 font-normal hover:underline">
                    {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize */}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize */}
                  </Link>
                )}
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;