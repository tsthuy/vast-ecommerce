import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignUp } from "~/components/sign-up/signup";

export default function SignUpPage() {
  return (
    <div className="pt-[150px]">
      <SignUp />
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
