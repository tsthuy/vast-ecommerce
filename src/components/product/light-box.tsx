import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { cn } from "~/libs/utils";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ProductImage {
  url: string;
  variantId?: string;
  isDefault?: boolean;
}

interface LightBoxImageProps {
  images: ProductImage[];
  alt: string;
  selectedImage: ProductImage;
  onImageSelect: (image: ProductImage, index: number) => void;
}

export default function LightBoxImage({
  images,
  alt,
  selectedImage,
  onImageSelect,
}: LightBoxImageProps) {
  const { t } = useTranslation("common");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(
    images.findIndex((img) => img.url === selectedImage.url)
  );

  useEffect(() => {
    setPhotoIndex(images.findIndex((img) => img.url === selectedImage.url));
  }, [selectedImage, images]);

  const imageRef = useRef<HTMLDivElement>(null);

  const lightboxSlides = images.map((image) => ({
    src: image.url || "/placeholder.svg",
    alt: `${alt} (${images.indexOf(image) + 1}/${images.length})`,
    width: 400,
    height: 400,
  }));

  const handleLightboxImageSelect = ({ index }: { index: number }) => {
    setPhotoIndex(index);
    onImageSelect(images[index], index);
  };

  return (
    <div className="relative w-full">
      <div
        ref={imageRef}
        className={cn(
          "relative mx-auto flex h-[300px] w-[80%] cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-secondary-2 md:h-[600px] lg:w-full"
        )}
        onClick={() => setIsLightboxOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={selectedImage.url || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={400}
          className="h-full w-[70%] object-contain py-4"
        />
        {!isLightboxOpen && isHovered && (
          <div className="absolute bottom-2 z-10 rounded px-3 py-1 text-sm text-black">
            {t("common.click_to_zoom")}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={lightboxSlides}
          index={photoIndex}
          plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
          on={{
            view: handleLightboxImageSelect,
          }}
          fullscreen={{
            auto: false,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleClickDelay: 300,
            doubleTapDelay: 300,
            doubleClickMaxStops: 2,
          }}
          slideshow={{}}
          styles={{
            root: {},
            slide: {},

            container: {
              backgroundColor: "black",
              height: "80%",
              width: "60%",
              margin: "auto",
              borderRadius: "10px",
            },

            navigationPrev: { color: "white" },
            navigationNext: { color: "white" },
          }}
          className="custom-lightbox"
        />
      )}
    </div>
  );
}
