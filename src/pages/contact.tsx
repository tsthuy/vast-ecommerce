import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import Breadcrumbs from "~/components/breadcrumbs";
import { Contact } from "~/components/contact/contact";

export default function ContactPage() {
  return (
    <>
      <Container className="pt-[150px]">
        <Breadcrumbs />

        <Contact />
      </Container>
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
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "contact",
        "common",
      ])),
    },
  };
};
