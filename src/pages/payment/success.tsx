import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Success from "~/components/payment/success";

export default function SuccessPage() {
  return (
    <>
      <Success />
    </>
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
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
};
