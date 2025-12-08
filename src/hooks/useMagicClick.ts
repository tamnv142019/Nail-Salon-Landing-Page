import { useCallback } from 'react';

export function useMagicClick() {
  const createMagicEffect = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create sparkle particles
    const sparkles = ['✨', '💫', '⭐', '✨'];
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('div');
      particle.className = `magic-particle move-${(i % 3) + 1}`;
      particle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      
      // Set initial position at click point
      particle.style.left = (rect.left + x) + 'px';
      particle.style.top = (rect.top + y) + 'px';
      
      // Random direction for particle movement
      const angle = (Math.PI * 2 * i) / 4 + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 50; // Bias upward
      
      // Set CSS variables for animation
      particle.style.setProperty('--tx-val', `${tx}px`);
      particle.style.setProperty('--ty-val', `${ty}px`);
      
      document.body.appendChild(particle);
      
      // Remove after animation completes
      setTimeout(() => particle.remove(), 1000);
    }
  }, []);

  return { createMagicEffect };
}
