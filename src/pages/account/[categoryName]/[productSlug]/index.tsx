import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import Breadcrumbs from "~/components/breadcrumbs";
import ProductDetails from "~/components/product/product-details";
import { RelatedProduct } from "~/components/product/related-product";

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
        <ProductDetails product={initialProduct} images={initialImages} />

        <RelatedProduct
          productId={initialProduct.id}
          categoryId={initialProduct.category.id}
        />
      </Container>

      <DynamicFooter />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  if (!locale || !params) {
    return {
      notFound: true,
    };
  }

  const { productSlug } = params;

  const productSlugString = productSlug as string;
  const productIdMatch = productSlugString?.match(/-(\d+)$/);

  if (!productIdMatch) {
    return {
      notFound: true,
    };
  }
  const productId = productIdMatch[1];

  const productData = await productApi.getProductById(locale, productId);

  if (!productData || !productData.localizedProduct) {
    return {
      notFound: true,
    };
  }

  const { localizedProduct: initialProduct, images: initialImages } =
    productData;

  const initialCategories = await categoryApi.getCategories(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "service",
        "common",
        "details",
        "section",
      ])),
      initialCategories,
      initialProduct,
      initialImages,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const categories = await categoryApi.getCategoriesGrid("en");
//   const allProducts = await Promise.all(
//     categories.map(async (category) => {
//       const products = await productApi.getProductsByCategory(category.id);

//       return products.map((product) => ({
//         categoryName: category.name.toLowerCase().replace(/ /g, "-"),
//         productSlug: `${product.name.toLowerCase().trim().replace(/\s+/g, "-")}-${product.id}`,
//         productId: product.id.toString(),
//       }));
//     })
//   );

//   const productPaths = allProducts.flat();
//   const locales = ["en", "vi"];
//   const paths = productPaths.flatMap(({ categoryName, productSlug }) =>
//     locales.map((locale) => ({
//       params: { categoryName, productSlug },
//       locale,
//     }))
//   );

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
