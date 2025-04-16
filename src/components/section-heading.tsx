import { memo } from "react";
import { useTranslation } from "next-i18next";

import Resources from "../utils/resources.util";

interface SectionHeadingProps {
  section_key: keyof typeof Resources.common.section;
}

export default memo(function SectionHeading({
  section_key,
}: SectionHeadingProps) {
  const { t } = useTranslation("common");
  return (
    <section className="pb-5 pt-20">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-[40px] w-[20px] rounded bg-button-2"></div>

            <p className="font-medium text-red-500">
              {t(`section.${section_key}`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
