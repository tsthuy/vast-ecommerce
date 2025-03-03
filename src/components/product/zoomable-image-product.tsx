"use client";

import { type MouseEvent, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import { cn } from "~/libs/utils";

interface ZoomAbleImageProps {
  src: string;
  alt: string;
  zoomScale?: number;
}

export default function ZoomAbleImage({
  src,
  alt,
  zoomScale = 2,
}: ZoomAbleImageProps) {
  const { t } = useTranslation("common");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!imageRef.current || !isZoomed) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({ x, y });
  };

  const handleClick = () => {
    setIsZoomed((prev) => !prev);
  };

  const backgroundPosition = `${position.x * 100}% ${position.y * 100}%`;

  return (
    <div
      ref={imageRef}
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-secondary-2 md:h-[600px]",
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className={cn(
          isZoomed && "hidden",
          "h-full w-[50%] object-contain md:w-[80%]"
        )}
      />

      {isZoomed && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition,
            backgroundSize: `${zoomScale * 100}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {!isZoomed && isHovered && (
        <div className="absolute bottom-2 z-10 rounded px-3 py-1 text-sm text-black">
          {t("click_to_zoom")}
        </div>
      )}
    </div>
  );
}
