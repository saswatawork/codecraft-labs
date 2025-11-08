import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';
import { buttonVariants } from '../../utils/variants';

/**
 * Base Button props extending variant props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a Slot component
   * This allows composition with other components (useful for links, etc.)
   */
  asChild?: boolean;
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean;
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
  /**
   * Render as different element type
   */
  as?: React.ElementType;
}

/**
 * Loading spinner component
 */
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin h-4 w-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button Component
 *
 * A flexible, accessible button component with multiple variants and states.
 * Supports polymorphic rendering, loading states, and icon composition.
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 *
 * // Button as link
 * <Button as="a" href="/login">Login</Button>
 *
 * // Button with variants
 * <Button variant="secondary" size="lg">Large Secondary</Button>
 *
 * // Button with loading state
 * <Button loading>Processing...</Button>
 *
 * // Button with icons
 * <Button leftIcon={<Icon />} rightIcon={<ArrowIcon />}>
 *   With Icons
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default", 
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = disabled || loading;

    // If asChild is true, use Slot for composition
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            buttonVariants({
              variant: variant as any,
              size: size as any,
            }),
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    // Render as specified component (default: button)
    const ButtonComponent = Component as any;

    return (
      <ButtonComponent
        ref={ref}
        type={Component === "button" ? "button" : undefined}
        className={cn(
          buttonVariants({
            variant: variant as any,
            size: size as any,
          }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && <Spinner className="mr-2" />}

        {/* Left icon */}
        {leftIcon && !loading && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}

        {/* Button content */}
        {children}

        {/* Right icon */}
        {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
      </ButtonComponent>
    );
  }
);

Button.displayName = 'Button';

export default Button;
