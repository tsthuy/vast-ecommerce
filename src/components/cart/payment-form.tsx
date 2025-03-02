"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type React from "react";

import MyButton from "../custom/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import {
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface PaymentFormProps {
  tempCartId: string;
  onPayNow: () => Promise<boolean>;
}

export function PaymentForm({ onPayNow, tempCartId }: PaymentFormProps) {
  const { t } = useTranslation("cart");
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await onPayNow();

      if (!isValid) {
        setIsLoading(false);
        return;
      }
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${router.push(`/payment/success?tempCartId=${tempCartId}`)}`,
        },
      });

      if (error) {
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpressCheckout = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("complete_payment")}</CardTitle>

          <CardDescription>{t("choose_ur_preferred_payment")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="standard" className="w-full pb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">
                {t("standard_checkout")}
              </TabsTrigger>

              <TabsTrigger value="express">{t("express_checkout")}</TabsTrigger>
            </TabsList>

            <TabsContent value="standard">
              <PaymentElement
                options={{
                  layout: "tabs",
                  paymentMethodOrder: ["card", "apple_pay", "google_pay"],
                }}
              />
            </TabsContent>

            <TabsContent value="express">
              <div className="space-y-4">
                <ExpressCheckoutElement onConfirm={handleExpressCheckout} />
              </div>
            </TabsContent>
          </Tabs>

          <MyButton
            type="submit"
            className="w-full"
            disabled={isLoading || !stripe || !elements}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("pay_now")}
          </MyButton>
        </CardContent>
      </Card>
    </form>
  );
}
