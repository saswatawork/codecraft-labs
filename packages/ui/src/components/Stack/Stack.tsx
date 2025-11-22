import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

/**
 * Stack component variants using CVA
 * Provides flexible layout container for vertical or horizontal stacking
 */
const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
      '3xl': 'gap-16',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

/**
 * Stack component props
 */
export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /**
   * Render as different HTML element
   * @default 'div'
   */
  as?: React.ElementType;
}

/**
 * Stack Component
 *
 * A flexible layout primitive for arranging children in a column or row with consistent spacing.
 * Built on flexbox with semantic props for common layout patterns.
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Horizontal stack with custom spacing
 * <Stack direction="horizontal" spacing="lg">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </Stack>
 *
 * // Centered items
 * <Stack align="center" justify="center" spacing="xl">
 *   <Icon />
 *   <h2>Centered content</h2>
 * </Stack>
 *
 * // Responsive horizontal stack that wraps
 * <Stack direction="horizontal" wrap spacing="sm">
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 * </Stack>
 *
 * // Space between items
 * <Stack direction="horizontal" justify="between" align="center">
 *   <h2>Title</h2>
 *   <Button>Action</Button>
 * </Stack>
 *
 * // Stack as different element
 * <Stack as="nav" direction="horizontal" spacing="lg">
 *   <a href="/">Home</a>
 *   <a href="/about">About</a>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      spacing,
      align,
      justify,
      wrap,
      as: Component = 'div',
      children,
      ...props
    },
    ref,
  ) => {
    const StackComponent = Component as any;

    return (
      <StackComponent
        ref={ref}
        className={cn(
          stackVariants({
            direction,
            spacing,
            align,
            justify,
            wrap,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </StackComponent>
    );
  },
);

Stack.displayName = 'Stack';

export default Stack;
