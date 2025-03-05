import Image from 'next/image';
import { urlForImage } from '@/lib/sanity.client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Custom type for Sanity images with additional properties
interface SanityImageObject {
  asset?: {
    _ref: string;
    _type?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
  _type?: string;
}

interface SanityImageProps {
  image: SanityImageObject;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  quality?: number;
  crop?: boolean;
  hotspot?: boolean;
}

export default function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  sizes = '(max-width: 768px) 100vw, 800px',
  priority = false,
  className = '',
  fill = false,
  quality = 80,
  crop = true,
  hotspot = true,
}: SanityImageProps) {
  if (!image?.asset?._ref) {
    return null;
  }

  // Configure the image URL builder with options
  const imageBuilder = urlForImage(image);
  
  // Apply crop and hotspot if available and requested
  if (crop && hotspot && image.crop && image.hotspot) {
    imageBuilder.crop('focalpoint').focalPoint(image.hotspot.x, image.hotspot.y);
  }
  
  // Apply quality setting
  imageBuilder.quality(quality);
  
  // Get the final URL
  const imageUrl = imageBuilder.url();

  // Common props for both fill and fixed size modes
  const commonProps = {
    src: imageUrl,
    alt: alt,
    className: className,
    priority: priority,
    sizes: sizes,
    quality: quality,
  };

  // Return the appropriate Image component based on fill mode
  return fill ? (
    <div className="relative h-full w-full" style={{ position: 'relative' }}>
      <Image
        {...commonProps}
        fill={true}
        style={{ objectFit: 'cover' }}
      />
    </div>
  ) : (
    <Image
      {...commonProps}
      width={width}
      height={height}
    />
  );
}

// Helper component for responsive images with aspect ratio
export function AspectImage({
  image,
  alt,
  ratio = '16:9',
  className = '',
  priority = false,
  quality = 80,
}: {
  image: SanityImageObject;
  alt: string;
  ratio?: '1:1' | '4:3' | '16:9' | '21:9';
  className?: string;
  priority?: boolean;
  quality?: number;
}) {
  // Calculate padding based on aspect ratio
  const ratioMap = {
    '1:1': 'pb-[100%]',
    '4:3': 'pb-[75%]',
    '16:9': 'pb-[56.25%]',
    '21:9': 'pb-[42.85%]',
  };
  
  const paddingClass = ratioMap[ratio];

  return (
    <div className={`relative w-full ${paddingClass} overflow-hidden ${className}`} style={{ position: 'relative' }}>
      <SanityImage
        image={image}
        alt={alt}
        fill={true}
        priority={priority}
        quality={quality}
        className="object-cover"
      />
    </div>
  );
}
