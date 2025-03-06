import { memo } from "react";

import Header from "./header";
import TopHeader from "./top-header";

type FixedHeaderProps = {
  initialCategories: Category[];
};

const FixedHeader = ({ initialCategories }: FixedHeaderProps) => {
  return (
    <div className="fixed right-0 top-0 z-50 w-full bg-white shadow-sm">
      <TopHeader />

      <div className="border-b">
        <Header categories={initialCategories} />
      </div>
    </div>
  );
};

export default memo(FixedHeader);
