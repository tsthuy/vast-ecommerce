import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCompleteCheckout } from "~/hooks/use-carts.hook";
import Container from "../../components/container";
import { Button } from "../../components/ui/button";
import { useAuthStore } from "~/stores/auth.store";
import Link from "next/link";
import { useTranslation } from "next-i18next";

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
          toast.error("Failed to create order: " + error.message);
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
