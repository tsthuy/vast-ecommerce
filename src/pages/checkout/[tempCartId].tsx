import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CheckOut } from "~/components/cart/checkout";

export default function CheckOutPage() {
  return (
    <>
      <div className="pt-[150px]">
        <CheckOut />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
