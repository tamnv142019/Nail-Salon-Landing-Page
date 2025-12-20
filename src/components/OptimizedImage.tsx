/**
 * Optimized Image Component with lazy loading, responsive sizing, and modern formats
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  onClick?: () => void;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  onClick,
  priority = false,
}: OptimizedImageProps) {
  // Determine if the URL is local (in /public) or external
  const isLocal = (u: string) => u.startsWith('/') || !u.match(/^https?:\/\//);

  const sizeMap = { thumb: 400, medium: 800, large: 1200 } as const;

  const buildUrl = (url: string, size: keyof typeof sizeMap | null, fmt?: 'webp' | 'avif') => {
    // Unsplash: use query params to request width and format
    if (url.includes('unsplash.com')) {
      const w = size ? sizeMap[size] : sizeMap.large;
      const params = `&w=${w}&q=85${fmt ? `&fm=${fmt}` : ''}`;
      if (url.includes('?')) return url + params;
      return url + '?' + params.substring(1);
    }

    // Local images in /public: expect generated variants like `image-400.avif` or `image-800.webp`.
    if (isLocal(url)) {
      const extMatch = url.match(/(\.[a-zA-Z0-9]+)(?:\?|$)/);
      const ext = extMatch ? extMatch[1] : '';
      const base = url.replace(/\.[^/.]+(\?.*)?$/, '');
      if (size) {
        const fmtExt = fmt ? `.${fmt}` : ext;
        return `${base}-${sizeMap[size]}${fmtExt}`;
      }
      // no size requested: return the large fallback (1200)
      const fallbackExt = fmt ? `.${fmt}` : ext;
      return `${base}-${sizeMap.large}${fallbackExt}`;
    }

    // External non-Unsplash: append format param if requested
    if (fmt) return url + (url.includes('?') ? `&fm=${fmt}` : `?fm=${fmt}`);
    return url;
  };

  const imageSizes = `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`;

  const makeSrcSet = (fmt?: 'webp' | 'avif') => {
    return [
      `${buildUrl(src, 'thumb', fmt)} 400w`,
      `${buildUrl(src, 'medium', fmt)} 800w`,
      `${buildUrl(src, 'large', fmt)} 1200w`,
    ].join(',\n          ');
  };

  return (
    <picture>
      {/* AVIF first for best compression */}
      <source srcSet={makeSrcSet('avif')} type="image/avif" sizes={imageSizes} />

      {/* WebP next */}
      <source srcSet={makeSrcSet('webp')} type="image/webp" sizes={imageSizes} />

      {/* Fallback image */}
      <img
        src={buildUrl(src, 'large')}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        decoding={priority ? 'sync' : 'async'}
        onClick={onClick}
        srcSet={makeSrcSet()}
        sizes={imageSizes}
      />
    </picture>
  );
}
