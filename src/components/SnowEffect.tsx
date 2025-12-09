import { useEffect, useRef } from 'react';

// SVG Snowflake component
function Snowflake({ x, y, size, opacity, delay }: { x: number; y: number; size: number; opacity: number; delay: number }) {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity,
        animation: `float ${20 + Math.random() * 20}s infinite ease-in-out`,
        animationDelay: `${delay}s`,
      }}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#ffffff" opacity={opacity}>
        {/* Main star */}
        <path d="M50 0 L61 35 L100 50 L61 65 L50 100 L39 65 L0 50 L39 35 Z" />
        {/* Smaller branches */}
        <circle cx="50" cy="50" r="8" />
        <path d="M50 25 L45 40 L55 40 Z" />
        <path d="M50 75 L45 60 L55 60 Z" />
        <path d="M25 50 L40 45 L40 55 Z" />
        <path d="M75 50 L60 45 L60 55 Z" />
      </g>
    </svg>
  );
}

export function SnowEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createFallingSnowflake = () => {
      const snowflake = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 2;
      const xOffset = Math.random() * window.innerWidth;
      const opacity = Math.random() * 0.7 + 0.3;

      snowflake.style.position = 'fixed';
      snowflake.style.top = '-10px';
      snowflake.style.left = xOffset + 'px';
      snowflake.style.width = size + 'px';
      snowflake.style.height = size + 'px';
      snowflake.style.backgroundColor = '#ffffff';
      snowflake.style.borderRadius = '50%';
      snowflake.style.pointerEvents = 'none';
      snowflake.style.zIndex = '5';
      snowflake.style.opacity = String(opacity);
      snowflake.style.boxShadow = `0 0 ${size}px rgba(255, 255, 255, 0.8)`;

      // Add CSS keyframes for falling animation
      if (!document.getElementById('snowAnimation')) {
        const style = document.createElement('style');
        style.id = 'snowAnimation';
        style.textContent = `
          @keyframes fall {
            to {
              transform: translateY(100vh) translateX(${(Math.random() - 0.5) * 200}px);
              opacity: 0;
            }
          }
          @keyframes sway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(${Math.random() * 40 - 20}px) rotate(180deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `;
        document.head.appendChild(style);
      }

      snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite, sway ${duration * 0.3}s ease-in-out ${delay}s infinite`;

      container.appendChild(snowflake);

      // Clean up after animation completes
      setTimeout(
        () => {
          snowflake.remove();
        },
        (duration + delay) * 1000
      );
    };

    // Create snowflakes at intervals
    const interval = setInterval(createFallingSnowflake, 300);

    // Create initial batch of snowflakes
    for (let i = 0; i < 10; i++) {
      setTimeout(createFallingSnowflake, i * 100);
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Create background snowflakes
    const backgroundSnowflakes = [];
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.15 + 0.05;
      const delay = Math.random() * 20;

      const snowflakeEl = document.createElement('div');
      snowflakeEl.style.position = 'fixed';
      snowflakeEl.style.left = `${x}%`;
      snowflakeEl.style.top = `${y}%`;
      snowflakeEl.style.width = `${size}px`;
      snowflakeEl.style.height = `${size}px`;
      snowflakeEl.style.pointerEvents = 'none';
      snowflakeEl.style.zIndex = '2';
      snowflakeEl.style.opacity = String(opacity);
      snowflakeEl.style.animation = `float ${20 + Math.random() * 20}s infinite ease-in-out`;
      snowflakeEl.style.animationDelay = `${delay}s`;

      // Create SVG snowflake
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
      svg.style.width = '100%';
      svg.style.height = '100%';

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('fill', '#ffffff');
      g.setAttribute('opacity', String(opacity));

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M50 0 L61 35 L100 50 L61 65 L50 100 L39 65 L0 50 L39 35 Z');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '8');

      g.appendChild(path);
      g.appendChild(circle);
      svg.appendChild(g);
      snowflakeEl.appendChild(svg);

      background.appendChild(snowflakeEl);
      backgroundSnowflakes.push(snowflakeEl);
    }

    return () => {
      backgroundSnowflakes.forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: '2',
          overflow: 'hidden',
        }}
      />
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
}
