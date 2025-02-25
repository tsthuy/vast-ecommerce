import Header from "./header";
import TopHeader from "./top-header";

type FixedHeaderProps = {
  initialCategories: CategoryClient[];
};

export const FixedHeader = ({ initialCategories }: FixedHeaderProps) => {
  return (
    <div className="fixed top-0 right-0 w-full z-50 bg-white shadow-sm">
      <TopHeader />

      <div className="border-b">
        <Header categories={initialCategories} />
      </div>
    </div>
  );
};
