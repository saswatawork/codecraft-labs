/**
 * Error boundary utilities for React applications
 */

export interface ErrorInfo {
  componentStack: string;
}

/**
 * Error logging service
 * Replace with your preferred error tracking service (Sentry, Rollbar, etc.)
 */
export const errorLogger = {
  log: (error: Error, errorInfo?: ErrorInfo): void => {
    // Log to console in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.error('Error logged:', error);
      if (errorInfo) {
        console.error('Component stack:', errorInfo.componentStack);
      }
    }

    // In production, send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  },

  logWarning: (message: string, context?: Record<string, unknown>): void => {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.warn(message, context);
    }
    // Send warnings to tracking service if needed
  },
};

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: Error): string {
  // Network errors
  if (error.message.includes('fetch') || error.message.includes('network')) {
    return 'Unable to connect. Please check your internet connection.';
  }

  // Authentication errors
  if (error.message.includes('auth') || error.message.includes('unauthorized')) {
    return 'Please log in to continue.';
  }

  // Validation errors
  if (error.message.includes('validation') || error.message.includes('invalid')) {
    return 'Please check your input and try again.';
  }

  // Generic error
  return 'Something went wrong. Please try again later.';
}

/**
 * Retry mechanism for failed operations
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Operation failed');

      if (i < maxRetries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
}

/**
 * Safe async wrapper
 * Returns [error, data] tuple
 */
export async function safeAsync<T>(
  promise: Promise<T>,
): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error instanceof Error ? error : new Error('Unknown error'), null];
  }
}

/**
 * Error boundary state management
 */
export class ErrorBoundaryManager {
  private static instance: ErrorBoundaryManager;
  private errorHandlers: Map<string, (error: Error) => void> = new Map();

  static getInstance(): ErrorBoundaryManager {
    if (!ErrorBoundaryManager.instance) {
      ErrorBoundaryManager.instance = new ErrorBoundaryManager();
    }
    return ErrorBoundaryManager.instance;
  }

  registerHandler(id: string, handler: (error: Error) => void): void {
    this.errorHandlers.set(id, handler);
  }

  unregisterHandler(id: string): void {
    this.errorHandlers.delete(id);
  }

  handleError(error: Error, id?: string): void {
    if (id && this.errorHandlers.has(id)) {
      this.errorHandlers.get(id)?.(error);
    }
    errorLogger.log(error);
  }
}

/**
 * Check if error is recoverable
 */
export function isRecoverableError(error: Error): boolean {
  const recoverableErrors = [
    'network',
    'timeout',
    'fetch',
    'abort',
    'ECONNREFUSED',
    'ETIMEDOUT',
  ];

  return recoverableErrors.some((keyword) =>
    error.message.toLowerCase().includes(keyword.toLowerCase()),
  );
}

/**
 * Create error with additional context
 */
export function createContextualError(
  message: string,
  context: Record<string, unknown>,
  originalError?: Error,
): Error {
  const error = new Error(message);
  
  // Add context as custom properties
  Object.assign(error, { context, originalError });
  
  return error;
}

/**
 * Validate and sanitize error for display
 */
export function sanitizeError(error: unknown): {
  message: string;
  stack?: string | undefined;
  code?: string | undefined;
} {
  if (error instanceof Error) {
    const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';
    return {
      message: error.message,
      stack: isDev ? error.stack : undefined,
      code: (error as { code?: string }).code,
    };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  return { message: 'An unknown error occurred' };
}

/**
 * Async error boundary HOC helper
 */
export function withAsyncErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  onError?: (error: Error) => void,
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Async operation failed');
      errorLogger.log(err);
      onError?.(err);
      throw err;
    }
  }) as T;
}
