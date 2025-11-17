/**
 * Performance monitoring utilities
 * Track Core Web Vitals and custom performance metrics
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Report Web Vitals to analytics service
 */
export function reportWebVitals(metric: WebVitalMetric): void {
  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }
}

/**
 * Custom performance mark utility
 */
export function performanceMark(markName: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(markName);
  }
}

/**
 * Measure performance between two marks
 */
export function performanceMeasure(
  measureName: string,
  startMark: string,
  endMark: string,
): number | null {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      window.performance.measure(measureName, startMark, endMark);
      const measures = window.performance.getEntriesByName(measureName);
      return measures.length > 0 && measures[0] ? measures[0].duration : null;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
      return null;
    }
  }
  return null;
}

/**
 * Get navigation timing data
 */
export function getNavigationTiming(): Record<string, number> | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const timing = window.performance.timing;
  const navigation = window.performance.navigation;

  return {
    // Navigation type
    navigationType: navigation.type,
    redirectCount: navigation.redirectCount,

    // Timing metrics
    dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
    tcpConnection: timing.connectEnd - timing.connectStart,
    serverResponse: timing.responseStart - timing.requestStart,
    pageDownload: timing.responseEnd - timing.responseStart,
    domProcessing: timing.domComplete - timing.domLoading,
    onLoad: timing.loadEventEnd - timing.loadEventStart,

    // Total times
    totalTime: timing.loadEventEnd - timing.navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    windowLoad: timing.loadEventEnd - timing.navigationStart,
  };
}

/**
 * Monitor long tasks (>50ms)
 */
export function observeLongTasks(callback: (entries: PerformanceEntryList) => void): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      callback(list.getEntries());
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.warn('Long task observation not supported:', error);
  }
}

/**
 * Track resource loading performance
 */
export function getResourceTimings(): PerformanceResourceTiming[] {
  if (typeof window === 'undefined' || !window.performance) {
    return [];
  }

  return window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
}

/**
 * Clear performance marks and measures
 */
export function clearPerformanceData(): void {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.clearMarks();
    window.performance.clearMeasures();
  }
}
