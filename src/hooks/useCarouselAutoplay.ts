import { useEffect, useState, type RefObject } from 'react';

/** Only rotate visible carousels when motion and user interaction allow it. */
export function useCarouselAutoplay(
  advance: () => void,
  paused: boolean,
  region: RefObject<HTMLElement | null>,
  delay = 6000,
  explicitlyPlaying = false,
) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);
  useEffect(() => {
    const element = region.current;
    if (!element || paused) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      if (visible && !document.hidden && (!motionPreference.matches || explicitlyPlaying)) {
        timer = setInterval(advance, delay);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .2 });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    motionPreference.addEventListener('change', sync);
    return () => {
      if (timer !== undefined) clearInterval(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motionPreference.removeEventListener('change', sync);
    };
  }, [advance, paused, region, delay, explicitlyPlaying]);
  return !reducedMotion || explicitlyPlaying;
}
