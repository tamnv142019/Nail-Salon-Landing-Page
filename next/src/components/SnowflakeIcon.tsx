interface SnowflakeIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
  opacity?: number;
}

export function SnowflakeIcon({
  size = 24,
  className = '',
  animated = false,
  opacity = 1,
}: SnowflakeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'animate-spin' : ''} ${className}`}
      style={{ opacity }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {/* Main vertical line */}
        <line x1="50" y1="10" x2="50" y2="90" />

        {/* Main horizontal line */}
        <line x1="10" y1="50" x2="90" y2="50" />

        {/* Diagonal lines */}
        <line x1="25" y1="25" x2="75" y2="75" />
        <line x1="75" y1="25" x2="25" y2="75" />

        {/* Upper branches */}
        <line x1="50" y1="10" x2="35" y2="25" />
        <line x1="50" y1="10" x2="65" y2="25" />

        {/* Lower branches */}
        <line x1="50" y1="90" x2="35" y2="75" />
        <line x1="50" y1="90" x2="65" y2="75" />

        {/* Left branches */}
        <line x1="10" y1="50" x2="25" y2="35" />
        <line x1="10" y1="50" x2="25" y2="65" />

        {/* Right branches */}
        <line x1="90" y1="50" x2="75" y2="35" />
        <line x1="90" y1="50" x2="75" y2="65" />

        {/* Upper-left diagonal branches */}
        <line x1="25" y1="25" x2="20" y2="10" />
        <line x1="25" y1="25" x2="10" y2="20" />

        {/* Upper-right diagonal branches */}
        <line x1="75" y1="25" x2="80" y2="10" />
        <line x1="75" y1="25" x2="90" y2="20" />

        {/* Lower-left diagonal branches */}
        <line x1="25" y1="75" x2="20" y2="90" />
        <line x1="25" y1="75" x2="10" y2="80" />

        {/* Lower-right diagonal branches */}
        <line x1="75" y1="75" x2="80" y2="90" />
        <line x1="75" y1="75" x2="90" y2="80" />

        {/* Center circle */}
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </g>
    </svg>
  );
}
