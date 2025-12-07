/**
 * Web Vitals and Performance Monitoring Utility
 * Tracks Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)
 */

interface VitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

const thresholds = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 600, poor: 1800 },
};

function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report Web Vitals metrics
 * Callback function receives metric data
 */
export function reportWebVitals(callback: (metric: VitalsMetric) => void) {
  try {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          const metric: VitalsMetric = {
            name: 'LCP',
            value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
            rating: getRating(lastEntry.renderTime || lastEntry.loadTime, thresholds.LCP),
            delta: 0,
            id: `lcp-${Date.now()}`,
            entries: [lastEntry],
          };
          callback(metric);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // First Input Delay (or Interaction to Next Paint for modern browsers)
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            const metric: VitalsMetric = {
              name: 'FID',
              value: Math.round(entry.processingDuration),
              rating: getRating(entry.processingDuration, thresholds.FID),
              delta: 0,
              id: `fid-${entry.startTime}`,
              entries: [entry],
            };
            callback(metric);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            if ((entry as any).hadRecentInput) return;
            clsValue += (entry as any).value;
            const metric: VitalsMetric = {
              name: 'CLS',
              value: Math.round(clsValue * 10000) / 10000,
              rating: getRating(clsValue, thresholds.CLS),
              delta: 0,
              id: `cls-${Date.now()}`,
              entries: [entry],
            };
            callback(metric);
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }
    }

    // Navigation Timing (Time to First Byte)
    if ('PerformanceNavigationTiming' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const ttfb = navigation.responseStart - navigation.fetchStart;
            const metric: VitalsMetric = {
              name: 'TTFB',
              value: Math.round(ttfb),
              rating: getRating(ttfb, thresholds.TTFB),
              delta: 0,
              id: `ttfb-${Date.now()}`,
              entries: [navigation],
            };
            callback(metric);
          }
        }, 0);
      });
    }
  } catch (e) {
    console.warn('Web Vitals reporting not available:', e);
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  const metrics: Record<string, any> = {};

  if (performance.navigation) {
    const timing = performance.timing;
    metrics.navigationTiming = {
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      domInteractive: timing.domInteractive - timing.navigationStart,
      resourceDownload: timing.responseEnd - timing.fetchStart,
    };
  }

  if (performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource');
    metrics.resourceCounts = {
      total: resources.length,
      images: resources.filter((r) => r.initiatorType === 'img').length,
      scripts: resources.filter((r) => r.initiatorType === 'script').length,
      stylesheets: resources.filter((r) => r.initiatorType === 'link').length,
    };
  }

  return metrics;
}

/**
 * Measure paint timing
 */
export function measurePaintTiming() {
  const paintings: Record<string, number> = {};

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          paintings[entry.name] = Math.round(entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Paint timing not supported
    }
  }

  return paintings;
}

/**
 * Log performance metrics to console (development)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV === 'development') {
    reportWebVitals((metric) => {
      console.log(`${metric.name} (${metric.rating}):`, metric.value);
    });

    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = getPerformanceMetrics();
        const painting = measurePaintTiming();
        console.group('Performance Metrics');
        console.table(metrics);
        console.table(painting);
        console.groupEnd();
      }, 0);
    });
  }
}
