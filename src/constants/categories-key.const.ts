import { createQueryKeys } from "@lukemorales/query-key-factory";

export const CATEGORIES_KEY = createQueryKeys("categories", {
  all: (locale: string) => [locale],
});
