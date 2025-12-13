interface SectionDividerProps {
  variant?: 'wave' | 'dots' | 'gradient';
}

export function SectionDivider({ variant = 'wave' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className="relative h-20 flex items-center justify-center">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-500 animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className="relative h-20 flex items-center justify-center overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
      </div>
    );
  }

  // Wave variant
  return (
    <div className="relative h-20 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-20 text-gray-50 dark:text-gray-950 transition-colors duration-500"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
