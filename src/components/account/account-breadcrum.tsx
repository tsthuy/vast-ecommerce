import { useAuthStore } from "~/stores/auth.store";

import Breadcrumbs from "../breadcrumbs";

export const AccountBreadcrumb: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-between pb-[80px]">
      <Breadcrumbs />

      <div className="pt-[80px] text-14 font-normal">
        <span>Welcome!</span>

        <span className="text-button-2">{user?.displayName}</span>
      </div>
    </div>
  );
};
