import { useEffect, useState } from 'react';

/**
 * Custom hook for localStorage with SSR support
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue] tuple
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Custom hook for debouncing values
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 500)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for media queries
 *
 * @param query - Media query string
 * @returns Boolean indicating if query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Custom hook for handling click outside of element
 *
 * @param ref - React ref of element
 * @param handler - Function to call when clicking outside
 *
 * @example
 * const modalRef = useRef<HTMLDivElement>(null)
 * useClickOutside(modalRef, () => setIsOpen(false))
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
}

/**
 * Custom hook for copying text to clipboard
 *
 * @returns [copyToClipboard function, copied state]
 *
 * @example
 * const [copyToClipboard, copied] = useClipboard()
 * <button onClick={() => copyToClipboard('Hello World')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </button>
 */
export function useClipboard(): [(text: string) => Promise<void>, boolean] {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Failed to copy text:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return [copyToClipboard, copied];
}

/**
 * Custom hook for async operations with loading state
 *
 * @param asyncFunction - Async function to execute
 * @returns { execute, loading, error, data }
 *
 * @example
 * const { execute, loading, error, data } = useAsync(fetchUserData)
 * useEffect(() => { execute(userId) }, [userId])
 */
export function useAsync<T, Args extends unknown[]>(asyncFunction: (...args: Args) => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (...args: Args): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
}
