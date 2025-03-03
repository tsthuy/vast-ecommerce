import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Footer } from "~/components";
import { Header, TopHeader } from "~/components/header";
import { WishList } from "~/components/wishlist/wishlist";

import { categoryApi } from "~/services";

export default function WishListPage({
  initialCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <TopHeader />

      <Header categories={initialCategories} />

      <WishList />

      <Footer />
    </>
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
        "section",
        "wishlist",
      ])),
      initialCategories,
    },
  };
};
