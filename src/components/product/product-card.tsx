"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Eye, Heart, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { useAddToCart } from "~/hooks/use-carts.hook";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlists,
} from "~/hooks/use-wishlists.hook";

import { cn } from "~/libs/utils";

import { customErrorMessage } from "~/utils/custom-error.util";
import { getProductSlug } from "~/utils/get-product-slug.util";
import { getGuestUserId } from "~/utils/get-user.util";
import { renderStars } from "~/utils/render-stars";

import { useAuthStore } from "~/stores/auth.store";

import VariantSelector from "./product-variant-selector";

interface ProductCardProps {
  product: NewProduct;
  variantId?: string;
  onRemoveFromWishlist?: (wishlistItemId: string) => void;
}

export default function ProductCard({
  product,
  variantId,
  onRemoveFromWishlist,
}: ProductCardProps) {
  const { user } = useAuthStore();
  const setPendingCartItem = useAuthStore((state) => state.setPendingCartItem);
  const isLoading = useAuthStore((state) => state.isLoading);

  const { t } = useTranslation("common");
  const pathname = usePathname();
  const isInWishListPage = pathname === "/wishlist";
  const router = useRouter();

  const userId = user?.uid || getGuestUserId();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find(
      (variant: ProductVariant) => variant.id === variantId
    ) ||
      product.variants.find((variant: ProductVariant) => variant.stock > 0) ||
      product.variants[0]
  );

  const { data: wishlistItems } = useWishlists(userId, router.locale || "en");

  const wishlistItem =
    wishlistItems &&
    wishlistItems.wishlist_items.find(
      (item) =>
        item.product_id === product.id && item.variant_id === selectedVariant.id
    );
  const isInWishlist = !!wishlistItem;
  const wishlistItemId = wishlistItem?.wishlist_item_id || null;

  const addWishlistMutation = useAddWishlist(userId, router.locale || "en");
  const removeWishlistMutation = useRemoveWishlist(
    userId,
    router.locale || "en"
  );
  const addToCartMutation = useAddToCart(userId, router.locale || "en");

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist && wishlistItemId) {
        await removeWishlistMutation.mutateAsync(wishlistItemId);
        toast.success(t("removed_from_wishlist"));

        if (onRemoveFromWishlist && isInWishListPage) {
          onRemoveFromWishlist(wishlistItemId);
        }
      } else {
        await addWishlistMutation.mutateAsync({
          productId: product.id,
          variantId: selectedVariant.id,
        });

        toast.success(t("added_to_wishlist"));
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  const handleAddToCart = async () => {
    if (!user?.uid && !isLoading) {
      setPendingCartItem({
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity: 1,
      });
      toast.info(t("please_login_to_add_to_cart"));
      router.push("/login");
      return;
    }

    if (selectedVariant.stock <= 0) {
      toast.error(t("out_of_stock"));
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity: 1,
      });
      toast.success(t("added_to_cart"));
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  const handleVariantChange = (newVariant: ProductVariant) => {
    setSelectedVariant(newVariant);
  };

  const isGetDiscountedPrice = product.price - selectedVariant.price;
  const discountPercentage =
    isGetDiscountedPrice > 0
      ? Math.round(
          ((product.price - selectedVariant.price) / product.price) * 100
        )
      : 0;

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <div className="relative size-[65%]">
            <Image
              src={selectedVariant.image.url || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`-translate-y-[10px] transition-transform duration-200 hover:drop-shadow-[0_0_20px_var(--color-button-1)]`}
            />
          </div>

          {!isInWishListPage ? (
            <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Button
                disabled={
                  selectedVariant.stock === 0 || addToCartMutation.isPending
                }
                onClick={handleAddToCart}
                className="w-full rounded-none bg-black py-4 text-base font-medium hover:bg-button-1"
              >
                {selectedVariant.stock === 0
                  ? t("out_of_stock")
                  : t("add-to-cart")}
              </Button>
            </div>
          ) : (
            <div className="absolute inset-x-0 bottom-0 opacity-100">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-none bg-black py-4 text-base font-medium hover:bg-button-1"
                disabled={addToCartMutation.isPending}
              >
                {t("add-to-cart")}
              </Button>
            </div>
          )}
        </div>

        {/* NEW and Discount tags */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-2">
          {product.isNew && (
            <div className="rounded bg-button-1 px-3 py-1 text-12 font-normal text-white">
              NEW
            </div>
          )}

          {isGetDiscountedPrice > 0 && (
            <div className="rounded bg-red-500 px-3 py-1 text-12 font-normal text-white">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Wishlist Toggle */}
        <div className="absolute right-3 top-2 flex flex-col gap-1">
          {isInWishListPage ? (
            isInWishlist ? (
              <button
                className="rounded-full bg-white p-2 hover:bg-gray-200"
                onClick={handleToggleWishlist}
                disabled={removeWishlistMutation.isPending}
              >
                <Trash className="size-5" />
              </button>
            ) : (
              <button
                className="rounded-full bg-white p-2 hover:bg-gray-200"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <Eye className="size-5" />
              </button>
            )
          ) : (
            <>
              <button
                onClick={handleToggleWishlist}
                className="rounded-full bg-white p-2 hover:bg-gray-200"
                disabled={
                  addWishlistMutation.isPending ||
                  removeWishlistMutation.isPending
                }
              >
                <Heart
                  className={`size-5 ${isInWishlist ? "fill-red-500" : ""}`}
                />
              </button>

              <button
                className="rounded-full bg-white p-2 hover:bg-gray-200"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <Eye className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-4">
        <Link
          href={{
            pathname: "/account/[categoryName]/[productSlug]",
            query: {
              categoryName: product.category?.name.toLowerCase(),
              productSlug: getProductSlug(product.id, product.name),
            },
          }}
          className="text-16 font-medium hover:text-button-1"
        >
          {product.name}
        </Link>

        {/* Price & Discount Price */}
        <div
          className={`flex ${isGetDiscountedPrice < 0 ? "flex-col" : ""} mt-2 gap-3`}
        >
          <div className="flex gap-4">
            {isGetDiscountedPrice > 0 && (
              <span className="text-16 font-medium text-button-2">
                {router.locale === "en"
                  ? "$" + selectedVariant.price
                  : (selectedVariant.price * 25000).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
              </span>
            )}

            <span
              className={cn(
                "text-16 font-medium text-black",
                isGetDiscountedPrice > 0 ? "line-through opacity-50" : ""
              )}
            >
              {router.locale === "en"
                ? "$" + product.price
                : (product.price * 25000).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
            </span>
          </div>
        </div>

        {/* Review */}
        {!isInWishListPage && (
          <div className="flex items-center gap-1">
            <div className="flex">{renderStars(product.ratings)}</div>

            <span className="text-muted-foreground text-sm">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className={cn(isInWishListPage && isInWishlist && "hidden")}>
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
        </div>
      </div>
    </div>
  );
}
