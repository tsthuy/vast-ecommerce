"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Star,
  UserRoundPen,
  X,
  XCircle,
} from "lucide-react";

import { useCarts } from "~/hooks/use-carts.hook";
import { useWishlists } from "~/hooks/use-wishlists.hook";

import { logout } from "~/libs/auth.lib";

import { useCartStore, useWishlistStore } from "~/stores";
import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

interface HeaderProps {
  categories: CategoryClient[];
}

export default function Header({ categories }: HeaderProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const { t } = useTranslation(["header", "common"]);

  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { cartItems, setCartItems } = useCartStore();
  const { wishlistItems, setWishlistItems } = useWishlistStore();

  const { data: cartData } = useCarts(user?.uid || "", router.locale || "en");
  const { data: wishlistData } = useWishlists(user?.uid || "", router.locale || "en");

  useEffect(() => {
    if (cartData?.cart_items) {
      setCartItems(cartData.cart_items);
    }
  }, [cartData, setCartItems]);

  useEffect(() => {
    if (wishlistData?.wishlist_items) {
      setWishlistItems(wishlistData.wishlist_items);
    }
  }, [wishlistData, setWishlistItems]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/contact", label: t("contact") },
    { href: "/about", label: t("about") },
    { href: "/signup", label: t("signup") },
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
                className={`text-sm font-normal underline-offset-4 hover:underline ${
                  pathname === link.href && "underline underline-offset-4"
                }`}
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
                  placeholder={t("search")}
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

              { wishlistItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistItems.length}
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

              {cartItems.length > 0 &&  (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartItems.length}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex hover:bg-gray-200 [&_svg]:size-6"
                  >
                    <UserRoundPen className="size-8" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 backdrop-blur-3xl bg-transparent/50 border-none pt-[18px] pb-[10px] pl-[20px] pr-[12px] text-white space-y-2"
                >
                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <button>
                      <UserRoundPen className="size-6" />
                    </button>

                    <Link href={"/account"} className="text-14 font-normal">
                      {t("common:manage_my_account")}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <button>
                      <Package className="size-6" />
                    </button>

                    <Link href={""} className="text-14 font-normal">
                      {t("common:my_order")}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <button>
                      <XCircle className="size-6" />
                    </button>

                    <Link href={""} className="text-14 font-normal">
                      {t("common:my_cancellation")}
                      
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <button>
                      <Star className="size-6" />
                    </button>

                    <Link href={""} className="text-14 font-normal">
                      {t("common:my_reviews")}
                      
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-4 cursor-pointer">
                    <button>
                      <LogOut className="size-6" />
                    </button>

                    <Link
                      href={""}
                      className="text-14 font-normal"
                      onClick={logout}
                    >
                      {t("common:logout")}
                      
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        <div className="fixed inset-0 z-50 lg:hidden text-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleSidebar}
          />

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
                    href={link.href}
                    className={`text-sm font-normal underline-offset-4 hover:underline ${
                      pathname === link.href && "underline underline-offset-4"
                    }`}
                    onClick={toggleSidebar}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </Container>
  );
}
