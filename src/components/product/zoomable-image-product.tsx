"use client";

import { type MouseEvent, useRef, useState } from "react";
import Image from "next/image";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({ x, y });
  };

  const backgroundPosition = `${position.x * 100}% ${position.y * 100}%`;

  return (
    <div
      ref={imageRef}
      className="relative flex h-[300px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border bg-secondary-2 md:h-[600px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
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
    </div>
  );
}
