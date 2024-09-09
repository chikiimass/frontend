import cn from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const LazyLoadedImageStyles = cva(['font-semibold'], {
  variants: {
    radius: {
      small: 'rounded-sm',
      medium: 'rounded-md',
      large: 'rounded-lg',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    radius: 'medium',
  },
});

type LazyLoadedImageProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof LazyLoadedImageStyles> & {
    image?: string | null;
    name: string;
    width?: number;
    height?: number;
  };

const LazyLoadedImage: React.FC<LazyLoadedImageProps> = ({
  image,
  name,
  width = 640, // Default width
  height = 360, // Default height
  className,
  ...props
}) => {
  return (
    <div className={cn(className, LazyLoadedImageStyles({ radius: props.radius }))}>
      {image ? (
        <img
          src={image}
          alt={name}
          width={width}
          height={height}
          loading="lazy" // Enable lazy loading
          className={cn('w-full h-auto', LazyLoadedImageStyles({ radius: props.radius }), className)}
          {...props}
        />
      ) : (
        <span className="text-xs font-bold">{name}</span>
      )}
    </div>
  );
};

export default LazyLoadedImage;
