import { useTranslation } from "next-i18next"

import resources from "~/types/resources"

interface TitleHeadingProps {
  heading_key: keyof typeof resources.heading
}

export default function TitleHeading({ heading_key }: TitleHeadingProps) {
  const { t } = useTranslation("heading")
  return (
    <h2 className="font-inter text-24 font-semibold tracking-[0.04em] md:text-36 max-w-[60%] xs:max-w-[100%] ">
      {t(heading_key)}
    </h2>
  )
}
