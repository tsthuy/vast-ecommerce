import { memo } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { ChevronDown, ChevronUp, X } from "lucide-react";

import { Button } from "~/components/ui/button";

import { cn } from "~/libs/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { UseMutationResult } from "@tanstack/react-query";

interface CartTableProps {
  cartItems: CartItemResponse[];
  removeFromCartMutation: UseMutationResult<
    {
      success: boolean;
    },
    Error,
    string,
    unknown
  >;
  handleQuantityChange: (cart_item_id: string, newQuantity: number) => void;
}

const CartTable = ({
  cartItems,
  removeFromCartMutation,
  handleQuantityChange,
}: CartTableProps) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] text-center">
              {t("cart.product")}
            </TableHead>

            <TableHead className="w-[300px] text-center">
              {t("cart.price")}
            </TableHead>

            <TableHead className="w-[300px] text-center">
              {t("cart.quantity")}
            </TableHead>

            <TableHead className="w-[300px] text-center">
              {t("cart.subtotal")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cartItems &&
            cartItems.map((item) => (
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

                      {Object.entries(item.variant).map(([key, value]) => (
                        <div
                          key={key}
                          className="text-muted-foreground flex gap-1 text-sm"
                        >
                          <span className="block font-medium capitalize sm:min-w-[50px]">
                            {key}
                          </span>

                          <span>:</span>

                          <span className="pl-1 capitalize"> {value}</span>
                        </div>
                      ))}
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
  );
};

export default memo(CartTable);
