import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Eye, Heart, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { cn } from "~/libs/utils";

import { cartApi, wishlistApi } from "~/services";

import type { NewProduct, ProductVariant } from "~/types/product";

import { renderStars } from "~/utils/render-stars";

import { useAuthStore } from "~/stores/auth.store";

import VariantSelector from "./product-variant-selector";

interface ProductCardProps {
  product: NewProduct;
  variantId?: string;
  quantity?: number;
  onRemoveFromWishlist?: (wishlistItemId: string) => void;
}

export default function ProductCard({
  product,
  variantId,
  onRemoveFromWishlist,
}: ProductCardProps) {
  const { user } = useAuthStore();
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const isInWishListPage = pathname === "/wishlist";

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((variant) => variant.id === variantId) ||
      product.variants.find((variant) => variant.stock > 0) ||
      product.variants[0]
  );

  const router = useRouter();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const isGetDiscountedPrice = product.price - selectedVariant.price;
  console.log(isGetDiscountedPrice);
  const discountPercentage =
    isGetDiscountedPrice > 0
      ? Math.round(
          ((product.price - selectedVariant.price) / product.price) * 100
        )
      : 0;

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user?.uid) return;

      try {
        const wishlistData = await wishlistApi.getWishlist(user.uid);
        const wishlistItem = wishlistData.wishlist_items.find(
          (item) =>
            item.product_id === product.id &&
            item.variant_id === selectedVariant.id
        );

        setIsInWishlist(!!wishlistItem);
        setWishlistItemId(wishlistItem?.wishlist_item_id || null);
      } catch (error) {
        console.error("Failed to check wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [user?.uid, product.id, selectedVariant.id, wishlistItemId]);

  const handleToggleWishlist = async () => {
    if (!user?.uid) {
      toast.error(t("please_login"));
      return;
    }

    try {
      setIsTogglingWishlist(true);

      if (isInWishlist && wishlistItemId) {
        await wishlistApi.removeFromWishlist(wishlistItemId);
        setIsInWishlist(false);
        setWishlistItemId(null);
        toast.success(t("removed_from_wishlist"));

        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(wishlistItemId);
        }
      } else {
        const response = await wishlistApi.addToWishlist({
          user_id: user.uid,
          product_id: product.id,
          variant_id: selectedVariant.id,
        });
        setIsInWishlist(true);
        setWishlistItemId(response.wishlist_item_id);
        toast.success(t("added_to_wishlist"));
      }
    } catch (error: any) {
      console.error("Failed to toggle wishlist:", error);

      if (error.response?.status === 400) {
        toast.error(t("already_in_wishlist"));
      } else {
        toast.error(t("failed_to_toggle_wishlist"));
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

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
      await cartApi.addToCart({
        user_id: user.uid,
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity: 1,
      });

      toast.success(t("added_to_cart"));
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error(t("failed_to_add_to_cart"));
    }
  };

  const handleVariantChange = async (newVariant: ProductVariant) => {
    if (!user?.uid || !isInWishListPage || !wishlistItemId) {
      setSelectedVariant(newVariant);
      return;
    }

    try {
      setIsTogglingWishlist(true);

      await wishlistApi.removeFromWishlist(wishlistItemId);

      const response = await wishlistApi.addToWishlist({
        user_id: user.uid,
        product_id: product.id,
        variant_id: newVariant.id,
      });

      setSelectedVariant(newVariant);
      setWishlistItemId(response.wishlist_item_id);
      toast.success(t("variant_updated_in_wishlist"));
    } catch (error: any) {
      console.error("Failed to update variant in wishlist:", error);

      if (error.response?.status === 400) {
        toast.error(t("variant_already_in_wishlist"));
      } else {
        toast.error(t("failed_to_update_variant"));

        setSelectedVariant(selectedVariant);
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white sm:w-[calc((100%-30px)/2)] md:w-[calc((100%-60px)/3)] lg:w-[calc((100%-90px)/4)]">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square items-center justify-center flex overflow-hidden rounded-lg bg-gray-100">
          <div className="relative size-[65%]">
            <Image
              src={selectedVariant.image.url || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              className={`transition-transform duration-300${
                isInWishListPage
                  ? "-translate-y-[20px]"
                  : "group-hover:-translate-y-[20px]"
              } hover:drop-shadow-[0_0_20px_var(--color-button-1)]`}
            />
          </div>
        </div>

        {/* NEW and Discount tags */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
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

        {/* Add to wishlist */}

        <div className="absolute right-3 top-2 flex flex-col gap-1">
          {isInWishListPage ? (
            isInWishlist ? (
              <button
                className="rounded-full bg-white p-2 hover:bg-gray-200"
                onClick={handleToggleWishlist}
                disabled={isTogglingWishlist}
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

        {/* Add to Cart Button */}
        {!isInWishListPage ? (
          <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              disabled={selectedVariant.stock === 0}
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
            >
              {t("add-to-cart")}
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-4">
        <Link href={`product/${product.id}`} className="text-16 font-medium">
          {product.name}
        </Link>

        {/* price & discountPrice */}

        <div
          className={`flex ${
            isGetDiscountedPrice < 0 ? "flex-col" : ""
          } mt-2 gap-3`}
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

        {/* review */}
        {!isInWishListPage && (
          <div className="flex items-center gap-1">
            <div className="flex">{renderStars(product.ratings)}</div>

            <span className="text-muted-foreground text-sm">
              ({product.reviews})
            </span>
          </div>
        )}

        {/* Variant Selector */}
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
        />
      </div>
    </div>
  );
}
