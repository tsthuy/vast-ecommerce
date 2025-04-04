import { memo, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { Slash } from "lucide-react";
import { toast } from "sonner";

import {
  useApplyCouponInCheckout,
  useCheckoutCart,
} from "~/hooks/use-carts.hook";

import { cn } from "~/libs/utils";

import { customErrorMessage } from "~/utils/custom-error.util";
import { getProductSlug } from "~/utils/get-product-slug.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import Loader8 from "../loader8";
import { NotFound } from "../not-found";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import CheckOutForm, { CheckOutFormHandle } from "./checkout-form";
import PaymentForm from "./payment-form";
import StripeProvider from "./stripe-provider";

export const CheckOut = memo(() => {
  const { t } = useTranslation("common");
  const { user } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const tempCartId = params.tempCartId as string;

  const checkoutFormRef = useRef<CheckOutFormHandle>(null);

  const { data: cart, isLoading: cartLoading } = useCheckoutCart(
    router.locale || "en",
    tempCartId
  );

  const applyCouponMutation = useApplyCouponInCheckout(
    router.locale || "en",
    tempCartId
  );

  const [couponCode, setCouponCode] = useState<string>("");

  const handleExternalValidation = useCallback(async () => {
    if (checkoutFormRef.current) {
      const isValid = await checkoutFormRef.current.triggerFormValidation();
      return isValid;
    }
  }, [checkoutFormRef]);

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cash">("cash");
  const [clientSecret, setClientSecret] = useState<string>();

  const handlePaymentMethodChange = async (value: string) => {
    const totalAmount = parseFloat(calculateTotalPrice);
    if (value === "bank") {
      try {
        const response = await axios.post("/api/create-payment-intent", {
          amount: totalAmount,
          userId: user?.uid,
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        toast.error(customErrorMessage(error));
      }
    }
    setPaymentMethod(value as "bank" | "cash");
  };

  const calculateTotalPrice = useMemo(() => {
    let totalPrice = cart?.meta?.total_price || 0;
    if (cart?.applied_coupon) {
      if (cart.applied_coupon.type === "fixed") {
        totalPrice -= cart.applied_coupon.value;
      } else {
        totalPrice -= (totalPrice * cart.applied_coupon.value) / 100;
      }
    }
    totalPrice += 10;
    return totalPrice.toFixed(2);
  }, [cart]);

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast("Please enter a coupon code.");
      return;
    }

    applyCouponMutation.mutate({
      couponCode,
      totalPrice: cart?.meta?.total_price || 0,
    });

    setCouponCode("");
  };

  const handlePayNow = useCallback(async () => {
    const isValid = await handleExternalValidation();
    if (!isValid) {
      toast.error("Form validation failed. Please check the fields.");
      return false;
    }

    return true;
  }, [handleExternalValidation]);

  const handlePayOnDelivery = async () => {
    const isValid = await handleExternalValidation();
    if (!isValid) {
      toast.error("Form validation failed. Please check the fields.");
      return;
    }
    router.push(`/payment/success?tempCartId=${tempCartId}`);
  };

  if (!cartLoading && !cart) {
    return <NotFound />;
  }

  return (
    <Container>
      <nav className="flex items-start justify-start py-[80px]">
        <ol className="text-muted-foreground flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
            >
              Account
            </Link>
          </li>

          <li>
            <Slash className="size-4" />
          </li>

          <li>
            <Link
              href="/"
              className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
            >
              MyAccount
            </Link>
          </li>

          <li>
            <Slash className="size-4" />
          </li>

          <li>
            <Link
              href="/"
              className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
            >
              Product
            </Link>
          </li>

          <li>
            <Slash className="size-4" />
          </li>

          <li>
            <Link
              href="/"
              className="flex items-center text-14 font-normal opacity-50 transition-colors hover:text-foreground hover:underline"
            >
              View Cart
            </Link>
          </li>

          <li>
            <Slash className="size-4" />
          </li>

          <li className="text-14 font-normal hover:underline">CheckOut</li>
        </ol>
      </nav>

      <h3 className="font-inter text-36 font-medium">
        {t("cart.billings_details")}
      </h3>

      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between lg:items-start">
        <CheckOutForm ref={checkoutFormRef} />

        <div className="w-full py-10 text-16 font-normal md:w-[50%] lg:pl-8">
          <div className="bg-muted rounded-lg p-6">
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {cart &&
                  cart.cart_items.map((item) => (
                    <div
                      key={item.cart_item_id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div className="flex flex-col">
                          <Link
                            href={{
                              pathname: "/account/[categoryName]/[productSlug]",
                              query: {
                                categoryName:
                                  item.product.category?.name.toLowerCase(),
                                productSlug: getProductSlug(
                                  item.product_id,
                                  item.product.name
                                ),
                              },
                            }}
                          >
                            <span className="hover:text-button-1">
                              {item.product.name} (x{item.quantity})
                            </span>
                          </Link>

                          {Object.entries(item.variant).map(([key, value]) => (
                            <span
                              key={key}
                              className="text-muted-foreground text-sm"
                            >
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between border-b border-black pb-[16px]">
                  <span className="">{t("cart.subtotal")}:</span>

                  <span>${cart && cart.meta.total_price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-b border-black py-[16px]">
                  <span>{t("cart.shipping")}:</span>

                  <span className="">$10.00</span>
                </div>
                {cart && cart.applied_coupon && (
                  <div className="flex justify-between">
                    <span>
                      {cart.applied_coupon.type === "fixed"
                        ? "Discount:"
                        : `Discount (${cart.applied_coupon.value}%):`}
                    </span>
                    <span>
                      -$
                      {cart.applied_coupon.type === "fixed"
                        ? cart.applied_coupon.value
                        : (
                            (cart.meta.total_price *
                              cart.applied_coupon.value) /
                            100
                          ).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <span>{t("cart.total")}:</span>

                  <span className="font-inter font-bold">
                    ${calculateTotalPrice}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="bank" id="bank" />

                      <Label htmlFor="bank">{t("cart.bank")}</Label>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                      {["bkash", "visa", "mastercard", "discover"].map(
                        (card) => (
                          <div
                            key={card}
                            className="h-5 w-8 rounded bg-gray-200"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem className="" value="cash" id="cash" />

                    <Label htmlFor="cash">{t("cart.cash_on_delivery")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Coupon Code */}
              <div className="flex flex-col gap-2 pt-4 lg:flex-row">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="py-6"
                  placeholder={t("cart.coupon_code")}
                />

                <MyButton
                  onClick={handleApplyCoupon}
                  className="max-w-fit pt-2"
                  disabled={applyCouponMutation.isPending}
                >
                  {applyCouponMutation.isPending && <Loader8 />}
                  {t("cart.apply_coupon")}
                </MyButton>
              </div>

              {/* Stripe Payment Element */}
              {paymentMethod === "bank" && clientSecret && (
                <div className="pt-4">
                  <StripeProvider clientSecret={clientSecret}>
                    <PaymentForm
                      tempCartId={tempCartId}
                      onPayNow={handlePayNow}
                    />
                  </StripeProvider>
                </div>
              )}

              {/* Place Order Button */}
              <div className="pt-2">
                <MyButton
                  onClick={handlePayOnDelivery}
                  className={cn(
                    paymentMethod === "bank" && "hidden",
                    "w-full xl:w-fit"
                  )}
                >
                  {t("cart.place_order")}
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
});
CheckOut.displayName = "CheckOut";
