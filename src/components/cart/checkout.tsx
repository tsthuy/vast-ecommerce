import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Slash } from "lucide-react";
import { toast } from "sonner";

import { cn } from "~/libs/utils";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import CheckOutForm, { CheckOutFormHandle } from "./checkout-form";
import { PaymentForm } from "./payment-form";
import {  StripeProvider } from "./stripe-provider";

export const CheckOut = () => {
  const {user} = useAuthStore();
  const checkoutFormRef = useRef<CheckOutFormHandle>(null);

  const handleExternalValidation = async () => {
    if (checkoutFormRef.current) {
      const isValid = await checkoutFormRef.current.triggerFormValidation();
      return isValid;
    }
  };

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cash">("cash")
  const [clientSecret, setClientSecret] = useState<string>()
  const totalAmount = 9000

  const handlePaymentMethodChange = async (value: string) => {

    if (value === "bank") {
      try {
        const response = await axios.post("/api/create-payment-intent", {
          amount : totalAmount ,
          productId: "1234",
          userId: user?.uid
        })

        setClientSecret(response.data.clientSecret)
      } catch (error) {
        toast.error("Failed to initialize payment")
      }
    }
    setPaymentMethod(value as "bank" | "cash");
  }

  const handlePayNow = async () => {
  const isValid = await handleExternalValidation();

  if (!isValid) {
    toast.error("Form validation failed. Please check the fields.");
    return false;
  }
  return true;
};
  return (
    <Container>
      <nav className="flex items-start justify-start py-[80px]" >
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

      <h3 className="font-inter text-36 font-medium">Billing Details</h3>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center lg:items-start">
        <CheckOutForm ref={checkoutFormRef} />

        <div className="lg:pl-8 py-10 text-16 font-normal w-full md:w-[50%]">
          <div className="bg-muted p-6 rounded-lg">
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/car.png"
                      alt="LCD Monitor"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />

                    <span>LCD Monitor</span>
                  </div>

                  <span className="font-medium">${"650"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/car.png"
                      alt="LCD Monitor"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />

                    <span>H1 Gamepad</span>
                  </div>

                  <span className="font-medium">${"1100"}</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between border-b border-black pb-[16px]">
                  <span className="">Subtotal:</span>

                  <span className="font-medium">${"1750"}</span>
                </div>

                <div className="flex justify-between py-[16px] border-b border-black">
                  <span>Shipping:</span>

                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-2">
                  <span>Total:</span>

                  <span>${"1750"}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-6">
                <RadioGroup
                value={paymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="space-y-3">
                  <div className="flex justify-between items-center space-x-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="bank" id="bank" />

                      <Label htmlFor="bank">Bank</Label>
                    </div>

                    <div className="flex items-center space-x-2 ml-auto">
                      {["bkash", "visa", "mastercard", "discover"].map(
                        (card) => (
                          <div
                            key={card}
                            className="w-8 h-5 bg-gray-200 rounded"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem className="" value="cash" id="cash" />

                    <Label htmlFor="cash">Cash on delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Coupon Code */}
              <div className="flex flex-col lg:flex-row  pt-4 gap-2">
                <Input className="py-6" placeholder="Coupon Code " />

                <MyButton className="max-w-fit pt-2">Apply Coupon</MyButton>
              </div>

               {/* Stripe Payment Element */}
              {paymentMethod === "bank" && clientSecret && (
                <div className="pt-4">
                  <StripeProvider clientSecret={clientSecret}>
                    <PaymentForm onPayNow={handlePayNow} />
                  </StripeProvider>
                </div>
              )}

              {/* Place Order Button */}
              <div className="pt-2">
                <MyButton onClick={handleExternalValidation} className={cn(paymentMethod === "bank" && "hidden" ,"w-full xl:w-fit")}>Place Order</MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
