type CloudflareLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const normalizeSrc = (src: string): string => {
  return src.startsWith("/") ? src.slice(1) : src;
};

const cloudflareLoader = ({
  src,
  width,
  quality,
}: CloudflareLoaderProps): string => {
  if (process.env.NODE_ENV === "development") {
    return src;
  }
  const params: string[] = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

export default cloudflareLoader;
