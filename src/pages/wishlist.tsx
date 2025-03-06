import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { WishList } from "~/components/wishlist/wishlist";

export default function WishListPage() {
  return (
    <div className="pt-[150px]">
      <WishList />
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
  };
};
