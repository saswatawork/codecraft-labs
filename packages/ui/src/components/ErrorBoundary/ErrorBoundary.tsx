/**
 * React Error Boundary Component
 * Catches errors in component tree and displays fallback UI
 */

'use client';

import React, { Component, type ReactNode } from 'react';
import { errorLogger, type ErrorInfo } from '../utils/error-handling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * 
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={<ErrorFallback />}
 *   onError={(error) => console.error(error)}
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    errorLogger.log(error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.state.hasError && this.props.resetKeys) {
      const hasResetKeyChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      
      if (hasResetKeyChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.reset);
      }
      
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }): ReactNode {
  return (
    <div
      role="alert"
      style={{
        padding: '2rem',
        margin: '2rem',
        border: '1px solid #ef4444',
        borderRadius: '0.5rem',
        backgroundColor: '#fef2f2',
      }}
    >
      <h2 style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '1.25rem' }}>
        Something went wrong
      </h2>
      <details style={{ marginBottom: '1rem' }}>
        <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
          Error details
        </summary>
        <pre
          style={{
            padding: '1rem',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.25rem',
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
          {error.message}
        </pre>
      </details>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc2626',
          color: '#fff',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Try again
      </button>
    </div>
  );
}

/**
 * Custom hook for error boundaries in functional components
 */
export function useErrorHandler(): (error: Error) => void {
  const [, setError] = React.useState<Error>();

  return React.useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}
