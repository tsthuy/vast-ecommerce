import Image from "next/image";
import Link from "next/link";
import { Slash } from "lucide-react";

import Container from "../container";
import MyButton from "../custom/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import CheckOutForm from "./checkout-form";

export const CheckOut = () => {
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

      <h3 className="font-inter text-36 font-medium">Billing Details</h3>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center lg:items-start">
        <CheckOutForm />

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
                <RadioGroup className="space-y-3">
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

              {/* Place Order Button */}
              <div className="pt-2">
                <MyButton className="w-full xl:w-fit">Place Order</MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
