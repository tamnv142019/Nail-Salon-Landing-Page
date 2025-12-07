// Custom SVG nail polish bottle icon
export function NailPolishIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottle body */}
      <path
        d="M8 10 L8 20 C8 21 9 22 10 22 L14 22 C15 22 16 21 16 20 L16 10 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Bottle neck */}
      <path
        d="M10 7 L10 10 L14 10 L14 7 Z"
        fill="currentColor"
      />
      {/* Cap base */}
      <rect
        x="9"
        y="5"
        width="6"
        height="2"
        rx="1"
        fill="currentColor"
      />
      {/* Brush handle */}
      <path
        d="M11.5 2 L11.5 5 L12.5 5 L12.5 2 Z"
        fill="currentColor"
      />
      {/* Brush tip */}
      <circle
        cx="12"
        cy="1.5"
        r="1"
        fill="currentColor"
      />
      {/* Shine effect */}
      <path
        d="M10 12 L10 18 C10 18.5 10.5 19 11 19"
        stroke="white"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Custom SVG nail file icon
export function NailFileIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* File body */}
      <path
        d="M4 8 L20 8 C20.5 8 21 8.5 21 9 L21 15 C21 15.5 20.5 16 20 16 L4 16 C3.5 16 3 15.5 3 15 L3 9 C3 8.5 3.5 8 4 8 Z"
        fill="currentColor"
      />
      {/* Texture lines */}
      <path d="M6 10 L18 10" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <path d="M6 12 L18 12" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <path d="M6 14 L18 14" stroke="white" strokeWidth="0.5" opacity="0.3" />
      {/* Handle */}
      <path
        d="M2 9 L2 15 C2 15.5 2.5 16 3 16 L3 8 C2.5 8 2 8.5 2 9 Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

// Custom SVG nail art icon
export function NailArtIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Nail shape */}
      <path
        d="M12 3 C10 3 8 4 7 6 L7 16 C7 19 9 21 12 21 C15 21 17 19 17 16 L17 6 C16 4 14 3 12 3 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Decorative dots */}
      <circle cx="10" cy="10" r="1" fill="white" opacity="0.8" />
      <circle cx="14" cy="10" r="1" fill="white" opacity="0.8" />
      <circle cx="12" cy="13" r="1" fill="white" opacity="0.8" />
      <circle cx="10" cy="16" r="0.8" fill="white" opacity="0.6" />
      <circle cx="14" cy="16" r="0.8" fill="white" opacity="0.6" />
      {/* Sparkle */}
      <path
        d="M12 7 L12.5 8 L13.5 8 L12.7 8.7 L13 9.5 L12 9 L11 9.5 L11.3 8.7 L10.5 8 L11.5 8 Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}
