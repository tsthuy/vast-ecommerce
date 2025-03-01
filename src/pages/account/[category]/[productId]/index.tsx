import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import Breadcrumbs from "~/components/breadcrumbs";
import ProductDetails from "~/components/product/product-details";

import { categoryApi, productApi } from "~/services";

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
  initialProduct,
  initialImages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <ProductDetails product={initialProduct} images={initialImages} />
      </Container>

      <DynamicFooter />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  if (!locale || !params) {
    return {
      notFound: true,
    };
  }

  const { productId } = params;

  const productData = await productApi.getProductById(productId as string);

  if (!productData || !productData.product) {
    return {
      notFound: true,
    };
  }

  const { product: initialProduct, images: initialImages } = productData;

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
      initialProduct,
      initialImages,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await categoryApi.getCategoriesGrid("en");
  const allProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await productApi.getProductsByCategory(category.id);
      if (category.id === "6") {
      }
      return products.map((product) => ({
        category: category.name,
        productId: product.id.toString(),
      }));
    })
  );

  const productPaths = allProducts.flat();

  const paths = productPaths.map(({ category, productId }) => ({
    params: { category, productId },
    locale: "en",
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
