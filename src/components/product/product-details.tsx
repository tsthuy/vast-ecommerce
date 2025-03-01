import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heart, Minus, Plus, RefreshCcw, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

import { useProductById } from "~/hooks";
import { useAddToCart } from "~/hooks/use-carts.hook";
import { useAddWishlist, useWishlists } from "~/hooks/use-wishlists.hook";

import { renderStars } from "~/utils/render-stars";

import { useAuthStore } from "~/stores/auth.store";

const ProductDetails = () => {
  const { t } = useTranslation(["header", "common"]);
  const { user } = useAuthStore();
  const router = useRouter();
  const { productId } = router.query;

  const { data, isLoading, error } = useProductById(
    router.locale || "",
    productId as string
  );

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
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

  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      data &&
      data.product &&
      data.product.variants &&
      data.product.variants.length > 0
    ) {
      setSelectedVariant(data.product.variants[0]);
    }

    if (data && data.images && data.images.length > 0) {
      setSelectedImage(
        data.images.find((img) => img.isDefault) || data.images[0]
      );
    }
  }, [data]);

  const handleAddToCart = () => {
    if (!user?.uid) {
      toast.error(t("common:please_login"));
      return;
    }

    if (!selectedVariant || selectedVariant.stock <= 0) {
      toast.error(t("common:out_of_stock"));
      return;
    }

    addToCartMutation.mutate({
      product_id: data?.product.id,
      variant_id: selectedVariant.id,
      quantity,
    });
  };

  const handleAddToWishlist = () => {
    if (!user?.uid) {
      toast.error(t("common:please_login"));
      return;
    }
    if (!selectedVariant) return;

    addWishlistMutation.mutate({
      productId: data?.product.id,
      variantId: selectedVariant.id,
    });
  };

  const handleImageSelect = (image: ProductImage, index: number) => {
    setSelectedImage(image);

    if (image.variantId) {
      const variant = data?.product.variants.find(
        (v) => v.id === image.variantId
      );
      if (variant) setSelectedVariant(variant);
    }
    const thumbnail = thumbnailRefs.current[index];

    if (thumbnail && thumbnailsContainerRef.current) {
      const containerHeight = thumbnailsContainerRef.current.clientHeight;
      console.log("container height", containerHeight);
      const thumbnailHeight = thumbnail.clientHeight;
      console.log("thumbnail height", thumbnailHeight);
      const thumbnailTop = thumbnail.offsetTop;
      console.log("thumbnail top", thumbnailTop);
      const scrollPosition =
        thumbnailTop - containerHeight / 2 + thumbnailHeight / 2;
      console.log("scroll position", scrollPosition);

      thumbnailsContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleVariantChange = (color: string, size: string) => {
    const newVariant = data?.product.variants.find(
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
      const variantImage = data?.images.find(
        (img) => img.variantId === newVariant.id
      );

      if (variantImage) {
        setSelectedImage(variantImage);
        const imageIndex = data.images.findIndex(
          (img) => img.url === variantImage.url
        );
        const thumbnail = thumbnailRefs.current[imageIndex];

        if (thumbnail && thumbnailsContainerRef.current) {
          const containerHeight = thumbnailsContainerRef.current.clientHeight;
          const thumbnailHeight = thumbnail.clientHeight;
          const thumbnailTop = thumbnail.offsetTop;
          const scrollPosition =
            thumbnailTop - containerHeight / 2 + thumbnailHeight / 2;
          thumbnailsContainerRef.current.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || !data.product || !selectedVariant || !selectedImage)
    return <div>Error loading product</div>;

  const isInWishlist = wishlist?.wishlist_items.some(
    (item) =>
      item.product_id === data.product.id &&
      item.variant_id === selectedVariant.id
  );

  return (
    <div className="flex flex-col gap-[70px] pb-[140px] lg:flex-row">
      <div className="flex w-full flex-col gap-4 lg:w-2/3">
        <div className="flex flex-col gap-10 sm:flex-row">
          <div
            ref={thumbnailsContainerRef}
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex h-[600px] min-w-[170px] flex-col gap-[16px] overflow-y-auto"
          >
            {data.images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                className={`flex cursor-pointer items-center justify-center rounded-lg border bg-secondary-2 p-3 ${
                  selectedImage.url === image.url
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(image, index)}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`${data.product.name} thumbnail ${index + 1}`}
                  width={120}
                  height={220}
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex max-h-[600px] w-full items-center justify-center bg-secondary-2">
            <Image
              src={selectedImage.url}
              alt={data.product.name}
              width={400}
              height={400}
              className="w-[70%] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="max-h-[600px] w-full flex-1">
        <div className="space-y-4">
          <h1 className="font-inter text-24 font-semibold">
            {data.product.name}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(data.product.ratings)}</div>

            <span>({data.product.reviews} Reviews)</span>

            <span>|</span>

            <span className="text-green-500">In Stock</span>
          </div>

          <p className="font-inter text-24">
            ${selectedVariant.price.toFixed(2)}
          </p>

          <p className="text-14 font-normal">{data.product.description}</p>
        </div>

        <div className="my-6 h-[1px] w-full bg-black"></div>

        {/* Variant Selection */}
        <div className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label className="block font-inter text-20">Colours:</label>

              <div className="flex gap-2">
                {data.product.attributes
                  .find((attr) => attr.name === "Color")
                  ?.values.map((color) => (
                    <button
                      key={color.id}
                      className={`h-4 w-4 rounded-full border-2 ${selectedVariant.attributes.some((attr) => attr.valueId === color.id) ? "border-black" : "border-gray-300"}`}
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
                {data.product.attributes
                  .find((attr) => attr.name === "Size")
                  ?.values.map((size) => (
                    <button
                      key={size.id}
                      className={`rounded border px-3 py-1 ${selectedVariant.attributes.some((attr) => attr.valueId === size.id) ? "border-black bg-button-2 text-white" : "border-gray-300"}`}
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

            <span className="block max-w-16 pl-7 pr-8">{quantity}</span>

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
            onClick={handleAddToWishlist}
            disabled={addWishlistMutation.isPending}
          >
            <Heart
              className={`m-2 size-5 ${isInWishlist ? "fill-red-500" : ""}`}
            />
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-md border border-black">
          <div className="flex items-center gap-4 p-3">
            <button>
              <Truck className="size-8" />
            </button>

            <div className="">
              <p className="text-16 font-medium">Free Delivery</p>

              <Link
                href={"#"}
                className="text-12 font-medium underline hover:text-button-2"
              >
                Enter your postal code for Delivery Availability
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-black p-3">
            <button>
              <RefreshCcw className="size-8" />
            </button>

            <div className="">
              <p className="text-16 font-medium">Free Delivery</p>

              <Link
                href={"#"}
                className="text-12 font-medium underline hover:text-button-2"
              >
                Enter your postal code for Delivery Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
