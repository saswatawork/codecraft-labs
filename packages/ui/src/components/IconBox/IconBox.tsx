import type * as React from 'react';
import { cn } from '../../utils';

export interface IconBoxProps {
  /**
   * Color tone
   */
  tone?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Shape variant
   */
  shape?: 'square' | 'rounded' | 'circle';

  /**
   * Custom className
   */
  className?: string;

  /**
   * Icon element
   */
  children: React.ReactNode;
}

const toneClasses = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
} as const;

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
} as const;

const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded-lg',
  circle: 'rounded-full',
} as const;

export const IconBox: React.FC<IconBoxProps> = ({
  tone = 'blue',
  size = 'md',
  shape = 'rounded',
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-shrink-0',
        toneClasses[tone],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
    >
      {children}
    </div>
  );
};

IconBox.displayName = 'IconBox';
