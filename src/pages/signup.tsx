import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignUp } from "~/components/sign-up/signup";

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

export default function SignUpPage({
  initialCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <DynamicTopHeader />

      <DynamicHeader categories={initialCategories} />

      <SignUp />

      <DynamicFooter />
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
      ...(await serverSideTranslations(locale, ["header", "footer", "auth"])),
      initialCategories,
    },
    revalidate: 60,
  };
};
