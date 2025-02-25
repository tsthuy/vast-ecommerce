import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { wishlistApi } from "~/services";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import { ProductCard, ProductList } from "../product";
import SectionHeading from "../section-heading";
import { Button } from "../ui/button";

import { new_products_schema } from "~/mocks/data/new_product_schema";

export const WishList = () => {
  const [wishlist, setWishlist] = useState<WishlistResponse | null>(null);

  const { t } = useTranslation(["wishlist", "common"]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user?.uid) {
        try {
          const data = await wishlistApi.getWishlist(user.uid);
          setWishlist(data);
          console.log("Wishlist data:", data);
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, [user?.uid]);

  const handleRemoveFromWishlist = (wishlistItemId: string) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist) return prevWishlist;

      return {
        ...prevWishlist,
        wishlist_items: prevWishlist.wishlist_items.filter(
          (item) => item.wishlist_item_id !== wishlistItemId
        ),
      };
    });
  };

  return (
    <Container className="pb-[140px] pt-[80px]">
      <div className="flex items-center justify-between pb-[60px]">
        <h3>{t("wishlist")} (4)</h3>

        <MyButton className="border bg-transparent text-black">
          {t("move_all_to_bag")}
        </MyButton>
      </div>

      {wishlist?.wishlist_items.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-2xl font-semibold">{t("wishlist_empty")}</h3>

          <Button> {t("common:return_to_shop")}</Button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-start gap-[30px] pt-[60px] lg:justify-start">
          {wishlist?.wishlist_items.map((item) => (
            <ProductCard
              key={item.wishlist_item_id}
              product={item.product}
              variantId={item.variant_id}
              onRemoveFromWishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pb-[60px] pt-[80px]">
        <SectionHeading section_key="just_for_you" />

        <MyButton className="bg-transparent text-black">
          {t("see_all")}
        </MyButton>
      </div>

      <ProductList products={new_products_schema || []} limit={4} />
    </Container>
  );
};
