type EventParams = Record<string, any>;

export const gtag = (...args: any[]) => {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  if (typeof (window as any).gtag === 'function') {
    // @ts-ignore
    (window as any).gtag(...args);
  } else {
    // push to dataLayer as fallback
    // @ts-ignore
    window.dataLayer.push(args);
  }
};

export const trackEvent = (action: string, params: EventParams = {}) => {
  gtag('event', action, params);
};
