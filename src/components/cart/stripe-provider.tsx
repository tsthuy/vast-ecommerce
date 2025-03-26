"use client";

import { memo, useMemo } from "react";
import { useRouter } from "next/router";
import type React from "react";

import { getStripeLocale } from "~/utils/get-stripe-locale.util";

import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret: string;
}

function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const router = useRouter();
  const locale = getStripeLocale(router.locale || "en");
  const promise = useMemo(() => stripePromise, []);

  const options = useMemo<StripeElementsOptions>(
    () => ({
      clientSecret,
      locale,
      appearance: {
        theme: "flat",
        variables: {
          colorPrimary: "#0F172A",
        },
      },
    }),
    [clientSecret, locale]
  );

  return (
    <Elements stripe={promise} options={options}>
      {children}
    </Elements>
  );
}

export default memo(StripeProvider);
