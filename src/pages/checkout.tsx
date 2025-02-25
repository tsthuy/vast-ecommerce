import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CheckOut } from "~/components/cart/checkout";
import { FixedHeader } from "~/components/header/fixed-header";

import { categoryApi } from "~/services";

export default function CheckOutPage({
  initialCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <FixedHeader initialCategories={initialCategories} />

      <div className="pt-[150px]">
        <CheckOut />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  console.log("locale", locale);

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
        "service",
        "promo",
        "hero",
        "collection",
        "section",
        "heading",
      ])),

      initialCategories,
    },
  };
};
