import { createQueryKeys } from "@lukemorales/query-key-factory";

export const CARTS_KEY = createQueryKeys("carts", {
  all: (userId: string, locale: string) => [userId, locale],
  checkout: (locale: string, tempCartId: string) => [tempCartId, locale],
});
