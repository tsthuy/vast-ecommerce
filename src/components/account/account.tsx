import { memo } from "react";

import AccountContent from "./account-content";
import AccountSidebar from "./account-sidebar";

export const Account: React.FC = memo(() => {
  return (
    <div className="flex flex-col gap-4 pb-[140px] sm:flex-row">
      <AccountSidebar />

      <AccountContent />
    </div>
  );
});
Account.displayName = "Account";
