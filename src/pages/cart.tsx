import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { Footer } from "~/components"
import { Header, TopHeader } from "~/components/header"

import { categoryApi } from "~/services"

import { Cart } from "./../components/cart/cart"

export default function CartPage({
  initialCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <TopHeader />

      <Header categories={initialCategories} />

      <Cart />

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  console.log("locale", locale)

  if (!locale) {
    return {
      props: {},
    }
  }

  const initialCategories = await categoryApi.getCategories(locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "cart",
      ])),
      initialCategories,
    },
  }
}
