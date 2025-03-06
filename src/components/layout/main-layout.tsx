import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { usePostLoginActions } from "~/hooks/use-carts.hook";
import { useCategories } from "~/hooks/use-categories.hook";
import { useTransferWishlist } from "~/hooks/use-wishlists.hook";

interface MainLayoutProps {
  children: ReactNode;
  [key: string]: any;
}

const DynamicHeader = dynamic(
  () => import("~/components/header/fixed-header"),
  {
    ssr: false,
  }
);

const DynamicFooter = dynamic(() => import("~/components/footer"), {
  ssr: false,
});

const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();

  const { data: categories } = useCategories(router.locale || "en");

  useTransferWishlist(router.locale || "en");
  usePostLoginActions(router.locale || "en");

  return (
    <>
      <DynamicHeader initialCategories={categories || []} />
      {children}
      <DynamicFooter />
    </>
  );
};

export default MainLayout;
