import useProductDetails from "~/hooks/use-product-details.hook";

import ProductAdditionalInfor from "./details/product-additional-infor";
import ProductDetailsInfor from "./details/product-details-infor";
import ProductVariantSelection from "./details/product-details-variant-selector";
import LightBoxImage from "./details/product-light-box";
import ProductQuantityActions from "./details/product-quantity-action";
import ProductThumbnails from "./details/product-thumbnails";

interface ProductDetailsProps {
  product: NewProduct;
  images: ProductImage[];
}

const ProductDetails = ({ product, images }: ProductDetailsProps) => {
  const {
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
  } = useProductDetails(product, images);

  return (
    <div className="flex flex-col gap-[70px] pb-[140px] lg:flex-row">
      <div className="flex w-full flex-col gap-4 lg:w-2/3">
        <div className="flex flex-col-reverse gap-10 md:flex-row">
          <ProductThumbnails
            alt={product.name}
            images={images}
            selectedImage={selectedImage}
            thumbnailsContainerRef={thumbnailsContainerRef}
            thumbnailRefs={thumbnailRefs}
            onImageSelect={handleImageSelect}
          />
          <LightBoxImage
            images={images}
            alt={product.name}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
          />
        </div>
      </div>
      <div className="max-h-[600px] w-full flex-1">
        <ProductDetailsInfor
          product={product}
          selectedVariant={selectedVariant}
        />
        <div className="my-6 h-[1px] w-full bg-black"></div>
        <ProductVariantSelection
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
        />
        <ProductQuantityActions
          quantity={quantity}
          selectedVariant={selectedVariant}
          isInWishlist={isInWishlist}
          createCheckoutCartMutation={createCheckoutCartMutation}
          addWishlistMutation={addWishlistMutation}
          removeWishlistMutation={removeWishlistMutation}
          handleBuyNow={handleBuyNow}
          handleToggleWishlist={handleToggleWishlist}
          setQuantity={setQuantity}
        />
        <ProductAdditionalInfor />
      </div>
    </div>
  );
};

export default ProductDetails;
