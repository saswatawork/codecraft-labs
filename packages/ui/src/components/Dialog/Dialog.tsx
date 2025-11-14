import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

// Dialog Variants using CVA
const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
  {
    variants: {
      animation: {
        fade: 'animate-in fade-in-0 duration-300',
        scale: 'animate-in fade-in-0 zoom-in-95 duration-300',
        slide: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-300',
      },
    },
    defaultVariants: {
      animation: 'fade',
    },
  },
);

const dialogContentVariants = cva(
  'relative z-50 grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
      animation: {
        fade: 'animate-in fade-in-0 duration-200',
        scale: 'animate-in fade-in-0 zoom-in-95 duration-200',
        slide: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-200',
      },
    },
    defaultVariants: {
      size: 'md',
      animation: 'scale',
    },
  },
);

const dialogHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left');

const dialogTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');

const dialogDescriptionVariants = cva('text-sm text-muted-foreground');

const dialogFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2');

const dialogCloseVariants = cva(
  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
);

// Dialog Interfaces
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface DialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogOverlayVariants> {
  className?: string;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  className?: string;
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Dialog Context
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

// Dialog Root Component
export const Dialog: React.FC<DialogProps> = ({ open = false, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Trigger Component
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(true);
      onClick?.(event);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: handleClick,
      });
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = 'DialogTrigger';

// Dialog Portal Component
export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

// Dialog Overlay Component
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, animation, onClick, ...props }, ref) => {
    const { open, onOpenChange } = useDialog();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onOpenChange(false);
      }
      onClick?.(event);
    };

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(dialogOverlayVariants({ animation }), className)}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = 'DialogOverlay';

// Dialog Content Component
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      size,
      animation,
      children,
      onClose,
      closeOnEscape = true,
      closeOnOutsideClick = true,
      ...props
    },
    ref,
  ) => {
    const { open, onOpenChange } = useDialog();

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape') {
          onOpenChange(false);
          onClose?.();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [open, closeOnEscape, onOpenChange, onClose]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOutsideClick && event.target === event.currentTarget) {
        onOpenChange(false);
        onClose?.();
      }
    };

    if (!open) return null;

    return (
      <DialogPortal>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && closeOnEscape) {
              onOpenChange(false);
              onClose?.();
            }
          }}
        >
          <div
            ref={ref}
            className={cn(dialogContentVariants({ size, animation }), className)}
            onClick={(e) => e.stopPropagation()}
            // biome-ignore lint/a11y/useSemanticElements: intentional role attribute for ARIA compliance
            role="dialog"
            aria-modal="true"
            {...props}
          >
            {children}
          </div>
        </div>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

// Dialog Header Component
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(dialogHeaderVariants(), className)} {...props} />
  ),
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Title Component
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, as: Comp = 'h2', ...props }, ref) => (
    <Comp ref={ref} className={cn(dialogTitleVariants(), className)} {...props} />
  ),
);
DialogTitle.displayName = 'DialogTitle';

// Dialog Description Component
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(dialogDescriptionVariants(), className)} {...props} />
  ),
);
DialogDescription.displayName = 'DialogDescription';

// Dialog Footer Component
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(dialogFooterVariants(), className)} {...props} />
  ),
);
DialogFooter.displayName = 'DialogFooter';

// Dialog Close Component
export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(false);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={cn(dialogCloseVariants(), className)}
        onClick={handleClick}
        {...props}
      >
        {children || (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <span className="sr-only">Close</span>
      </button>
    );
  },
);
DialogClose.displayName = 'DialogClose';

// Compound Dialog Component for convenience
export interface CompoundDialogProps extends DialogContentProps {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  showClose?: boolean;
}

export const CompoundDialog: React.FC<CompoundDialogProps> = ({
  title,
  description,
  open = false,
  onOpenChange,
  trigger,
  footer,
  showClose = true,
  children,
  ...contentProps
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent {...contentProps}>
        {showClose && <DialogClose />}
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Dialog;
