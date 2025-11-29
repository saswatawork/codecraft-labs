import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';

/**
 * Hero component variants using CVA
 */
const heroVariants = cva('relative w-full overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-white',
      gradient: 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white',
      'gradient-bold': 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white',
      dark: 'bg-gray-900 text-white',
      light: 'bg-gray-50',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    spacing: {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-24',
      xl: 'py-24 md:py-28',
      '2xl': 'py-28 md:py-32',
      '3xl': 'py-32 md:py-40',
    },
  },
  defaultVariants: {
    variant: 'default',
    align: 'center',
    spacing: 'lg',
  },
});

/**
 * Hero component props
 */
export interface HeroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {
  /**
   * Render as different HTML element
   * @default 'section'
   */
  as?: React.ElementType;
}

/**
 * Hero Component
 *
 * A flexible hero section component with multiple variants and alignment options.
 * Designed to eliminate custom styling in portfolio/landing pages.
 *
 * @example
 * ```tsx
 * // Basic hero with centered content
 * <Hero>
 *   <Hero.Badge>New Feature</Hero.Badge>
 *   <Hero.Title>Welcome to Our Platform</Hero.Title>
 *   <Hero.Description>
 *     Build amazing products with our tools
 *   </Hero.Description>
 *   <Hero.Actions>
 *     <Button>Get Started</Button>
 *     <Button variant="outline">Learn More</Button>
 *   </Hero.Actions>
 * </Hero>
 *
 * // Hero with gradient background
 * <Hero variant="gradient" spacing="xl">
 *   <Hero.Title>Gradient Hero</Hero.Title>
 * </Hero>
 *
 * // Left-aligned hero
 * <Hero align="left">
 *   <Hero.Title>Left Aligned Content</Hero.Title>
 * </Hero>
 * ```
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ className, variant, align, spacing, as: Component = 'section', children, ...props }, ref) => {
    const HeroComponent = Component as any;

    return (
      <HeroComponent
        ref={ref}
        className={cn(
          heroVariants({
            variant,
            align,
            spacing,
          }),
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-8 md:space-y-10">{children}</div>
        </div>
      </HeroComponent>
    );
  },
);

Hero.displayName = 'Hero';

/**
 * Hero.Badge - Small badge/label for hero section
 */
const HeroBadge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-block px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow-sm',
          'bg-blue-100 text-blue-800 border border-blue-200',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

HeroBadge.displayName = 'Hero.Badge';

/**
 * Hero.Title - Main heading for hero section
 */
const HeroTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    /**
     * Heading level
     * @default 1
     */
    level?: 1 | 2 | 3;
  }
>(({ className, level = 1, children, ...props }, ref) => {
  const Heading = `h${level}` as const;

  return (
    <Heading
      ref={ref}
      className={cn(
        'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1]',
        'text-balance tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </Heading>
  );
});

HeroTitle.displayName = 'Hero.Title';

/**
 * Hero.Description - Supporting text for hero section
 */
const HeroDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-lg md:text-xl lg:text-2xl', 'max-w-3xl mx-auto leading-loose', className)}
      {...props}
    >
      {children}
    </p>
  );
});

HeroDescription.displayName = 'Hero.Description';

/**
 * Hero.Actions - Container for CTA buttons
 */
const HeroActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col sm:flex-row gap-3 justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

HeroActions.displayName = 'Hero.Actions';

/**
 * Hero.Content - Wrapper for hero content with max-width
 */
const HeroContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('max-w-4xl mx-auto space-y-6 md:space-y-8', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

HeroContent.displayName = 'Hero.Content';

/**
 * Hero.Stats - Container for stats grid
 */
const HeroStats = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pt-6 md:pt-8',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

HeroStats.displayName = 'Hero.Stats';

// Compound component pattern
export const HeroRoot = Object.assign(Hero, {
  Badge: HeroBadge,
  Title: HeroTitle,
  Description: HeroDescription,
  Actions: HeroActions,
  Content: HeroContent,
  Stats: HeroStats,
});

export default HeroRoot;
