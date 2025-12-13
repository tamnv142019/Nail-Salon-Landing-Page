export function smoothScrollToId(
  id: string,
  options?: {
    duration?: number;
    offset?: number;
  },
) {
  if (typeof window === 'undefined') return;

  const target = document.getElementById(id);
  if (!target) return;

  const startPosition = window.scrollY;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
  const distance = targetPosition - startPosition;
  const duration = options?.duration ?? 1500;

  let start: number | null = null;

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const scroll = (timestamp: number) => {
    if (start === null) start = timestamp;
    const progress = (timestamp - start) / duration;

    if (progress < 1) {
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
      requestAnimationFrame(scroll);
      return;
    }

    window.scrollTo(0, targetPosition);
  };

  requestAnimationFrame(scroll);
}
