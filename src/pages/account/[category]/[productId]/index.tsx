import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import Breadcrumbs from "~/components/breadcrumbs";
import ProductDetails from "~/components/product/product-details";

import { categoryApi } from "~/services";

const DynamicTopHeader = dynamic(
  () => import("~/components/header/top-header"),
  { ssr: false }
);

const DynamicHeader = dynamic(() => import("~/components/header/header"), {
  ssr: false,
});

const DynamicFooter = dynamic(() => import("~/components/footer"), {
  ssr: false,
});

export default function ProductDetailsPage({
  initialCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <DynamicTopHeader />

      <DynamicHeader categories={initialCategories} />

      <Container>
        <div className="pb-[80px]">
          <Breadcrumbs />
        </div>
      </Container>

      <Container>
        <ProductDetails />
      </Container>

      <DynamicFooter />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (!locale) {
    return {
      notFound: true,
    };
  }

  const initialCategories = await categoryApi.getCategories(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "service",
        "common",
      ])),
      initialCategories,
    },
  };
};
