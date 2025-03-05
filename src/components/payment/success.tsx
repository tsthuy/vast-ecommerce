import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

import { useCompleteCheckout } from "~/hooks/use-carts.hook";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../../components/container";
import { Button } from "../../components/ui/button";

export default function Success() {
  const { t } = useTranslation("payment");
  const router = useRouter();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const tempCartId = searchParams.get("tempCartId");

  const completeCheckoutMutation = useCompleteCheckout(
    user?.uid || "",
    tempCartId || ""
  );

  useEffect(() => {
    if (tempCartId) {
      completeCheckoutMutation.mutate(true, {
        onSuccess: () => {
          toast.success("Order created successfully!");
        },
        onError: (error) => {
          toast.error("Failed to create order: " + customErrorMessage(error));
          router.push("/cart");
        },
      });
    } else {
      toast.error("Invalid checkout session.");
      router.push("/cart");
    }
  }, [tempCartId, completeCheckoutMutation, router]);

  return (
    <Container className="py-20 text-center">
      <h2 className="mb-4 font-inter text-36 font-semibold text-button-2">
        {t("payment_successful")}
      </h2>
      <p className="mb-6">{t("thank_u")}</p>
      <Button asChild className="p-6 hover:bg-button-2">
        <Link href="/">{t("continue_shopping")}</Link>
      </Button>
    </Container>
  );
}
