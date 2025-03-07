import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

import {
  useCarts,
  useCreateCheckoutCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "~/hooks/use-carts.hook";

import { couponApi } from "~/services/coupons.service";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

export const useCartLogic = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useAuthStore();

  const isLoading = useAuthStore((state) => state.isLoading);

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>(
    undefined
  );
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

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
      toast(t("common.please_enter_coupon_code"));
      return;
    }

    try {
      setIsApplyingCoupon(true);
      if (cart && cart.meta.total_price) {
        const coupon = await couponApi.applyCoupon(
          couponCode,
          cart.meta.total_price || 0
        );
        setAppliedCoupon(coupon);
        toast(t("common.coupon_applied_successfully"));
        setCouponCode("");
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleProceedToCheckout = async () => {
    if (!user?.uid) {
      toast.error(t("common.please_login"));
      return;
    }

    if (!cart || cart.cart_items.length === 0) {
      toast.error(t("cart.no_item"));
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

  const totalPrice = useMemo(() => {
    if (!cart) return 0;

    let totalPrice = cart.meta.total_price;

    if (appliedCoupon) {
      if (appliedCoupon.type === "fixed") {
        totalPrice -= appliedCoupon.value;
      } else if (appliedCoupon.type === "percentage") {
        totalPrice -= (totalPrice * appliedCoupon.value) / 100;
      }
    }

    totalPrice += 10; // Shipping fee
    return totalPrice.toFixed(2);
  }, [cart, appliedCoupon]);

  return {
    cart,
    isLoading,
    couponCode,
    appliedCoupon,
    isApplyingCoupon,
    createCheckoutCartMutation,
    updateCartMutation,
    removeFromCartMutation,
    handleQuantityChange,
    handleApplyCoupon,
    handleProceedToCheckout,
    totalPrice,
    setCouponCode,
  };
};

export default useCartLogic;
