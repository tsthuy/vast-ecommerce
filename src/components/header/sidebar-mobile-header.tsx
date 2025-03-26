import { memo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SidebarMobileHeaderProps {
  categories: Category[];
  toggleSidebar: () => void;
  navLinks: {
    href: string;
    label: string;
  }[];
  pathname: string;
}

const SidebarMobileHeader = memo(
  ({
    categories,
    toggleSidebar,
    navLinks,
    pathname,
  }: SidebarMobileHeaderProps) => {
    return (
      <div className="fixed inset-0 z-50 text-center lg:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar} />

        <div className="absolute right-0 top-0 h-full w-2/3 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-xl font-bold">Menu</span>

            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="size-6" />
            </Button>
          </div>

          <div className="border-t p-4">
            <form className="flex items-center">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-secondary-2 py-2 pl-3 pr-10 text-xs"
                />

                <Search className="absolute right-2.5 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Categories</h3>
                {categories && categories.length > 0 ? (
                  <CategoryList categories={categories} />
                ) : (
                  <p className="text-sm text-gray-500">
                    No categories available
                  </p>
                )}
              </div> */}
          </div>

          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-normal underline-offset-4 hover:underline ${
                  pathname === link.href && "underline underline-offset-4"
                }`}
                onClick={toggleSidebar}
              >
                {link.label}
              </Link>
            ))}

            <span className="text-center text-xl font-bold">Categories</span>

            <div className="flex flex-col items-center justify-center gap-3">
              {categories.map((link) => (
                <Link
                  key={link.id}
                  href="#"
                  className={`text-sm font-normal underline-offset-4 hover:underline`}
                  onClick={toggleSidebar}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    );
  }
);

SidebarMobileHeader.displayName = "SidebarMobileHeader";

export { SidebarMobileHeader };
