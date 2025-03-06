import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ProtectedRoute } from "~/components/auth/protected-route";

import { Cart } from "./../components/cart/cart";

export default function CartPage() {
  return (
    <div className="pt-[150px]">
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return {
      props: {},
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "cart",
      ])),
    },
  };
};
