import { memo } from "react";
import Image from "next/image";

interface ProductThumbnailsProps {
  alt: string;
  images: ProductImage[];
  selectedImage: ProductImage;
  thumbnailsContainerRef: React.RefObject<HTMLDivElement>;
  thumbnailRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onImageSelect: (image: ProductImage, index: number) => void;
}

const ProductThumbnails = ({
  alt,
  images,
  selectedImage,
  thumbnailsContainerRef,
  thumbnailRefs,
  onImageSelect,
}: ProductThumbnailsProps) => {
  return (
    <div
      ref={thumbnailsContainerRef}
      className="custom-scrollbar flex min-w-[170px] flex-row gap-[16px] overflow-auto pb-2 pr-2 md:h-[600px] md:flex-col xl:pb-0"
    >
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            thumbnailRefs.current[index] = el;
          }}
          className={`flex min-w-[18%] cursor-pointer items-center justify-center rounded-lg border bg-secondary-2 p-3 ${
            selectedImage.url === image.url ? "border-black" : "border-gray-300"
          }`}
          onClick={() => onImageSelect(image, index)}
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={` ${alt} thumbnail ${index + 1}`}
            width={120}
            height={220}
            className="rounded object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default memo(ProductThumbnails);
