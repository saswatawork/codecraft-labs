import type * as React from 'react';
import { cn } from '../../utils';

export interface TextProps {
  /**
   * The HTML element to render
   */
  as?: 'p' | 'span' | 'div' | 'label';

  /**
   * Text size
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * Text color
   */
  color?: 'default' | 'muted' | 'subtle' | 'blue' | 'purple' | 'green' | 'red' | 'orange';

  /**
   * Line height
   */
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';

  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';

  /**
   * Truncate text with ellipsis
   */
  truncate?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID attribute
   */
  id?: string;

  children: React.ReactNode;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
} as const;

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

const colorClasses = {
  default: 'text-gray-900 dark:text-white',
  muted: 'text-gray-700 dark:text-gray-300',
  subtle: 'text-gray-600 dark:text-gray-400',
  blue: 'text-blue-600 dark:text-blue-400',
  purple: 'text-purple-600 dark:text-purple-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
  orange: 'text-orange-600 dark:text-orange-400',
} as const;

const leadingClasses = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const;

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  leading = 'normal',
  align = 'left',
  truncate = false,
  className,
  id,
  children,
}) => {
  return (
    <Component
      id={id}
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        leadingClasses[leading],
        alignClasses[align],
        truncate && 'truncate',
        className,
      )}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
