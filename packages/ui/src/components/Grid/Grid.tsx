import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

/**
 * Grid component variants using CVA
 * Provides flexible CSS Grid layouts with common patterns
 */
const gridVariants = cva('grid w-full', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
      auto: 'grid-cols-[repeat(auto-fit,minmax(min(100%,var(--grid-min-width,250px)),1fr))]',
      'auto-fill':
        'grid-cols-[repeat(auto-fill,minmax(min(100%,var(--grid-min-width,250px)),1fr))]',
    },
    gap: {
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
    },
    justify: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
  },
  defaultVariants: {
    columns: 3,
    gap: 'lg',
    align: 'stretch',
    justify: 'stretch',
  },
});

/**
 * Grid component props
 */
export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Render as different HTML element
   * @default 'div'
   */
  as?: React.ElementType;
  /**
   * Minimum width for auto-fit/auto-fill columns (CSS custom property)
   * @default '250px'
   */
  minWidth?: string;
}

/**
 * Grid Component
 *
 * A flexible CSS Grid layout component with responsive column configurations.
 * Supports both fixed column counts and auto-fitting/filling layouts.
 *
 * @example
 * ```tsx
 * // 3-column grid (default, responsive)
 * <Grid>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // 4-column grid with larger gap
 * <Grid columns={4} gap="xl">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Grid>
 *
 * // Auto-fit grid (responsive, fills available space)
 * <Grid columns="auto" minWidth="300px" gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // Centered items with small gap
 * <Grid columns={2} align="center" justify="center" gap="sm">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Grid>
 *
 * // Grid as different element
 * <Grid as="ul" columns={3}>
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns,
      gap,
      align,
      justify,
      minWidth = '250px',
      as: Component = 'div',
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const GridComponent = Component as any;

    // Merge custom minWidth with style prop
    const gridStyle = {
      ...style,
      ...(minWidth && ({ '--grid-min-width': minWidth } as React.CSSProperties)),
    };

    return (
      <GridComponent
        ref={ref}
        className={cn(
          gridVariants({
            columns,
            gap,
            align,
            justify,
          }),
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </GridComponent>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
