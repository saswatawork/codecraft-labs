import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';
import { cardVariants } from '../../utils/variants';

/**
 * Base Card props extending variant props
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Custom class name for additional styling
   */
  className?: string;
}

/**
 * Card component - A flexible container for grouping related content
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Content goes here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
  ),
);

Card.displayName = 'Card';

/**
 * CardHeader props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * CardHeader - Container for card title and description
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle props
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  /**
   * HTML heading level - defaults to h3
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * CardTitle - Main title for the card
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription props
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

/**
 * CardDescription - Subtitle or description for the card
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent props
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * CardContent - Main content area of the card
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * CardFooter - Footer area for actions or additional information
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
