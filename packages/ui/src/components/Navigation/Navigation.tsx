import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

// Navigation Variants using CVA
const navigationVariants = cva(
  'flex w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        ghost: 'border-transparent shadow-none',
        floating: 'rounded-lg border shadow-md mx-4 mt-4',
      },
      size: {
        sm: 'h-14 px-4',
        md: 'h-16 px-6',
        lg: 'h-18 px-8',
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0 z-40',
        fixed: 'fixed top-0 left-0 right-0 z-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'sticky',
    },
  },
);

const navigationContainerVariants = cva(
  'flex items-center justify-between w-full max-w-screen-xl mx-auto',
  {
    variants: {
      spacing: {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  },
);

const navigationBrandVariants = cva(
  'flex items-center space-x-2 font-bold text-gray-900 tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const navigationMenuVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row space-x-1',
      vertical: 'flex-col space-y-1',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    wrap: false,
  },
});

const navigationItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        active: 'text-gray-900 bg-gray-100 font-semibold',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-transparent',
        underline:
          'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 rounded-none',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const navigationToggleVariants = cva(
  'inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring sm:hidden',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// Navigation Interfaces
export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationContainerVariants> {
  className?: string;
}

export interface NavigationBrandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationBrandVariants> {
  className?: string;
  href?: string;
  logo?: React.ReactNode;
  text?: string;
  as?: React.ElementType;
}

export interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationMenuVariants> {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navigationItemVariants> {
  className?: string;
  asChild?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

export interface NavigationToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationToggleVariants> {
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export interface NavigationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Navigation Context
interface NavigationContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavigationContext = React.createContext<NavigationContextValue | null>(null);

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('Navigation components must be used within a Navigation');
  }
  return context;
};

// Navigation Root Component
export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ className, variant, size, position, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <NavigationContext.Provider value={{ isOpen, setIsOpen }}>
        <nav
          ref={ref}
          className={cn(navigationVariants({ variant, size, position }), className)}
          {...props}
        >
          {children}
        </nav>
      </NavigationContext.Provider>
    );
  },
);
Navigation.displayName = 'Navigation';

// Navigation Container Component
export const NavigationContainer = forwardRef<HTMLDivElement, NavigationContainerProps>(
  ({ className, spacing, ...props }, ref) => (
    <div ref={ref} className={cn(navigationContainerVariants({ spacing }), className)} {...props} />
  ),
);
NavigationContainer.displayName = 'NavigationContainer';

// Navigation Brand Component
export const NavigationBrand = forwardRef<HTMLDivElement, NavigationBrandProps>(
  ({ className, size, href, logo, text, as: Component = 'div', children, ...props }, ref) => {
    const brandContent = (
      <>
        {logo && <div className="flex-shrink-0">{logo}</div>}
        {text && <span>{text}</span>}
        {children}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(navigationBrandVariants({ size }), className)}
        >
          {brandContent}
        </a>
      );
    }

    return (
      <Component ref={ref} className={cn(navigationBrandVariants({ size }), className)} {...props}>
        {brandContent}
      </Component>
    );
  },
);
NavigationBrand.displayName = 'NavigationBrand';

// Navigation Menu Component
export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, orientation, wrap, children, ...props }, ref) => {
    const { isOpen } = useNavigation();

    return (
      <div
        ref={ref}
        className={cn(
          navigationMenuVariants({ orientation, wrap }),
          // Mobile menu visibility
          'sm:flex',
          isOpen ? 'flex' : 'hidden',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
NavigationMenu.displayName = 'NavigationMenu';

// Navigation Item Component
export const NavigationItem = forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ className, variant, size, asChild = false, active = false, children, ...props }, ref) => {
    const itemVariant = active ? 'active' : variant;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(navigationItemVariants({ variant: itemVariant, size }), className),
        ref,
        ...props,
      });
    }

    return (
      <a
        ref={ref}
        className={cn(navigationItemVariants({ variant: itemVariant, size }), className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);
NavigationItem.displayName = 'NavigationItem';

// Navigation Toggle Component (Mobile Menu Toggle)
export const NavigationToggle = forwardRef<HTMLButtonElement, NavigationToggleProps>(
  ({ className, size, isOpen: controlledIsOpen, onToggle, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen } = useNavigation();

    // Use controlled state if provided, otherwise use context
    const currentIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const newIsOpen = !currentIsOpen;

      if (onToggle) {
        onToggle(newIsOpen);
      } else {
        setIsOpen(newIsOpen);
      }

      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(navigationToggleVariants({ size }), className)}
        onClick={handleClick}
        aria-expanded={currentIsOpen}
        aria-label="Toggle navigation menu"
        {...props}
      >
        {/* Hamburger icon */}
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {currentIsOpen ? (
            // Close icon
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            // Hamburger icon
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    );
  },
);
NavigationToggle.displayName = 'NavigationToggle';

// Navigation Actions Component
export const NavigationActions = forwardRef<HTMLDivElement, NavigationActionsProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center space-x-2', className)} {...props} />
  ),
);
NavigationActions.displayName = 'NavigationActions';

// Compound Navigation Component for convenience
export interface CompoundNavigationProps extends NavigationProps {
  brand?: {
    logo?: React.ReactNode;
    text?: string;
    href?: string;
  };
  items?: Array<{
    label: string;
    href: string;
    active?: boolean;
    variant?: NavigationItemProps['variant'];
  }>;
  actions?: React.ReactNode;
  showToggle?: boolean;
  containerSpacing?: NavigationContainerProps['spacing'];
}

export const CompoundNavigation: React.FC<CompoundNavigationProps> = ({
  brand,
  items = [],
  actions,
  showToggle = true,
  containerSpacing,
  children,
  ...navigationProps
}) => {
  return (
    <Navigation {...navigationProps}>
      <NavigationContainer spacing={containerSpacing}>
        {/* Brand Section */}
        {brand && (
          <NavigationBrand
            {...(brand.logo && { logo: brand.logo })}
            {...(brand.text && { text: brand.text })}
            {...(brand.href && { href: brand.href })}
          />
        )}

        {/* Mobile Menu Toggle */}
        {showToggle && <NavigationToggle />}

        {/* Navigation Menu */}
        <NavigationMenu className="sm:flex-1 sm:justify-center">
          {items.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              active={item.active || false}
              variant={item.variant}
            >
              {item.label}
            </NavigationItem>
          ))}
          {children}
        </NavigationMenu>

        {/* Actions Section */}
        {actions && <NavigationActions className="hidden sm:flex">{actions}</NavigationActions>}
      </NavigationContainer>
    </Navigation>
  );
};

export default Navigation;
