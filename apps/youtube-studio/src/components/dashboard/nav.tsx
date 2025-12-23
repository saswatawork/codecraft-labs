'use client';

import { cn } from '@/lib/utils';
import { Button } from '@ccl/ui';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Library,
  LogOut,
  Mic,
  Settings,
  Video,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface DashboardNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const navItems = [
  {
    title: 'Create',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Library',
    href: '/dashboard/library',
    icon: Library,
  },
  {
    title: 'Voices',
    href: '/dashboard/voices',
    icon: Mic,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          'sticky top-0 flex h-screen min-h-screen flex-col border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div className="flex h-16 items-center border-b px-3 justify-between">
          <div className={cn('flex items-center', isCollapsed && 'justify-center w-full')}>
            <Video className="h-6 w-6 text-blue-600 shrink-0" />
            {!isCollapsed && <span className="ml-2 text-lg font-semibold">YouTube Studio</span>}
          </div>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                  isCollapsed && 'justify-center',
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sticky bottom-0 border-t p-3 bg-gray-50 dark:bg-gray-900">
          {!isCollapsed && (
            <div className="mb-3 flex items-center gap-3 px-3">
              {user?.image && (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="h-8 w-8 rounded-full shrink-0"
                />
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user?.name || 'Guest'}</p>
                <p className="truncate text-xs text-gray-500">{user?.email || 'Not signed in'}</p>
              </div>
            </div>
          )}

          {isCollapsed && user?.image && (
            <div className="mb-3 flex justify-center px-2">
              <img src={user.image} alt={user.name || 'User'} className="h-8 w-8 rounded-full" />
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className={cn('w-full', isCollapsed && 'px-2')}
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut className={cn('h-4 w-4', !isCollapsed && 'mr-2')} />
            {!isCollapsed && 'Sign Out'}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </>
  );
}
