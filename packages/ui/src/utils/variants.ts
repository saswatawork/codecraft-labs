import { type VariantProps, cva } from 'class-variance-authority';

/**
 * Button component variants using CVA (Class Variance Authority)
 * Enhanced with tone system for flexible theming
 */
export const buttonVariants = cva(
  // Base styles - applied to all buttons
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Solid variants
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md',
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover shadow-sm hover:shadow-md',
        success:
          'bg-success text-success-foreground hover:bg-success-hover shadow-sm hover:shadow-md',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning-hover shadow-sm hover:shadow-md',
        info: 'bg-info text-info-foreground hover:bg-info-hover shadow-sm hover:shadow-md',

        // Soft variants (lighter backgrounds)
        soft: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
        'soft-secondary': 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/70',
        'soft-destructive': 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        'soft-success': 'bg-success/10 text-success hover:bg-success/20',
        'soft-warning': 'bg-warning/10 text-warning hover:bg-warning/20',
        'soft-info': 'bg-info/10 text-info hover:bg-info/20',

        // Outline variants
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
        'outline-primary':
          'border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground',
        'outline-destructive':
          'border-2 border-destructive text-destructive bg-background hover:bg-destructive hover:text-destructive-foreground',

        // Ghost variants
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        'ghost-primary': 'text-primary hover:bg-primary/10 hover:text-primary',
        'ghost-destructive': 'text-destructive hover:bg-destructive/10 hover:text-destructive',
        'ghost-success': 'text-success hover:bg-success/10 hover:text-success',

        // Link variant
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      tone: {
        default: '',
        blue: '',
        purple: '',
        green: '',
        orange: '',
      },
    },
    compoundVariants: [
      // Tone overrides for solid variants
      {
        variant: 'default',
        tone: 'blue',
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
      },
      {
        variant: 'default',
        tone: 'purple',
        className: 'bg-purple-600 hover:bg-purple-700 text-white',
      },
      {
        variant: 'default',
        tone: 'green',
        className: 'bg-green-600 hover:bg-green-700 text-white',
      },
      {
        variant: 'default',
        tone: 'orange',
        className: 'bg-orange-600 hover:bg-orange-700 text-white',
      },
      // Tone overrides for soft variants
      {
        variant: 'soft',
        tone: 'blue',
        className: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      },
      {
        variant: 'soft',
        tone: 'purple',
        className: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      },
      {
        variant: 'soft',
        tone: 'green',
        className: 'bg-green-100 text-green-700 hover:bg-green-200',
      },
      {
        variant: 'soft',
        tone: 'orange',
        className: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      tone: 'default',
    },
  },
);

/**
 * Card component variants
 */
export const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: '',
      elevated: 'shadow-lg',
      outlined: 'border-2',
      filled: 'bg-muted',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

/**
 * Badge component variants
 */
/**
 * Badge component variants using CVA
 * Enhanced with tone system for flexible theming
 */
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Solid variants
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'border-transparent bg-success text-success-foreground hover:bg-success/90',
        warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/90',
        info: 'border-transparent bg-info text-info-foreground hover:bg-info/90',

        // Soft variants (lighter backgrounds)
        soft: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
        'soft-secondary':
          'border-transparent bg-secondary/50 text-secondary-foreground hover:bg-secondary/70',
        'soft-destructive':
          'border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20',
        'soft-success': 'border-transparent bg-success/10 text-success hover:bg-success/20',
        'soft-warning': 'border-transparent bg-warning/10 text-warning hover:bg-warning/20',
        'soft-info': 'border-transparent bg-info/10 text-info hover:bg-info/20',

        // Outline variants
        outline: 'border-foreground/20 text-foreground hover:bg-accent',
        'outline-primary': 'border-primary text-primary hover:bg-primary/10',
        'outline-destructive': 'border-destructive text-destructive hover:bg-destructive/10',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      tone: {
        default: '',
        blue: '',
        purple: '',
        green: '',
        orange: '',
      },
    },
    compoundVariants: [
      // Tone overrides for solid variants
      {
        variant: 'default',
        tone: 'blue',
        className: 'bg-blue-600 text-white hover:bg-blue-700',
      },
      {
        variant: 'default',
        tone: 'purple',
        className: 'bg-purple-600 text-white hover:bg-purple-700',
      },
      {
        variant: 'default',
        tone: 'green',
        className: 'bg-green-600 text-white hover:bg-green-700',
      },
      {
        variant: 'default',
        tone: 'orange',
        className: 'bg-orange-600 text-white hover:bg-orange-700',
      },
      // Tone overrides for soft variants
      {
        variant: 'soft',
        tone: 'blue',
        className: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      },
      {
        variant: 'soft',
        tone: 'purple',
        className: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      },
      {
        variant: 'soft',
        tone: 'green',
        className: 'bg-green-100 text-green-700 hover:bg-green-200',
      },
      {
        variant: 'soft',
        tone: 'orange',
        className: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      tone: 'default',
    },
  },
);

/**
 * Input component variants
 */
export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success',
      },
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

// Export types for component props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;
