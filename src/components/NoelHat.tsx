type NoelHatProps = {
  className?: string;
};

export function NoelHat({ className }: NoelHatProps) {
  const defaultClassName =
    "absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-12 origin-bottom-left animate-hat-sway motion-reduce:animate-none pointer-events-none";

  return (
    <svg
      className={className ?? defaultClassName}
      viewBox="0 0 100 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main red part of the hat */}
      <path
        d="M 20 60 L 15 40 Q 15 20, 50 15 Q 85 20, 85 40 L 80 60 Z"
        fill="var(--brand-ruby)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      
      {/* White fur trim at bottom */}
      <ellipse
        cx="50"
        cy="62"
        rx="35"
        ry="8"
        fill="var(--brand-light)"
      />
      
      {/* White fur details on sides */}
      <path
        d="M 25 50 Q 20 55, 22 62"
        fill="none"
        stroke="var(--brand-light)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 75 50 Q 80 55, 78 62"
        fill="none"
        stroke="var(--brand-light)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Pom pom at the top */}
      <circle
        cx="50"
        cy="8"
        r="7"
        fill="var(--brand-light)"
      />
      
      {/* Pom pom shine */}
      <circle
        cx="52"
        cy="6"
        r="2"
        fill="var(--background-secondary)"
        opacity="0.8"
      />
      
      {/* Decorative holly berries */}
      <circle
        cx="35"
        cy="45"
        r="2"
        fill="var(--brand-emerald)"
      />
      <circle
        cx="40"
        cy="50"
        r="2"
        fill="var(--brand-emerald)"
      />
      <circle
        cx="65"
        cy="48"
        r="2"
        fill="var(--brand-emerald)"
      />
      
      {/* Gold accents */}
      <circle
        cx="50"
        cy="52"
        r="3"
        fill="var(--brand-gold)"
      />

      {/* Simple Santa face under the hat */}
      <g>
        {/* Face */}
        <circle
          cx="50"
          cy="74"
          r="10"
          fill="var(--brand-gold-soft)"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Beard */}
        <path
          d="M 40 74 C 40 86, 60 86, 60 74 C 60 78, 57 82, 50 84 C 43 82, 40 78, 40 74 Z"
          fill="var(--brand-light)"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.98"
        />

        {/* Mustache */}
        <path
          d="M 44 75 C 46 72, 49 72, 50 74 C 51 72, 54 72, 56 75"
          fill="none"
          stroke="var(--brand-light)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <circle cx="46.5" cy="72.5" r="1.1" fill="var(--foreground)" opacity="0.9" />
        <circle cx="53.5" cy="72.5" r="1.1" fill="var(--foreground)" opacity="0.9" />

        {/* Nose */}
        <circle cx="50" cy="75" r="1.2" fill="var(--foreground-secondary)" opacity="0.35" />
      </g>
    </svg>
  );
}
