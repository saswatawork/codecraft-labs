import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils';
import { inputVariants } from '../../utils/variants';

/**
 * Base Input props extending variant props and HTML input attributes
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message - when provided, input shows error state
   */
  error?: string;
  /**
   * Icon to display on the left side of input
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of input
   */
  rightIcon?: React.ReactNode;
  /**
   * Loading state - shows spinner in right icon position
   */
  loading?: boolean;
  /**
   * Success state - shows success styling
   */
  success?: boolean;
  /**
   * Custom wrapper className
   */
  wrapperClassName?: string;
}

/**
 * Loading spinner component for input
 */
const InputSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin h-4 w-4 text-muted-foreground', className)}
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
 * Input Component
 *
 * A comprehensive input component with label, validation states, icons, and helper text.
 * Supports all standard HTML input props with additional UI enhancements.
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // Input with label and helper text
 * <Input
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 * />
 *
 * // Input with validation states
 * <Input
 *   label="Password"
 *   error="Password must be at least 8 characters"
 *   variant="error"
 * />
 *
 * // Input with icons
 * <Input
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 *
 * // Loading input
 * <Input loading placeholder="Processing..." />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      inputSize = 'md',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      loading = false,
      success = false,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || React.useId();

    // Determine variant based on states
    const finalVariant = error ? 'error' : success ? 'success' : variant;

    // Determine what to show in right position
    const rightElement = loading ? (
      <InputSpinner />
    ) : rightIcon ? (
      <span className="flex items-center">{rightIcon}</span>
    ) : null;

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <span className="text-muted-foreground">{leftIcon}</span>
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={cn(
              inputVariants({
                variant: finalVariant as any,
                inputSize: inputSize as any,
              }),
              leftIcon && 'pl-10',
              (rightElement || rightIcon) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right Icon/Spinner */}
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              {rightElement}
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
