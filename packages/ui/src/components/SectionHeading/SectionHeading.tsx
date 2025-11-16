import * as React from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ eyebrow, heading, subtitle, align = 'center', className, ...props }, ref) => {
    const isCenter = align === 'center';
    return (
      <div
        ref={ref}
        className={cn('mb-8 md:mb-12', isCenter ? 'text-center' : 'text-left', className)}
        {...props}
      >
        {eyebrow && (
          <div className={cn('mb-4', isCenter ? 'justify-center flex' : '')}>
            {typeof eyebrow === 'string' ? (
              <Badge className="px-4 py-1.5 text-sm font-semibold bg-secondary text-secondary-foreground border">
                {eyebrow}
              </Badge>
            ) : (
              eyebrow
            )}
          </div>
        )}
        <h2
          className={cn(
            'font-bold tracking-tight text-gray-900',
            isCenter ? 'mx-auto' : '',
            'text-2xl md:text-3xl lg:text-4xl',
          )}
        >
          {heading}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-3 text-gray-600',
              isCenter ? 'mx-auto' : '',
              'text-base md:text-lg',
              'max-w-3xl',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  },
);

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
