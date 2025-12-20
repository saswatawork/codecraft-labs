'use client';

import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn('flex-1 overflow-auto', className)}>
      <div className="container py-6">{children}</div>
    </div>
  );
}
