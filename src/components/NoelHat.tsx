export function NoelHat() {
  return (
    <svg
      className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-12 animate-bounce"
      style={{
        animationDuration: '2s',
      }}
      viewBox="0 0 100 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main red part of the hat */}
      <path
        d="M 20 60 L 15 40 Q 15 20, 50 15 Q 85 20, 85 40 L 80 60 Z"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
      
      {/* White fur trim at bottom */}
      <ellipse
        cx="50"
        cy="62"
        rx="35"
        ry="8"
        fill="#ffffff"
      />
      
      {/* White fur details on sides */}
      <path
        d="M 25 50 Q 20 55, 22 62"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 75 50 Q 80 55, 78 62"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Pom pom at the top */}
      <circle
        cx="50"
        cy="8"
        r="7"
        fill="#ffffff"
      />
      
      {/* Pom pom shine */}
      <circle
        cx="52"
        cy="6"
        r="2"
        fill="#f3f4f6"
        opacity="0.8"
      />
      
      {/* Decorative holly berries */}
      <circle
        cx="35"
        cy="45"
        r="2"
        fill="#15803d"
      />
      <circle
        cx="40"
        cy="50"
        r="2"
        fill="#15803d"
      />
      <circle
        cx="65"
        cy="48"
        r="2"
        fill="#15803d"
      />
      
      {/* Gold accents */}
      <circle
        cx="50"
        cy="52"
        r="3"
        fill="#d4af37"
      />
    </svg>
  );
}
