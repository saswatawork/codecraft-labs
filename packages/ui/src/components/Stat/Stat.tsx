import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

const statVariants = cva('rounded-2xl text-center transition-all duration-300', {
  variants: {
    variant: {
      plain: '',
      card: 'p-8 shadow-sm hover:shadow-md border',
    },
    tone: {
      blue: 'bg-blue-50/50 border-blue-100/50',
      green: 'bg-emerald-50/50 border-emerald-100/50',
      purple: 'bg-purple-50/50 border-purple-100/50',
      orange: 'bg-orange-50/50 border-orange-100/50',
      gray: 'bg-gray-50 border-gray-100',
    },
    align: {
      center: 'text-center',
      left: 'text-left',
    },
  },
  compoundVariants: [
    {
      variant: 'plain',
      className: 'bg-transparent border-0 shadow-none hover:shadow-none p-0',
    },
  ],
  defaultVariants: {
    variant: 'plain',
    align: 'center',
    tone: 'gray',
  },
});

const toneColor: Record<NonNullable<VariantProps<typeof statVariants>['tone']>, string> = {
  blue: 'text-blue-600',
  green: 'text-emerald-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  gray: 'text-gray-900',
};

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {
  value: React.ReactNode;
  label: React.ReactNode;
  icon?: React.ReactNode;
  hint?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, variant, tone, align, value, label, icon, hint, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(statVariants({ variant, tone, align }), className)} {...props}>
        {icon && (
          <div
            className={cn(
              'mb-3 flex items-center justify-center',
              align === 'left' && 'justify-start',
            )}
          >
            {icon}
          </div>
        )}
        <div
          className={cn(
            'mb-2 text-4xl md:text-5xl lg:text-6xl font-black leading-none',
            toneColor[tone || 'gray'],
          )}
        >
          {value}
        </div>
        <div className="text-sm md:text-base font-semibold text-gray-600">{label}</div>
        {hint && <div className="mt-2 text-xs md:text-sm text-gray-500">{hint}</div>}
      </div>
    );
  },
);

Stat.displayName = 'Stat';

export default Stat;
