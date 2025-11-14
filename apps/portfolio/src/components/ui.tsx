import Link from 'next/link';
import React, { type ReactNode } from 'react';

// Minimal placeholder components without React.FC to avoid type friction with React 19 typings.

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
  asChild?: boolean;
};
export function Button({ children, asChild, className = '', ...rest }: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      className: `${(children as any).props.className || ''}`,
    });
  }
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  className = '',
}: { children: ReactNode; className?: string; variant?: string; size?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-semibold tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border rounded-xl bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}
export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2">{children}</div>;
}
export function CardTitle({
  children,
  className = '',
}: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold leading-tight ${className}`}>{children}</h3>;
}
export function CardContent({
  children,
  className = '',
}: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function Avatar({
  src,
  fallback,
  className = '',
}: { src?: string; fallback?: string; size?: string; className?: string }) {
  return (
    <div
      className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}
      style={{ width: 160, height: 160 }}
    >
      {src ? (
        <img src={src} alt={fallback} className="object-cover w-full h-full" />
      ) : (
        <span className="text-gray-600 font-semibold">{fallback}</span>
      )}
    </div>
  );
}

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
interface NavBrand {
  text: string;
  href: string;
}
export function CompoundNavigation({
  brand,
  items,
  actions,
}: {
  brand: NavBrand;
  items: NavItem[];
  actions?: ReactNode;
  variant?: string;
  position?: string;
}) {
  return (
    <nav className="w-full backdrop-blur bg-white/60 border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
        <Link href={brand.href} className="font-bold text-lg tracking-tight">
          {brand.text}
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`text-sm font-medium ${i.active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {i.label}
            </Link>
          ))}
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </nav>
  );
}
