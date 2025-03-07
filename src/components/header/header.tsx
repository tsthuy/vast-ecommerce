"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useCarts } from "~/hooks/use-carts.hook";
import { useWishlists } from "~/hooks/use-wishlists.hook";

import { logout } from "~/libs/auth.lib";
import { cn } from "~/libs/utils";

import { customErrorMessage } from "~/utils/custom-error.util";
import { getGuestUserId } from "~/utils/get-user.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import DropDownHeader from "./drop-down-header";
import { SidebarMobileHeader } from "./sidebar-mobile-header";

interface HeaderProps {
  categories: Category[];
}

const Header = ({ categories }: HeaderProps) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const isInAccountPage = useMemo(
    () => router.pathname === "/account",
    [router.pathname]
  );

  const { t } = useTranslation("common");

  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { data: cartData } = useCarts(
    user?.uid || getGuestUserId(),
    router.locale || "en"
  );
  const { data: wishlistData } = useWishlists(
    user?.uid || getGuestUserId(),
    router.locale || "en"
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success(t("common.logout_successfully"));
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  }, [t]);

  const navLinks = [
    { href: "/", label: t("header.home") },
    { href: "/contact", label: t("header.contact") },
    { href: "/about", label: t("header.about") },
    { href: "/signup", label: t("header.signup") },
  ];

  return (
    <Container>
      <header className="pt-6 md:pt-10">
        <div className="flex h-16 w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-inter text-xl font-bold tracking-[0.03em] md:text-2xl">
              Exclusive
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-normal underline-offset-4 hover:underline",
                  pathname === link.href && "underline underline-offset-4",
                  user?.uid && link.href === "/signup" && "hidden"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <form className="hidden items-center md:flex">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t("header.search")}
                  className="w-[200px] bg-secondary-2 py-5 pl-3 pr-10 text-xs lg:w-[250px] xl:w-[300px]"
                />

                <Search className="absolute right-2.5 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-gray-400" />
              </div>
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="relative flex hover:bg-gray-200 [&_svg]:size-6"
              onClick={() => router.push("/wishlist")}
            >
              <Heart className="size-6" />

              {wishlistData && wishlistData.wishlist_items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistData.wishlist_items.length > 9
                    ? "9⁺"
                    : wishlistData.wishlist_items.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative flex hover:bg-gray-200 [&_svg]:size-6"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="size-6" />

              {cartData && cartData.cart_items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartData.cart_items.length > 9
                    ? "9⁺"
                    : cartData.cart_items.length}
                </span>
              )}
            </Button>

            {user ? (
              <DropDownHeader
                isInAccountPage={isInAccountPage}
                handleLogout={handleLogout}
              />
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden [&_svg]:size-6"
              onClick={toggleSidebar}
            >
              <Menu className="size-10" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <SidebarMobileHeader
          categories={categories}
          navLinks={navLinks}
          pathname={pathname}
          toggleSidebar={toggleSidebar}
        />
      )}
    </Container>
  );
};
export default React.memo(Header);
