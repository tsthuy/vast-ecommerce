"use client";

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

export function StripeProvider({
  children,
  clientSecret,
}: StripeProviderProps) {
  const router = useRouter();
  const locale = getStripeLocale(router.locale || "en");

  const options: StripeElementsOptions = {
    clientSecret,
    locale,
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: "#0F172A",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
