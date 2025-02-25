import { CategoryGrid } from "../category"
import SectionHeading from "../section-heading"
import TitleHeading from "../title-heading"

interface CategorySectionProps {
  initialCategoriesGird: CategoryGridClient[]
}

export default function CategorySection({
  initialCategoriesGird,
}: CategorySectionProps) {
  return (
    <>
      <SectionHeading section_key="categories" />

      <div className="pb-[60px]">
        <TitleHeading heading_key="browse" />
      </div>

      <div className="border-b pb-[60px]">
        <CategoryGrid initialCategoriesGird={initialCategoriesGird} />
      </div>
    </>
  )
}
