import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CategoryList, PromoSlider } from "~/components/category";
import Container from "~/components/container";
import {
  BestSelling,
  CategorySection,
  FlashSales,
  Hero,
  NewArrival,
  OurProducts,
  ServiceFeatures,
} from "~/components/section";

import { categoryApi, productApi } from "~/services";

export default function Home({
  initialCategories,
  initialCategoriesGird,
  productsBestSales,
  productsExplore,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Container className="pt-[150px]">
        <div className="mx-auto grid grid-cols-1 gap-6 overflow-hidden xl:grid-cols-[240px_1fr]">
          <CategoryList categories={initialCategories} />

          <PromoSlider />
        </div>

        <FlashSales />
      </Container>

      <Container>
        <CategorySection initialCategoriesGird={initialCategoriesGird} />
      </Container>

      <Container>
        <BestSelling initialProducts={productsBestSales}></BestSelling>
      </Container>

      <Container className="pt-[150px]">
        <Hero />
      </Container>

      <Container>
        <OurProducts initialProductsExplore={productsExplore} />
      </Container>

      <Container>
        <NewArrival />
      </Container>

      <Container className="pb-[140px]">
        <ServiceFeatures />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (!locale) {
    return {
      props: {},
    };
  }

  const initialCategories = await categoryApi.getCategories(locale);
  const initialCategoriesGird = await categoryApi.getCategoriesGrid(locale);

  const productsBestSales = await productApi.getProductsBestSales(locale);
  const productsExplore = await productApi.getProductsExplore(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),

      initialCategories,
      productsBestSales,
      productsExplore,
      initialCategoriesGird,
    },
  };
};
