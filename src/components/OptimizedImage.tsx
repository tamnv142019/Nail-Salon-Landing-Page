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
  // Convert Unsplash URLs to include format parameters
  const getOptimizedUrl = (url: string, size: 'thumb' | 'medium' | 'large' = 'large') => {
    if (url.includes('unsplash.com')) {
      const sizeMap = { thumb: 400, medium: 800, large: 1200 };
      const params = `&w=${sizeMap[size]}&q=85&fm=webp`;
      
      if (url.includes('?')) {
        return url + params;
      }
      return url + '?' + params.substring(1);
    }
    return url;
  };

  const imageSizes = `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`;

  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source
        srcSet={`
          ${getOptimizedUrl(src, 'thumb')} 400w,
          ${getOptimizedUrl(src, 'medium')} 800w,
          ${getOptimizedUrl(src, 'large')} 1200w
        `}
        type="image/webp"
        sizes={imageSizes}
      />
      
      {/* Fallback JPEG */}
      <img
        src={getOptimizedUrl(src, 'large')}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        decoding={priority ? 'sync' : 'async'}
        onClick={onClick}
        srcSet={`
          ${getOptimizedUrl(src, 'thumb')} 400w,
          ${getOptimizedUrl(src, 'medium')} 800w,
          ${getOptimizedUrl(src, 'large')} 1200w
        `}
        sizes={imageSizes}
      />
    </picture>
  );
}
