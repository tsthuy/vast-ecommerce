import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { cartApi, wishlistApi } from "~/services";

import type { NewProduct, ProductVariant } from "~/types/product";

import { useAuthStore } from "~/stores/auth.store";

import VariantSelector from "./product-variant-selector";

interface WishlistProductCardProps {
  product: NewProduct;
  variantId: string;
  wishlistItemId: string;
  onRemove: (wishlistItemId: string) => void;
}

export default function WishlistProductCard({
  product,
  variantId,
  wishlistItemId,
  onRemove,
}: WishlistProductCardProps) {
  const { user } = useAuthStore();
  const { t } = useTranslation("common");

  // Find the initial variant based on variantId
  const initialVariant =
    product.variants.find((v) => v.id === variantId) || product.variants[0];
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initialVariant);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Handle variant change - create new wishlist item
  const handleVariantChange = async (newVariant: ProductVariant) => {
    if (!user?.uid) {
      toast.error(t("please_login"));
      return;
    }

    try {
      setIsAddingToWishlist(true);
      setSelectedVariant(newVariant);

      // Create new wishlist item with new variant
      await wishlistApi.addToWishlist({
        user_id: user.uid,
        product_id: product.id,
        variant_id: newVariant.id,
      });

      // Remove old wishlist item
      await wishlistApi.removeFromWishlist(wishlistItemId);
      onRemove(wishlistItemId);

      toast.success(t("variant_added_to_wishlist"));
    } catch (error: any) {
      console.error("Failed to update variant:", error);

      if (error.response?.status === 400) {
        toast.error(t("variant_already_in_wishlist"));
      } else {
        toast.error(t("failed_to_update_variant"));
      }
      // Revert selection on failure
      setSelectedVariant(initialVariant);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user?.uid) {
      toast.error(t("please_login"));
      return;
    }

    if (selectedVariant.stock <= 0) {
      toast.error(t("out_of_stock"));
      return;
    }

    try {
      setIsAddingToCart(true);

      await cartApi.addToCart({
        user_id: user.uid,
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity: 1,
      });

      toast.success(t("added_to_cart"));
    } catch (error: any) {
      console.error("Failed to add to cart:", error);

      if (error.response?.status === 400) {
        const available = error.response.data.available;
        toast.error(t("not_enough_stock", { available }));
      } else {
        toast.error(t("failed_to_add_to_cart"));
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle remove from wishlist
  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      await wishlistApi.removeFromWishlist(wishlistItemId);
      onRemove(wishlistItemId);
      toast.success(t("removed_from_wishlist"));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error(t("failed_to_remove_from_wishlist"));
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white sm:max-w-[calc((100%-30px)/2)] md:max-w-[calc((100%-60px)/3)] lg:max-w-[calc((100%-90px)/4)]">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <div className="relative size-[70%]">
            <Image
              src={selectedVariant.image.url || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              className="transition-transform duration-300 -translate-y-[20px] hover:drop-shadow-[0_0_20px_var(--color-button-1)]"
            />
          </div>
        </div>

        {/* NEW tag */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <div className="rounded bg-button-1 px-3 py-1 text-12 font-normal text-white">
              NEW
            </div>
          )}
        </div>

        {/* Remove button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        {/* Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 opacity-100">
          <Button
            disabled={selectedVariant.stock === 0 || isAddingToCart}
            onClick={handleAddToCart}
            className="w-full rounded-none bg-black py-4 text-base font-medium hover:bg-button-1"
          >
            {isAddingToCart
              ? t("adding_to_cart")
              : selectedVariant.stock === 0
                ? t("out_of_stock")
                : t("add_to_cart")}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-sm text-muted-foreground">{product.description}</p>

        {/* Price */}
        <div className="text-lg font-bold">
          ${selectedVariant.price.toFixed(2)}
        </div>

        {/* Variant Selector */}
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
          disabled={isAddingToWishlist}
        />
      </div>
    </div>
  );
}
