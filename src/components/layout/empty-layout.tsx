import React, { ReactNode } from "react";
import { useRouter } from "next/router";

import { usePostLoginActions } from "~/hooks/use-carts.hook";
import { useTransferWishlist } from "~/hooks/use-wishlists.hook";

interface EmptyLayoutProps {
  children: ReactNode;
  [key: string]: any;
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  const router = useRouter();

  useTransferWishlist(router.locale || "en");
  usePostLoginActions(router.locale || "en");

  return <>{children}</>;
};

export default EmptyLayout;
