import Collections from "../collections"
import SectionHeading from "../section-heading"
import TitleHeading from "../title-heading"

export default function NewArrival() {
  return (
    <>
      <SectionHeading section_key="featured" />

      <TitleHeading heading_key="arrivals" />

      <Collections />
    </>
  )
}
