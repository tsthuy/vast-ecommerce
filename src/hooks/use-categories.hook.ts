import { QUERY_KEYS } from "~/constants";

import { categoryApi } from "~/services";

import { useQuery } from "@tanstack/react-query";

export function useCategories(locale: string) {
  return useQuery({
    ...QUERY_KEYS.categories.all(locale),
    queryFn: () => categoryApi.getCategories(locale),
  });
}
