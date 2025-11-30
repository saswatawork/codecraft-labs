'use client';

import { Button } from '@ccl/ui';

export default function SentryTestPage() {
  const throwError = () => {
    throw new Error('Test Sentry Error - This is intentional!');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Sentry Integration Test</h1>
      <p className="text-muted-foreground max-w-md text-center">
        Click the button below to trigger a test error. This will be captured by Sentry if
        configured correctly.
      </p>
      <Button onClick={throwError} variant="destructive">
        Throw Test Error
      </Button>
      <div className="text-muted-foreground text-sm">
        <p>✅ Sentry Client SDK: Installed</p>
        <p>✅ Sentry Server SDK: Installed</p>
        <p>✅ Vercel Analytics: Installed</p>
        <p>✅ Speed Insights: Installed</p>
      </div>
    </div>
  );
}
