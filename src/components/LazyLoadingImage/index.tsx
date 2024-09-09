import cn from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

const LazyLoadedImageStyles = cva(['font-semibold'], {
  variants: {
    radius: {
      small: 'rounded-sm',
      medium: 'rounded-md',
      large: 'rounded-lg',
      none: 'rounded-none'

    }
  },
  defaultVariants: {
    radius: 'medium'
  }
})

type LazyLoadedImageprops = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof LazyLoadedImageStyles> & {
    image?: string | null
    name: string
  }
const LazyLoadedImage: React.FC<LazyLoadedImageprops> = ({ image, name, className, ...props }) => {
  return (
    <div >
      {image ? (

        <Image
          src={image}
          alt={name}
          layout="responsive"
          width={16}
          height={9}
          priority
          {...props} className={cn(LazyLoadedImageStyles(props), className)}
        />
      ) : (
        <span className="text-xs font-bold"></span>
      )}
    </div>
  );
};

export default LazyLoadedImage