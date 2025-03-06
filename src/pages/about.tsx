import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import { About } from "~/components/about/about";
import Breadcrumbs from "~/components/breadcrumbs";

export default function AboutPage() {
  return (
    <>
      <Container className="pt-[150px]">
        <Breadcrumbs />
      </Container>

      <About />
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
  };
};
