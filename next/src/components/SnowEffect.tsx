import { useMemo } from 'react';

type SnowflakeConfig = {
  leftVw: number;
  sizePx: number;
  opacity: number;
  blurPx: number;
  durationS: number;
  delayS: number;
  drift1Px: number;
  drift2Px: number;
  rotateDeg: number;
};

type SnowEffectProps = {
  /** Number of flakes to render (safe: 50–100). */
  count?: number;
  /** When true, disables animation for users who prefer reduced motion. */
  respectReducedMotion?: boolean;
};

function clampInt(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function SnowEffect({ count = 80, respectReducedMotion = true }: SnowEffectProps) {
  const flakeCount = clampInt(count, 50, 100);

  const flakes = useMemo<SnowflakeConfig[]>(() => {
    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

    return Array.from({ length: flakeCount }, () => {
      const sizePx = randomBetween(2, 6.5);
      const durationS = randomBetween(10, 22);
      const delayS = -randomBetween(0, durationS);
      const driftMagnitude = randomBetween(12, 60);
      const drift1Px = (Math.random() > 0.5 ? 1 : -1) * driftMagnitude;
      const drift2Px = (Math.random() > 0.5 ? 1 : -1) * driftMagnitude;

      return {
        leftVw: randomBetween(0, 100),
        sizePx,
        opacity: randomBetween(0.25, 0.9),
        blurPx: randomBetween(0, 1.6),
        durationS,
        delayS,
        drift1Px,
        drift2Px,
        rotateDeg: randomBetween(-140, 140),
      };
    });
  }, [flakeCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      <style>
        {`
          ${respectReducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            .snowfx-flake { animation: none !important; }
          }
          ` : ''}

          @keyframes snowfx-fall {
            0% {
              transform: translate3d(0, -12vh, 0) rotate(0deg);
              opacity: var(--snowfx-opacity);
            }
            50% {
              transform: translate3d(var(--snowfx-drift1), 48vh, 0) rotate(var(--snowfx-rotate));
              opacity: var(--snowfx-opacity);
            }
            100% {
              transform: translate3d(var(--snowfx-drift2), 112vh, 0) rotate(var(--snowfx-rotate));
              opacity: 0;
            }
          }
        `}
      </style>

      {flakes.map((flake, index) => (
        <span
           
          key={index}
          className="absolute top-0"
          style={{ left: `${flake.leftVw}vw` }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="snowfx-flake block will-change-transform"
            width={flake.sizePx}
            height={flake.sizePx}
            viewBox="0 0 100 100"
            style={
              {
                filter: `blur(${flake.blurPx}px) drop-shadow(0 0 8px rgba(255, 255, 255, 0.22))`,
                color: 'rgba(255, 255, 255, 0.92)',
                animation: `snowfx-fall ${flake.durationS}s linear ${flake.delayS}s infinite`,
                ['--snowfx-opacity' as any]: String(flake.opacity),
                ['--snowfx-drift1' as any]: `${flake.drift1Px}px`,
                ['--snowfx-drift2' as any]: `${flake.drift2Px}px`,
                ['--snowfx-rotate' as any]: `${flake.rotateDeg}deg`,
              } as React.CSSProperties
            }
          >
            {/* Petal-style snowflake (6 rounded "cánh") */}
            <g fill="currentColor">
              {Array.from({ length: 6 }).map((_, i) => (
                <ellipse
                   
                  key={i}
                  cx="50"
                  cy="28"
                  rx="10"
                  ry="22"
                  transform={`rotate(${i * 60} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="10" />
              <circle cx="50" cy="50" r="4" fill="rgba(255, 255, 255, 0.65)" />
            </g>
          </svg>
        </span>
      ))}
    </div>
  );
}
