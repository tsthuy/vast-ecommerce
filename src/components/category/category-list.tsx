import Link from "next/link";

import { cn } from "~/libs/utils";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <nav className="hidden w-full max-w-[240px] border-r pt-10 xl:block">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={"#"}
          className={cn(
            "block rounded-lg py-2 font-normal",
            "text-16 transition-colors duration-200 hover:text-button-2"
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
