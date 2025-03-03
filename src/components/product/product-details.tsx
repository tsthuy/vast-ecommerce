import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heart, Minus, Plus, RefreshCcw, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { useAddToCart } from "~/hooks/use-carts.hook";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlists,
} from "~/hooks/use-wishlists.hook";

import { renderStars } from "~/utils/render-stars";

import { useAuthStore } from "~/stores/auth.store";

import ZoomAbleImage from "./zoomable-image-product";

interface ProductDetailsProps {
  product: NewProduct;
  images: ProductImage[];
}

const ProductDetails = ({ product, images }: ProductDetailsProps) => {
  const { t } = useTranslation(["header", "common", "details"]);
  const { user } = useAuthStore();
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.isDefault) || images[0]
  );
  const [quantity, setQuantity] = useState<number>(2);

  const addToCartMutation = useAddToCart(
    user?.uid || "",
    router.locale || "en"
  );
  const addWishlistMutation = useAddWishlist(
    user?.uid || "",
    router.locale || "en"
  );
  const { data: wishlist } = useWishlists(
    user?.uid || "",
    router.locale || "en"
  );

  const removeWishlistMutation = useRemoveWishlist(
    user?.uid || "",
    router.locale || "en"
  );

  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const wishlistItem = wishlist?.wishlist_items.find(
    (item) =>
      item.product_id === product.id && item.variant_id === selectedVariant.id
  );

  const isInWishlist = !!wishlistItem;

  const handleAddToCart = () => {
    if (!user?.uid) {
      toast.error(t("common:please_login"));
      router.push("/login");
      return;
    }
    if (!selectedVariant || selectedVariant.stock <= 0) {
      toast.error(t("common:out_of_stock"));
      return;
    }

    addToCartMutation.mutate({
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity,
    });
  };

  const handleToggleWishlist = () => {
    if (!user?.uid) {
      toast.error(t("common:please_login"));
      return;
    }
    if (!selectedVariant) return;

    if (isInWishlist) {
      removeWishlistMutation.mutateAsync(wishlistItem.wishlist_item_id);
      toast.success(t("common:removed_from_wishlist"));
      return;
    }

    addWishlistMutation.mutate({
      productId: product.id,
      variantId: selectedVariant.id,
    });
    toast.success(t("common:added_to_wishlist"));
  };

  const handleImageSelect = (image: ProductImage, index: number) => {
    setSelectedImage(image);
    if (image.variantId) {
      const variant = product.variants.find((v) => v.id === image.variantId);
      if (variant) setSelectedVariant(variant);
    }
    scrollToThumbnail(index);
  };

  const handleVariantChange = (color: string, size: string) => {
    const newVariant = product.variants.find(
      (variant) =>
        variant.attributes.some(
          (attr) => attr.attributeId === "attr1" && attr.valueId === color
        ) &&
        variant.attributes.some(
          (attr) => attr.attributeId === "attr2" && attr.valueId === size
        )
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
      const variantImage = images.find(
        (img) => img.variantId === newVariant.id
      );
      if (variantImage) {
        setSelectedImage(variantImage);
        const imageIndex = images.findIndex(
          (img) => img.url === variantImage.url
        );
        scrollToThumbnail(imageIndex);
      }
    }
  };

  const scrollToThumbnail = (index: number) => {
    const thumbnail = thumbnailRefs.current[index];
    const container = thumbnailsContainerRef.current;

    if (!thumbnail || !container) return;

    const isVertical =
      window.getComputedStyle(container).flexDirection === "column";

    if (isVertical) {
      const containerHeight = container.clientHeight;
      console.log("containerHeight", containerHeight);
      const thumbnailHeight = thumbnail.offsetHeight;
      console.log("thumbnailHeight", thumbnailHeight);
      const thumbnailTop = thumbnail.offsetTop;
      console.log("thumbnailTop", thumbnailTop);

      const scrollPosition =
        thumbnailTop - (containerHeight - thumbnailHeight) / 2;
      const maxScroll = container.scrollHeight - containerHeight;

      container.scrollTo({
        top: Math.max(0, Math.min(scrollPosition - 100, maxScroll - 100)),
        behavior: "smooth",
      });
    } else {
      // Horizontal scrolling logic
      const containerWidth = container.clientWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const thumbnailLeft = thumbnail.offsetLeft;

      const scrollPosition =
        thumbnailLeft - (containerWidth - thumbnailWidth) / 2;
      const maxScroll = container.scrollWidth - containerWidth;

      container.scrollTo({
        left: Math.max(0, Math.min(scrollPosition, maxScroll)),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-[70px] pb-[140px] lg:flex-row">
      <div className="flex w-full flex-col gap-4 lg:w-2/3">
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Thumbnails */}
          <div
            ref={thumbnailsContainerRef}
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex min-w-[170px] flex-row gap-[16px] overflow-auto md:h-[600px] md:flex-col"
          >
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                className={`flex min-w-[18%] cursor-pointer items-center justify-center rounded-lg border bg-secondary-2 p-3 ${
                  selectedImage.url === image.url
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(image, index)}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={120}
                  height={220}
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="mx-auto flex w-[70%] items-center justify-center md:w-full">
            <ZoomAbleImage alt={product.name} src={selectedImage.url} />
          </div>
        </div>
      </div>

      <div className="max-h-[600px] w-full flex-1">
        <div className="space-y-4">
          <h1 className="font-inter text-24 font-semibold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(product.ratings)}</div>

            <span>({product.reviews} Reviews)</span>

            <span>|</span>

            <span className="text-green-500">In Stock</span>
          </div>

          <p className="font-inter text-24">
            ${selectedVariant.price.toFixed(2)}
          </p>

          <p className="text-14 font-normal">{product.description}</p>
        </div>

        <div className="my-6 h-[1px] w-full bg-black"></div>

        {/* Variant Selection */}
        <div className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label className="block font-inter text-20">Colours:</label>

              <div className="flex gap-2">
                {product.attributes
                  .find((attr) => attr.name === "Color")
                  ?.values.map((color) => (
                    <button
                      key={color.id}
                      className={`h-4 w-4 rounded-full border-2 ${
                        selectedVariant.attributes.some(
                          (attr) => attr.valueId === color.id
                        )
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() =>
                        handleVariantChange(
                          color.id,
                          selectedVariant.attributes.find(
                            (attr) => attr.attributeId === "attr2"
                          )?.valueId || "s1"
                        )
                      }
                    />
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="block font-inter text-20">Size:</label>

              <div className="flex gap-2">
                {product.attributes
                  .find((attr) => attr.name === "Size")
                  ?.values.map((size) => (
                    <button
                      key={size.id}
                      className={`rounded border px-3 py-1 ${
                        selectedVariant.attributes.some(
                          (attr) => attr.valueId === size.id
                        )
                          ? "border-black bg-button-2 text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        handleVariantChange(
                          selectedVariant.attributes.find(
                            (attr) => attr.attributeId === "attr1"
                          )?.valueId || "c1",
                          size.id
                        )
                      }
                    >
                      {size.value}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quantity and Actions */}
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
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            Buy Now
          </Button>

          <button
            className="rounded-md border hover:bg-button-2 hover:text-white"
            onClick={handleToggleWishlist}
            disabled={addWishlistMutation.isPending}
          >
            <Heart
              className={`m-2 size-5 ${isInWishlist ? "fill-red-500" : ""}`}
            />
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-[400px] rounded-md border border-black">
          <div className="flex items-center gap-4 p-3">
            <button>
              <Truck className="size-8" />
            </button>

            <div className="">
              <p className="text-16 font-medium">
                {t("details:free_delivery")}
              </p>

              <span className="cursor-pointer text-12 font-medium underline hover:text-button-2">
                {t("details:enter_postcode")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-black p-3">
            <button>
              <RefreshCcw className="size-8" />
            </button>

            <div className="">
              <p className="text-16 font-medium">
                {t("details:return_delivery")}
              </p>

              <span className="text-12 font-medium">
                {t("details:free_30_days_return")}
              </span>

              <span className="cursor-pointer text-12 font-medium underline hover:text-button-2">
                {t("details:details")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
