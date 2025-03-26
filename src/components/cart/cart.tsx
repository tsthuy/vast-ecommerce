"use client";

import { memo } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import useCartLogic from "~/hooks/use-cart-logic.hook";

import Breadcrumbs from "../breadcrumbs";
import Container from "../container";
import MyButton from "../custom/button";
import Loader8 from "../loader8";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

import CartTable from "./cart-table";

export const Cart = memo(() => {
  const { t } = useTranslation("common");

  const {
    cart,
    isLoading,
    couponCode,
    appliedCoupon,
    isApplyingCoupon,
    createCheckoutCartMutation,
    removeFromCartMutation,
    handleQuantityChange,
    handleApplyCoupon,
    handleProceedToCheckout,
    totalPrice,
    setCouponCode,
  } = useCartLogic();

  return (
    <Container>
      <div className="pb-[40px]">
        <Breadcrumbs />
      </div>

      {cart?.cart_items.length === 0 && !isLoading ? (
        <div className="py-[92px] text-center">
          <h2 className="mb-4 text-2xl font-semibold">{t("cart.no_item")}</h2>
          <Button asChild>
            <Link href="/">{t("common.return_to_shop")}</Link>
          </Button>
        </div>
      ) : (
        <>
          <CartTable
            cartItems={cart?.cart_items || []}
            removeFromCartMutation={removeFromCartMutation}
            handleQuantityChange={handleQuantityChange}
          />

          <div className="mt-8 flex flex-col flex-wrap gap-4">
            <MyButton className="max-w-fit border border-black bg-transparent text-black">
              <Link href="/">{t("common.return_to_shop")}</Link>
            </MyButton>
          </div>

          <div className="flex flex-col justify-center pt-10 lg:justify-between lg:pt-[80px] xl:flex-row xl:gap-[173px]">
            <div className="flex flex-col gap-4 xss:flex-row">
              <Input
                placeholder={t("cart.coupon_code")}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="xss:max-w-[300px] xs:py-6 sm:px-[48px] sm:py-[25px]"
              />
              <MyButton disabled={isApplyingCoupon} onClick={handleApplyCoupon}>
                {isApplyingCoupon && <Loader8 />}
                {t("cart.apply_coupon")}
              </MyButton>
            </div>

            <div className="flex min-w-[470px] flex-col pb-20 pt-10 lg:pt-20 xl:pb-[140px] xl:pt-0">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {t("cart.cart_total")}
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("cart.subtotal")}: </span>
                    <span>${cart && cart.meta.total_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("cart.shipping")}: </span>
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
                    <span>{t("cart.total")}: </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-center">
                    <MyButton onClick={handleProceedToCheckout}>
                      {createCheckoutCartMutation.isPending && <Loader8 />}
                      {t("cart.proceed_to_checkout")}
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
});
Cart.displayName = "Cart";
