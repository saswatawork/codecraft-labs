import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

/**
 * Section component variants using CVA
 * Provides consistent spacing and container widths for page sections
 */
const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      xs: 'py-8 md:py-12',
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-24',
      xl: 'py-24 md:py-28',
      '2xl': 'py-28 md:py-32',
    },
    width: {
      full: '',
      contained: 'mx-auto px-4 sm:px-6 lg:px-8',
      narrow: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
      wide: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      ultra: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]',
    },
  },
  defaultVariants: {
    spacing: 'lg',
    width: 'wide',
  },
});

/**
 * Section component props
 */
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Render as different HTML element
   * @default 'section'
   */
  as?: React.ElementType;
}

/**
 * Section Component
 *
 * A wrapper component for page sections with consistent spacing and container widths.
 * Eliminates the need for manual py-20 md:py-24 lg:py-28 classes throughout the app.
 *
 * @example
 * ```tsx
 * // Basic section with default spacing (lg) and width (wide)
 * <Section>
 *   <h1>Content here</h1>
 * </Section>
 *
 * // Section with custom spacing
 * <Section spacing="xl">
 *   <h1>Extra large spacing</h1>
 * </Section>
 *
 * // Full width section without container
 * <Section width="full">
 *   <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
 *     Full bleed content
 *   </div>
 * </Section>
 *
 * // Narrow centered section
 * <Section width="narrow" spacing="md">
 *   <article>Centered article content</article>
 * </Section>
 *
 * // Section as different element
 * <Section as="article" spacing="sm">
 *   <h2>Article content</h2>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, width, as: Component = 'section', children, ...props }, ref) => {
    const SectionComponent = Component as any;

    return (
      <SectionComponent
        ref={ref}
        className={cn(
          sectionVariants({
            spacing,
            width,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </SectionComponent>
    );
  },
);

Section.displayName = 'Section';

export default Section;
