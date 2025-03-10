import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

import { useCreateCheckoutCart } from "~/hooks/use-carts.hook";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlists,
} from "~/hooks/use-wishlists.hook";

import { customErrorMessage } from "~/utils/custom-error.util";
import { getGuestUserId } from "~/utils/get-user.util";

import { useAuthStore } from "~/stores/auth.store";

export const useProductDetails = (
  product: NewProduct,
  images: ProductImage[]
) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { user } = useAuthStore();
  const userId = user?.uid || getGuestUserId();

  const setPendingCartItem = useAuthStore((state) => state.setPendingCartItem);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.isDefault) || images[0]
  );
  const [quantity, setQuantity] = useState<number>(2);

  useEffect(() => {
    setSelectedVariant(product.variants[0]);
    const defaultImage = images.find((img) => img.isDefault) || images[0];
    setSelectedImage(defaultImage);

    const imageIndex = images.findIndex((img) => img.url === defaultImage.url);
    if (imageIndex !== -1 && thumbnailRefs.current[imageIndex]) {
      thumbnailRefs.current[imageIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [product, images]);

  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addWishlistMutation = useAddWishlist(userId, router.locale || "en");
  const { data: wishlist } = useWishlists(userId, router.locale || "en");
  const createCheckoutCartMutation = useCreateCheckoutCart(
    user?.uid || "",
    router.locale || "en"
  );
  const removeWishlistMutation = useRemoveWishlist(
    userId,
    router.locale || "en"
  );

  const wishlistItem = wishlist?.wishlist_items.find(
    (item) =>
      item.product_id === product.id && item.variant_id === selectedVariant.id
  );

  const isInWishlist = !!wishlistItem;

  const handleBuyNow = async () => {
    if (!user?.uid && !isLoading) {
      setPendingCartItem({
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity,
      });
      toast.info(t("common.please_login"));
      router.push("/login");
      return;
    }

    if (!selectedVariant || selectedVariant.stock <= 0) {
      toast.error(t("common.out_of_stock"));
      return;
    }

    const tempCartItem: CartItemResponse = {
      cart_item_id: `cart_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}`,
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity,
      user_id: user!.uid,
      product: {
        name: product.name,
        stock: selectedVariant.stock,
        price: selectedVariant.price,
        images: images.map((img) => img.url),
      },
      variant: selectedVariant.attributes.reduce((acc, attr) => {
        acc[attr.attributeId] = attr.valueId;
        return acc;
      }, {} as ProductVariantAttributes),
    };

    try {
      const { temp_cart_id } = await createCheckoutCartMutation.mutateAsync({
        cartItems: [tempCartItem],
      });
      router.push(`/checkout/${temp_cart_id}`);
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  const handleToggleWishlist = () => {
    if (!selectedVariant) return;

    if (isInWishlist) {
      removeWishlistMutation.mutateAsync(wishlistItem.wishlist_item_id);
      toast.success(t("common.removed_from_wishlist"));
      return;
    }

    addWishlistMutation.mutate({
      productId: product.id,
      variantId: selectedVariant.id,
    });
    toast.success(t("common.added_to_wishlist"));
  };

  const handleImageSelect = (image: ProductImage, index: number) => {
    setSelectedImage(image);
    if (image.variantId) {
      const variant = product.variants.find((v) => v.id === image.variantId);
      if (variant) setSelectedVariant(variant);
    }

    thumbnailRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleVariantChange = (color: string, size: string) => {
    console.log(color, size);
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
        thumbnailRefs.current[imageIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return {
    selectedVariant,
    selectedImage,
    quantity,
    thumbnailsContainerRef,
    thumbnailRefs,
    isInWishlist,
    handleBuyNow,
    handleToggleWishlist,
    handleImageSelect,
    handleVariantChange,
    setQuantity,
    createCheckoutCartMutation,
    addWishlistMutation,
    removeWishlistMutation,
  };
};

export default useProductDetails;
