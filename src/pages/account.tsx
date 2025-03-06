import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "~/components";
import { Account } from "~/components/account/account";
import { AccountBreadcrumb } from "~/components/account/account-breadcrum";
import { ProtectedRoute } from "~/components/auth/protected-route";

export default function AccountPage() {
  return (
    <Container className="pt-[150px]">
      <AccountBreadcrumb />
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    </Container>
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
        "account",
        "common",
      ])),
    },
  };
};
