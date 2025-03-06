import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

import { useProductsJustForU } from "~/hooks";
import { useMoveWishlistToCart } from "~/hooks/use-carts.hook";
import { useWishlists } from "~/hooks/use-wishlists.hook";

import { getGuestUserId } from "~/utils/get-user.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import { ProductCard, ProductList } from "../product";
import SectionHeading from "../section-heading";
import { Button } from "../ui/button";

export const WishList = () => {
  const router = useRouter();

  const { t } = useTranslation("common");
  const { user } = useAuthStore();

  const { data: products_for_u } = useProductsJustForU(
    user?.uid || "",
    router.locale || "en"
  );

  const { data: wishlist } = useWishlists(
    user?.uid || getGuestUserId(),
    router.locale || "en"
  );

  const moveWishlistToCartMutation = useMoveWishlistToCart(
    user?.uid || "",
    router.locale || "en"
  );

  const handleMoveAllToBag = () => {
    if (!user?.uid) {
      toast.error(t("common.please_login"));
      return;
    }

    if (!wishlist || wishlist.wishlist_items.length === 0) {
      toast.error(t("wishlist.wishlist_empty"));
      return;
    }

    const itemsToMove = wishlist.wishlist_items.map((item) => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: 1,
    }));

    moveWishlistToCartMutation.mutate(itemsToMove);
  };

  return (
    <Container className="pb-20 pt-10 lg:pb-[140px] lg:pt-[80px]">
      <div className="flex items-center justify-between gap-3 pb-[60px]">
        <h3>
          {t("wishlist.wishlist")}({wishlist?.wishlist_items.length || 0})
        </h3>

        <MyButton
          onClick={handleMoveAllToBag}
          disabled={moveWishlistToCartMutation.isPending}
          className="border bg-transparent text-black"
        >
          {t("wishlist.move_all_to_bag")}
        </MyButton>
      </div>

      {wishlist?.wishlist_items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-semibold">
            {t("wishlist.wishlist_empty")}
          </h3>

          <Button> {t("common.return_to_shop")}</Button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-[30px] pt-[60px] sm:justify-start lg:justify-start">
          {wishlist?.wishlist_items.map((item) => (
            <div
              key={item.wishlist_item_id + item.variant_id + item.product_id}
              className="sm:w-[calc((100%-30px)/2)] md:w-[calc((100%-60px)/3)] lg:w-[calc((100%-90px)/4)]"
            >
              <ProductCard
                key={item.wishlist_item_id + item.variant_id + item.product_id}
                product={item.product}
                variantId={item.variant_id}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pb-[40px]">
        <SectionHeading section_key="just_for_you" />
        <div className="pb-5 pt-20">
          <MyButton className="bg-transparent text-black">
            {t("wishlist.see_all")}
          </MyButton>
        </div>
      </div>

      <ProductList products={products_for_u || []} limit={4} />
    </Container>
  );
};
