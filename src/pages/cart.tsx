import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Footer } from "~/components";
import { ProtectedRoute } from "~/components/auth/protected-route";
import { Header, TopHeader } from "~/components/header";

import { categoryApi } from "~/services";

import { Cart } from "./../components/cart/cart";

export default function CartPage({
  initialCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ProtectedRoute>
      <TopHeader />

      <Header categories={initialCategories} />

      <Cart />

      <Footer />
    </ProtectedRoute>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return {
      props: {},
    };
  }

  const initialCategories = await categoryApi.getCategories(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "cart",
      ])),
      initialCategories,
    },
  };
};
