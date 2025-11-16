import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-[88rem]',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariants({ size }), className)} {...props}>
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';

export default Container;
