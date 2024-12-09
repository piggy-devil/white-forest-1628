"use client";

import Image from "next/image";
import cloudflareLoader from "./cloudflareLoader";

type MyImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const MyImage: React.FC<MyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <Image
      loader={cloudflareLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MyImage;
