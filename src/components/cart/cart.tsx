import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

import { cartApi } from "~/services";
import { couponApi } from "~/services/coupons.service";

import { Coupon } from "~/types/coupons";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const Cart = () => {
  const { t } = useTranslation(["common", "cart"]);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const { user } = useAuthStore();

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountValue, setDiscountValue] = useState<number>(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartApi.getCart(user?.uid || "");
        setCart(cartData);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, [user?.uid]);

  const handleQuantityChange = async (
    cart_item_id: string,
    newQuantity: number
  ) => {
    if (newQuantity > 0) {
      try {
        await cartApi.updateCartItemQuantity(cart_item_id, newQuantity);

        const updatedCart = await cartApi.getCart(user?.uid || "");
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to update quantity:", error);
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
    } catch (error: any) {
      console.log("Failed to apply coupon:", error.response.data.error);
      toast(`Failed to apply coupon:  ${error.response.data.error}`);
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
      <nav className="flex items-center gap-2 py-[80px] text-sm">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>

        <span>/</span>

        <span className="text-foreground">Cart</span>
      </nav>

      {!cart || cart.cart_items.length === 0 ? (
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
                    Product
                  </TableHead>

                  <TableHead className="w-[300px] text-center">Price</TableHead>

                  <TableHead className="w-[300px] text-center">
                    Quantity
                  </TableHead>

                  <TableHead className="w-[300px] text-center">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.cart_items.map((item) => (
                  <TableRow key={item.cart_item_id}>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name || "Product image"}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />

                        <div className="flex flex-col text-left">
                          <span className="font-medium">
                            {item.product.name}
                          </span>

                          {/* Display variant attributes */}
                          {Object.entries(item.variant).map(([key, value]) => (
                            <span
                              key={key}
                              className="text-sm text-muted-foreground"
                            >
                              <span className="capitalize"> {key}</span> :{" "}
                              <span className="capitalize">{value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      {/* Now using the variant's price */}$
                      {item.product.price.toFixed(2)}
                    </TableCell>

                    <TableCell className="flex justify-center">
                      <div className="mt-6 flex max-w-fit flex-row items-center justify-center gap-2 rounded border px-2">
                        <div className="flex items-center justify-center">
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
              <Link href="/">Return to Shop</Link>
            </MyButton>
          </div>

          <div className="flex justify-between gap-[173px] pt-[80px]">
            <div className="flex gap-4">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="max-w-[300px] px-[48px] py-[25px]"
              />

              <MyButton onClick={handleApplyCoupon}>Apply Coupon</MyButton>
            </div>

            <div className="min-w-[470px] pb-[140px]">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">Cart Total</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>

                    <span>${cart.meta.total_price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>

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
                        {" "}
                        -$
                        {appliedCoupon.type === "fixed"
                          ? `${appliedCoupon.value}`
                          : `${(cart.meta.total_price * appliedCoupon.value) / 100}`}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>

                    <span>${calculateTotalPrice()}</span>
                  </div>

                  <div className="flex justify-center">
                    <MyButton>Proceed to Checkout</MyButton>
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
