// our-products.tsx
import { useState } from "react"
import { useTranslation } from "next-i18next"

import MyButton from "../custom/button"
import Paginator from "../paginator"
import ProductList from "../product/product-list"
import SectionHeading from "../section-heading"
import TitleHeading from "../title-heading"
import { NewProduct } from "~/types/product"

interface OurProductsProps {
  initialProductsExplore: NewProduct[]
}

export default function OurProducts({
  initialProductsExplore,
}: OurProductsProps) {
  const { t } = useTranslation("common")

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const limit = 8
  const totalProducts = initialProductsExplore && initialProductsExplore.length
  const totalPages = Math.ceil(totalProducts / limit)

  const handlePageChange = async (direction: "prev" | "next") => {
    if (isLoading) return

    const newPage =
      direction === "next"
        ? Math.min(currentPage + 1, totalPages)
        : Math.max(currentPage - 1, 1)

    if (newPage === currentPage) return

    setIsLoading(true)
    setCurrentPage(newPage)
    setIsLoading(false)
  }

  return (
    <>
      <SectionHeading section_key="our_products" />

      <div className="flex items-center justify-between gap-2">
        <TitleHeading heading_key="explore" />

        <Paginator
          onPrevious={() => handlePageChange("prev")}
          onNext={() => handlePageChange("next")}
        />
      </div>

      <ProductList
        products={initialProductsExplore}
        limit={limit}
        paginated={true}
        currentPage={currentPage}
      />

      <div className="flex justify-center pt-[60px]">
        <MyButton>{t("view_all_products")}</MyButton>
      </div>
    </>
  )
}
