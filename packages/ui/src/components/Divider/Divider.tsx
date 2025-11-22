import type * as React from 'react';
import { cn } from '../../utils';

export interface DividerProps {
  /**
   * Visual variant
   */
  variant?: 'solid' | 'dashed' | 'gradient';

  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Optional text to display in the middle
   */
  text?: string;

  /**
   * Color tone (for solid/dashed variants)
   */
  tone?: 'gray' | 'blue' | 'purple';

  /**
   * Spacing around divider
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Custom className
   */
  className?: string;
}

const orientationClasses = {
  horizontal: 'w-full h-px',
  vertical: 'h-full w-px',
} as const;

const spacingClasses = {
  horizontal: {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-8',
  },
  vertical: {
    none: '',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-8',
  },
} as const;

const toneClasses = {
  gray: 'bg-gray-200 dark:bg-gray-700',
  blue: 'bg-blue-200 dark:bg-blue-700',
  purple: 'bg-purple-200 dark:bg-purple-700',
} as const;

export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  text,
  tone = 'gray',
  spacing = 'md',
  className,
}) => {
  // If text is provided, render with text
  if (text && orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center', spacingClasses.horizontal[spacing], className)}>
        <div
          className={cn(
            'flex-1 h-px',
            variant === 'solid' && toneClasses[tone],
            variant === 'dashed' &&
              `border-t border-dashed ${tone === 'gray' ? 'border-gray-300' : tone === 'blue' ? 'border-blue-300' : 'border-purple-300'}`,
            variant === 'gradient' &&
              'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600',
          )}
        />
        <span className="px-4 text-sm text-gray-600 dark:text-gray-400">{text}</span>
        <div
          className={cn(
            'flex-1 h-px',
            variant === 'solid' && toneClasses[tone],
            variant === 'dashed' &&
              `border-t border-dashed ${tone === 'gray' ? 'border-gray-300' : tone === 'blue' ? 'border-blue-300' : 'border-purple-300'}`,
            variant === 'gradient' &&
              'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600',
          )}
        />
      </div>
    );
  }

  // Simple divider
  return (
    <div
      className={cn(
        orientationClasses[orientation],
        variant === 'solid' && toneClasses[tone],
        variant === 'dashed' &&
          `border-${orientation === 'horizontal' ? 't' : 'l'} border-dashed ${tone === 'gray' ? 'border-gray-300' : tone === 'blue' ? 'border-blue-300' : 'border-purple-300'}`,
        variant === 'gradient' &&
          (orientation === 'horizontal'
            ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600'
            : 'bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600'),
        spacingClasses[orientation][spacing],
        className,
      )}
    />
  );
};

Divider.displayName = 'Divider';
