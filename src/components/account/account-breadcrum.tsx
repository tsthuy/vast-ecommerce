import { useAuthStore } from "~/stores/auth.store";

import Breadcrumbs from "../breadcrumbs";
import { useTranslation } from "next-i18next";

export const AccountBreadcrumb: React.FC = () => {
  const { t } = useTranslation("account");
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-between pb-[80px]">
      <Breadcrumbs />

      <div className="pt-[80px] text-14 font-normal">
        <span>{t("welcome")} </span>

        <span className="text-button-2">{user?.displayName}</span>
      </div>
    </div>
  );
};
