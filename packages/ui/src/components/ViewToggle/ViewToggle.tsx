import * as React from 'react';
import { cn } from '../../utils';
import { Button } from '../Button';

export interface ViewToggleOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface ViewToggleProps {
  options: ViewToggleOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/**
 * ViewToggle Component
 *
 * A toggle control for switching between different view modes (e.g., grid/list).
 * Uses design system tokens for consistent styling.
 *
 * @example
 * ```tsx
 * <ViewToggle
 *   options={[
 *     { value: 'grid', label: 'Grid', icon: <Grid3x3 /> },
 *     { value: 'list', label: 'List', icon: <List /> }
 *   ]}
 *   value={viewMode}
 *   onValueChange={setViewMode}
 * />
 * ```
 */
export const ViewToggle = React.forwardRef<HTMLFieldSetElement, ViewToggleProps>(
  ({ options, value, onValueChange, className }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn('inline-flex gap-1 p-1 bg-muted rounded-lg border-0', className)}
        aria-label="View mode toggle"
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onValueChange(option.value)}
            className="gap-2"
            aria-pressed={value === option.value}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </Button>
        ))}
      </fieldset>
    );
  },
);

ViewToggle.displayName = 'ViewToggle';
