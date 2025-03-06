import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignIn } from "~/components/sign-in/sign-in";

export default function SignInPage() {
  return (
    <div className="pt-[150px]">
      <SignIn />
    </div>
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
