import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';
import { badgeVariants } from '../../utils/variants';

/**
 * Base Badge props extending variant props and HTML div attributes
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Icon to display before the badge text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the badge text
   */
  rightIcon?: React.ReactNode;
  /**
   * Show a dot indicator
   */
  dot?: boolean;
  /**
   * Make the badge clickable (adds pointer cursor and hover states)
   */
  interactive?: boolean;
  /**
   * Loading state - shows pulse animation
   */
  loading?: boolean;
  /**
   * Render as different element (e.g., 'span', 'button', 'a')
   */
  as?: React.ElementType;
}

/**
 * Dot indicator component
 */
const BadgeDot: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('w-2 h-2 rounded-full bg-current', className)} />
);

/**
 * Badge Component
 *
 * A versatile badge component for displaying status, categories, counts, and labels.
 * Supports various variants, sizes, icons, and interactive states.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // Badge with variants
 * <Badge variant="success">Active</Badge>
 * <Badge variant="soft">Soft Badge</Badge>
 * <Badge variant="outline-primary">Outlined</Badge>
 * <Badge variant="destructive" size="lg">Error</Badge>
 *
 * // Badge with tone colors
 * <Badge tone="blue">Blue Badge</Badge>
 * <Badge variant="soft" tone="purple">Purple Soft</Badge>
 *
 * // Badge with icons
 * <Badge leftIcon={<CheckIcon />}>Verified</Badge>
 * <Badge rightIcon={<XIcon />} variant="destructive">Failed</Badge>
 *
 * // Interactive badge
 * <Badge interactive onClick={handleClick}>
 *   Clickable
 * </Badge>
 *
 * // Badge with dot indicator
 * <Badge dot>Online</Badge>
 *
 * // Loading badge
 * <Badge loading>Processing...</Badge>
 *
 * // Badge as different element
 * <Badge as="button" interactive>Button Badge</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      tone,
      leftIcon,
      rightIcon,
      dot = false,
      interactive = false,
      loading = false,
      as: Component = 'div',
      children,
      ...props
    },
    ref,
  ) => {
    // Cast Component for TypeScript
    const BadgeComponent = Component as any;

    return (
      <BadgeComponent
        ref={ref}
        className={cn(
          badgeVariants({
            variant: variant as any,
            size: size as any,
            tone: tone as any,
          }),
          interactive && 'cursor-pointer hover:opacity-80 active:opacity-90',
          loading && 'animate-pulse',
          className,
        )}
        {...props}
      >
        {/* Dot indicator */}
        {dot && <BadgeDot className="mr-1.5" />}

        {/* Left icon */}
        {leftIcon && !loading && (
          <span className="mr-1 shrink-0 flex items-center">{leftIcon}</span>
        )}

        {/* Loading indicator (replaces left icon) */}
        {loading && (
          <div className="mr-1.5 shrink-0">
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Badge content */}
        {children}

        {/* Right icon */}
        {rightIcon && <span className="ml-1 shrink-0 flex items-center">{rightIcon}</span>}
      </BadgeComponent>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
