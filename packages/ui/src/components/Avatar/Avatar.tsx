import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../utils';

// Avatar Variants using CVA
const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const avatarImageVariants = cva('aspect-square h-full w-full object-cover');

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const avatarStatusVariants = cva('absolute rounded-full border-2 border-background', {
  variants: {
    status: {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    },
    size: {
      xs: 'h-1.5 w-1.5 bottom-0 right-0',
      sm: 'h-2 w-2 bottom-0 right-0',
      md: 'h-2.5 w-2.5 bottom-0 right-0',
      lg: 'h-3 w-3 bottom-0 right-0',
      xl: 'h-3.5 w-3.5 bottom-0 right-0',
      '2xl': 'h-4 w-4 bottom-0.5 right-0.5',
    },
  },
});

// Avatar Interfaces
export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  className?: string;
  children?: React.ReactNode;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {
  className?: string;
  children?: React.ReactNode;
}

export interface AvatarStatusProps extends VariantProps<typeof avatarStatusVariants> {
  className?: string;
}

// Avatar Root Component
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, children, ...props }, ref) => (
    <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
      {children}
    </div>
  )
);
Avatar.displayName = 'Avatar';

// Avatar Image Component
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = '', ...props }, ref) => (
    // biome-ignore lint/a11y/useAltText: Alt text is provided via props, empty fallback is intentional for avatar images
    <img ref={ref} className={cn(avatarImageVariants(), className)} alt={alt} {...props} />
  )
);
AvatarImage.displayName = 'AvatarImage';

// Avatar Fallback Component
export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div ref={ref} className={cn(avatarFallbackVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
);
AvatarFallback.displayName = 'AvatarFallback';

// Avatar Status Indicator Component
export const AvatarStatus = forwardRef<HTMLDivElement, AvatarStatusProps>(
  ({ className, status, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarStatusVariants({ status, size }), className)}
      aria-label={status ? `User is ${status}` : undefined}
      {...props}
    />
  )
);
AvatarStatus.displayName = 'AvatarStatus';

// Compound Avatar with Image and Fallback
export interface CompoundAvatarProps extends AvatarProps {
  src?: string | undefined;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  fallbackVariant?: VariantProps<typeof avatarFallbackVariants>['variant'];
}

export const CompoundAvatar = forwardRef<HTMLDivElement, CompoundAvatarProps>(
  (
    {
      className = '',
      size,
      src,
      alt,
      fallback,
      status,
      fallbackVariant = 'default',
      children,
      ...props
    },
    ref
  ) => {
    // Generate initials from alt or fallback
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const displayFallback = fallback ? getInitials(fallback) : alt ? getInitials(alt) : '?';

    return (
      <Avatar ref={ref} size={size} className={className || ''} {...props}>
        {src ? (
          <>
            <AvatarImage src={src} alt={alt || ''} />
            <AvatarFallback variant={fallbackVariant}>{displayFallback}</AvatarFallback>
          </>
        ) : (
          <AvatarFallback variant={fallbackVariant}>{displayFallback}</AvatarFallback>
        )}
        {status && <AvatarStatus status={status} size={size} />}
        {children}
      </Avatar>
    );
  }
);
CompoundAvatar.displayName = 'CompoundAvatar';

export default Avatar;
