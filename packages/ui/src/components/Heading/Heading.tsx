import * as React from 'react';
import { cn } from '../../utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The semantic heading level
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Apply gradient text effect
   */
  gradient?: boolean;

  /**
   * Custom gradient colors (Tailwind classes)
   * @default "from-blue-600 via-purple-600 to-pink-600"
   */
  gradientColors?: string;

  /**
   * Size variant (overrides default level sizing)
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

  /**
   * Text color tone
   */
  tone?: 'default' | 'muted' | 'subtle' | 'blue' | 'purple' | 'green' | 'orange';

  children: React.ReactNode;
}

const levelMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

const defaultSizeForLevel = {
  1: 'text-4xl md:text-5xl lg:text-6xl',
  2: 'text-3xl md:text-4xl lg:text-5xl',
  3: 'text-2xl md:text-3xl lg:text-4xl',
  4: 'text-xl md:text-2xl',
  5: 'text-lg md:text-xl',
  6: 'text-base md:text-lg',
} as const;

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
} as const;

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

const toneClasses = {
  default: 'text-gray-900 dark:text-white',
  muted: 'text-gray-700 dark:text-gray-300',
  subtle: 'text-gray-600 dark:text-gray-400',
  blue: 'text-blue-600 dark:text-blue-400',
  purple: 'text-purple-600 dark:text-purple-400',
  green: 'text-green-600 dark:text-green-400',
  orange: 'text-orange-600 dark:text-orange-400',
} as const;

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      align = 'left',
      gradient = false,
      gradientColors = 'from-blue-600 via-purple-600 to-pink-600',
      size,
      weight = 'bold',
      tone = 'default',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = levelMap[level];

    const sizeClass = size ? sizeClasses[size] : defaultSizeForLevel[level];
    const alignClass = alignClasses[align];
    const weightClass = weightClasses[weight];
    const toneClass = gradient ? '' : toneClasses[tone];

    if (gradient) {
      return (
        <Component
          ref={ref}
          className={cn(
            sizeClass,
            alignClass,
            weightClass,
            'leading-tight tracking-tight',
            className,
          )}
          {...props}
        >
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', gradientColors)}>
            {children}
          </span>
        </Component>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClass,
          alignClass,
          weightClass,
          toneClass,
          'leading-tight tracking-tight',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';
