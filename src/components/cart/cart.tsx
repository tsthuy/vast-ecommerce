import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { toast } from "sonner";

import {
  useCarts,
  useCreateCheckoutCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "~/hooks/use-carts.hook";

import { cn } from "~/libs/utils";

import { couponApi } from "~/services/coupons.service";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import Breadcrumbs from "../breadcrumbs";
import Container from "../container";
import MyButton from "../custom/button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Spinner from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const Cart = () => {
  const router = useRouter();
  const { t } = useTranslation(["common", "cart"]);
  const { user } = useAuthStore();

  const isLoading = useAuthStore((state) => state.isLoading);

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon>();

  const { data: cart } = useCarts(user?.uid || "", router.locale || "");
  const createCheckoutCartMutation = useCreateCheckoutCart(
    user?.uid || "",
    router.locale || ""
  );
  const updateCartMutation = useUpdateCartItemQuantity(
    user?.uid || "",
    router.locale || ""
  );

  const removeFromCartMutation = useRemoveFromCart(
    user?.uid || "",
    router.locale || ""
  );

  const handleCartUpdate = (cartItemId: string, quantity: number) => {
    updateCartMutation.mutate({ cartItemId, quantity });
  };

  const handleQuantityChange = async (
    cart_item_id: string,
    newQuantity: number
  ) => {
    if (newQuantity > 0) {
      try {
        handleCartUpdate(cart_item_id, newQuantity);
      } catch (error) {
        toast.error(customErrorMessage(error));
      }
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast("Please enter a coupon code.");
      return;
    }

    try {
      if (cart && cart.meta.total_price) {
        const coupon = await couponApi.applyCoupon(
          couponCode,
          cart.meta.total_price || 0
        );
        setAppliedCoupon(coupon);
        toast("Coupon applied successfully.");
        setCouponCode("");
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  const handleProceedToCheckout = async () => {
    if (!user?.uid) {
      toast.error(t("common:please_login"));
      return;
    }

    if (!cart || cart.cart_items.length === 0) {
      toast.error(t("cart:no_item"));
      return;
    }

    try {
      const { temp_cart_id } = await createCheckoutCartMutation.mutateAsync({
        cartItems: cart.cart_items,
        appliedCoupon: appliedCoupon,
      });
      router.push(`/checkout/${temp_cart_id}`);
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  const calculateTotalPrice = () => {
    if (!cart) return 0;

    let totalPrice = cart.meta.total_price;

    if (appliedCoupon) {
      if (appliedCoupon.type === "fixed") {
        totalPrice -= appliedCoupon.value;
      } else if (appliedCoupon.type === "percentage") {
        totalPrice -= (totalPrice * appliedCoupon.value) / 100;
      }
    }
    totalPrice += 10;
    return totalPrice.toFixed(2);
  };
  return (
    <Container>
      <div className="pb-[40px]">
        <Breadcrumbs />
      </div>

      {cart?.cart_items.length === 0 && !isLoading ? (
        <div className="py-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold"> {t("cart:no_item")}</h2>

          <Button asChild>
            <Link href="/"> {t("common:return_to_shop")}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] text-center">
                    {t("cart:product")}
                  </TableHead>

                  <TableHead className="w-[300px] text-center">
                    {t("cart:price")}
                  </TableHead>

                  <TableHead className="w-[300px] text-center">
                    {t("cart:quantity")}
                  </TableHead>

                  <TableHead className="w-[300px] text-center">
                    {t("cart:subtotal")}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart &&
                  cart.cart_items.map((item) => (
                    <TableRow key={item.cart_item_id}>
                      <TableCell className="text-center">
                        <div className="relative flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name || "Product image"}
                              width={80}
                              height={80}
                              className="min-h-[40px] min-w-[40px] rounded-lg object-cover"
                            />

                            <button
                              className={cn(
                                item.quantity !== 1 && "hidden",

                                "absolute -top-0 left-0 rounded-full bg-button-2"
                              )}
                              onClick={() =>
                                removeFromCartMutation.mutate(item.cart_item_id)
                              }
                              disabled={removeFromCartMutation.isPending}
                            >
                              <X className="size-4 text-white sm:size-5" />
                            </button>
                          </div>

                          <div className="flex flex-col text-left">
                            <span className="pb-2 font-inter font-bold">
                              {item.product.name}
                            </span>

                            {Object.entries(item.variant).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="text-muted-foreground flex gap-1 text-sm"
                                >
                                  <span className="block font-medium capitalize sm:min-w-[50px]">
                                    {key}
                                  </span>

                                  <span>:</span>

                                  <span className="pl-1 capitalize">
                                    {" "}
                                    {value}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        {item.product.price.toFixed(2)}
                      </TableCell>

                      <TableCell className="flex justify-center">
                        <div className="mt-6 flex flex-row items-center justify-center gap-2 rounded border px-2">
                          <div className="flex min-w-[20px] items-center justify-center">
                            <span className="text-center">{item.quantity}</span>
                          </div>

                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-4"
                              disabled={item.product.stock <= item.quantity}
                              onClick={() =>
                                handleQuantityChange(
                                  item.cart_item_id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <ChevronUp className="size-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-4"
                              onClick={() =>
                                handleQuantityChange(
                                  item.cart_item_id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <ChevronDown className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 flex flex-col flex-wrap gap-4">
            <MyButton className="max-w-fit border border-black bg-transparent text-black">
              <Link href="/">{t("return_to_shop")}</Link>
            </MyButton>
          </div>

          <div className="flex flex-col justify-center pt-10 lg:justify-between lg:pt-[80px] xl:flex-row xl:gap-[173px]">
            <div className="flex flex-col gap-4 xss:flex-row">
              <Input
                placeholder={t("cart:coupon_code")}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="xss:max-w-[300px] xs:py-6 sm:px-[48px] sm:py-[25px]"
              />

              <MyButton onClick={handleApplyCoupon}>
                {t("cart:apply_coupon")}
              </MyButton>
            </div>

            <div className="flex min-w-[470px] flex-col pb-20 pt-10 lg:pt-20 xl:pb-[140px] xl:pt-0">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {t("cart:cart_total")}
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("cart:subtotal")}:</span>

                    <span>${cart && cart.meta.total_price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{t("cart:shipping")}:</span>

                    <span>$10.00</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span>
                        {appliedCoupon.type === "fixed"
                          ? "Discount:"
                          : `Discount (${appliedCoupon.value}%):`}
                      </span>

                      <span>
                        -$
                        {appliedCoupon.type === "fixed"
                          ? `${appliedCoupon.value.toFixed(2)}`
                          : `${(
                              (cart!.meta.total_price * appliedCoupon.value) /
                              100
                            ).toFixed(2)}`}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t("cart:total")}:</span>

                    <span>${calculateTotalPrice()}</span>
                  </div>

                  <div className="flex justify-center">
                    <MyButton onClick={handleProceedToCheckout}>
                      {createCheckoutCartMutation.isPending && <Spinner />}{" "}
                      {t("cart:proceed_to_checkout")}
                    </MyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
