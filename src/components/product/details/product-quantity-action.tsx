import { memo } from "react";
import { useTranslation } from "next-i18next";
import { Heart, Minus, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";

import Spinner from "../../ui/spinner";

interface ProductVariant {
  stock: number;
}

interface ProductQuantityActionsProps {
  quantity: number;
  selectedVariant: ProductVariant;
  isInWishlist: boolean;
  createCheckoutCartMutation: any;
  addWishlistMutation: any;
  removeWishlistMutation: any;
  handleBuyNow: () => void;
  handleToggleWishlist: () => void;
  setQuantity: (value: number | ((prev: number) => number)) => void;
}

const ProductQuantityActions = ({
  quantity,
  selectedVariant,
  isInWishlist,
  createCheckoutCartMutation,
  addWishlistMutation,
  handleBuyNow,
  handleToggleWishlist,
  setQuantity,
}: ProductQuantityActionsProps) => {
  const { t } = useTranslation("common");

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <div className="flex items-center rounded border">
        <div className="border-r">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="size-4" />
          </Button>
        </div>
        <span className="px-8">{quantity}</span>
        <div className="border-l">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= selectedVariant.stock}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
      <Button
        className="bg-button-2 px-8 text-white"
        onClick={handleBuyNow}
        disabled={createCheckoutCartMutation.isPending}
      >
        {createCheckoutCartMutation.isPending && <Spinner />}
        {t("common.buy_now")}
      </Button>
      <button
        className="rounded-md border hover:bg-button-2 hover:text-white"
        onClick={handleToggleWishlist}
        disabled={addWishlistMutation.isPending}
      >
        <Heart className={`m-2 size-5 ${isInWishlist ? "fill-red-500" : ""}`} />
      </button>
    </div>
  );
};

export default memo(ProductQuantityActions);
