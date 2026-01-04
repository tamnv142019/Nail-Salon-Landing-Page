export const BUSINESS_TIMEZONE = 'America/Los_Angeles';

// Returns whether the business is currently open in San Diego time.
// Hours:
// - Mon–Fri: 09:00–19:00
// - Sat:     09:00–18:00
// - Sun:     10:00–17:00
export function isBusinessOpenNow(now: Date = new Date()): boolean {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIMEZONE,
    weekday: 'short',
  });

  const weekdayStr = weekdayFormatter.format(now);
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekday = weekdayMap[weekdayStr];
  if (weekday === undefined) return false;

  const parts = timeFormatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const timeInMinutes = hour * 60 + minute;

  // Mon-Fri
  if (weekday >= 1 && weekday <= 5) {
    return timeInMinutes >= 9 * 60 && timeInMinutes < 19 * 60;
  }

  // Sat
  if (weekday === 6) {
    return timeInMinutes >= 9 * 60 && timeInMinutes < 18 * 60;
  }

  // Sun
  if (weekday === 0) {
    return timeInMinutes >= 10 * 60 && timeInMinutes < 17 * 60;
  }

  return false;
}
