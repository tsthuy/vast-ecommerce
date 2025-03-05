import { StripeElementLocale } from "@stripe/stripe-js";

export const getStripeLocale = (locale: string): StripeElementLocale => {
  const supportedLocales: StripeElementLocale[] = ["en", "vi"];

  const baseLocale = locale.split("-")[0] as StripeElementLocale;

  if (supportedLocales.includes(baseLocale)) {
    return baseLocale;
  }

  return "en";
};
