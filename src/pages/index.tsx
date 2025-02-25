import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CategoryList, PromoSlider } from "~/components/category";
import UpButton from "~/components/category/up-button";
import Container from "~/components/container";
import Footer from "~/components/footer";
import { FixedHeader } from "~/components/header/fixed-header";
import {
  BestSelling,
  CategorySection,
  Hero,
  NewArrival,
  ServiceFeatures,
} from "~/components/section";

import { categoryApi, productApi } from "~/services";

import { new_products_schema } from "~/mocks/data/new_product_schema";

export default function Home({
  initialCategories,
  initialCategoriesGird,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <FixedHeader initialCategories={initialCategories} />

      <Container className="pt-[150px]">
        <div className="mx-auto grid grid-cols-1 gap-6 overflow-hidden xl:grid-cols-[240px_1fr]">
          <CategoryList categories={initialCategories} />

          <PromoSlider />
        </div>

        {/* <FlashSales /> */}
      </Container>

      <Container>
        <CategorySection initialCategoriesGird={initialCategoriesGird} />
      </Container>

      <Container>
        <BestSelling initialProducts={new_products_schema}></BestSelling>
      </Container>

      <Container className="pt-[150px]">
        <Hero />
      </Container>

      {/* <Container>
        <OurProducts initialProductsExplore={initialProductsExplore} />
      </Container> */}

      <Container>
        <NewArrival />
      </Container>

      <Container>
        <ServiceFeatures />
      </Container>

      <div className="pt-[140px]">
        <UpButton />

        <Footer />
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
  const initialCategoriesGird = await categoryApi.getCategoriesGrid(locale);

  const initialProducts = await productApi.getProducts();
  const initialProductsExplore = await productApi.getProductsExplore();

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
      initialProducts,
      initialProductsExplore,
      initialCategoriesGird,
    },
  };
};
