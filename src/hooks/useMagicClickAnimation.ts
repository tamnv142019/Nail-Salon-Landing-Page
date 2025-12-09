import { useCallback } from 'react';

interface MagicClickConfig {
  particleCount?: number;
  duration?: number;
  colors?: string[];
}

export function useMagicClickAnimation(config: MagicClickConfig = {}) {
  const {
    particleCount = 12,
    duration = 600,
    colors = ['#ff6b9d', '#ffa502', '#ffff00', '#00d4ff', '#a78bfa', '#ec4899'],
  } = config;

  const createMagicEffect = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 4 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: 8px;
          height: 8px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 12px ${color}, 0 0 24px ${color}aa;
          animation: magicParticle ${duration}ms ease-out forwards;
          --tx: ${Math.cos(angle) * velocity * 50}px;
          --ty: ${Math.sin(angle) * velocity * 50}px;
          --rotate: ${Math.random() * 360}deg;
          z-index: 1000;
        `;

        button.style.position = 'relative';
        button.appendChild(particle);

        // Clean up after animation
        setTimeout(() => particle.remove(), duration);
      }

      // Add ripple effect to button
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        animation: magicRipple ${duration}ms ease-out forwards;
      `;

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), duration);
    },
    [particleCount, duration, colors]
  );

  return createMagicEffect;
}

// Add keyframe animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes magicParticle {
      0% {
        opacity: 1;
        transform: translate(0, 0) rotate(0deg) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(var(--tx), var(--ty)) rotate(var(--rotate)) scale(0);
      }
    }

    @keyframes magicRipple {
      0% {
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        width: 400px;
        height: 400px;
        opacity: 0;
        margin-left: -200px;
        margin-top: -200px;
      }
    }

    @keyframes magicPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(236, 72, 153, 0);
      }
    }
  `;
  document.head.appendChild(style);
}
