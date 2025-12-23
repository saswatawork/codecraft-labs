'use client';

import { Button, Input } from '@ccl/ui';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password: 'dev',
        redirect: false,
      });
      if (result?.ok) {
        router.push('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 sm:p-10 shadow-xl border dark:bg-gray-900 dark:border-gray-800">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
            <span className="text-3xl">🎬</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">YouTube Studio</h1>
          <p className="text-sm text-muted-foreground">AI-powered video creation platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email (Development Mode)
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter any email"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Continue'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground pt-4 border-t">
          Development mode - enter any email to continue
        </p>
      </div>
    </div>
  );
}
