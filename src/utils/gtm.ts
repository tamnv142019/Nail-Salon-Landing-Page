export function pushToDataLayer(event: string, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  window.dataLayer.push({ event, ...payload });
}
