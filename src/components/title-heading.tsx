import { useTranslation } from "next-i18next";

import resources from "~/utils/resources.util";

interface TitleHeadingProps {
  heading_key: keyof typeof resources.heading;
}

export default function TitleHeading({ heading_key }: TitleHeadingProps) {
  const { t } = useTranslation("heading");
  return (
    <h2 className="max-w-[60%] font-inter text-24 font-semibold tracking-[0.04em] xs:max-w-[100%] md:text-36">
      {t(heading_key)}
    </h2>
  );
}
