"use client";

export const HeroJar = ({
  size = 200,
  label,
}: {
  size?: number;
  label?: string;
}) => {
  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(10, 10)">
          {/* Jar Body with slight blue tint */}
          <path
            d="M45 170 V 60 C 45 40, 65 20, 85 20 H 115 C 135 20, 155 40, 155 60 V 170 C 155 175.523, 150.523 180, 145 180 H 55 C 49.4772 180, 45 175.523, 45 170 Z"
            fill="hsl(var(--card))"
            stroke="hsl(var(--stroke))"
            strokeWidth="3"
          />
          <path
            d="M45 60 C 45 40, 65 20, 85 20 H 115 C 135 20, 155 40, 155 60"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeOpacity="0.2"
            strokeWidth="20"
          />

          {/* Jar Lid & Slot */}
          <path
            d="M80 20 H 120"
            stroke="hsl(var(--stroke))"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M95 18 C 95 10, 105 10, 105 18"
            stroke="hsl(var(--stroke))"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M90 30 H 110"
            stroke="hsl(var(--stroke))"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Contents */}
          <g>
            {/* Bill */}
            <path
              d="M60 150 C 80 140, 120 160, 140 150 L 135 175 C 115 185, 75 165, 55 175 Z"
              fill="hsl(var(--primary))"
              opacity="0.3"
            />

            {/* Coin 1 */}
            <circle
              cx="115"
              cy="145"
              r="15"
              fill="hsl(var(--warn))"
              stroke="hsl(var(--stroke))"
              strokeWidth="3"
            />
            <text
              x="115"
              y="151"
              fontFamily="var(--font-mono)"
              fontSize="14"
              fill="hsl(var(--stroke))"
              textAnchor="middle"
              fontWeight="bold"
            >
              $
            </text>

            {/* Coin 2 */}
            <circle
              cx="70"
              cy="160"
              r="12"
              fill="hsl(var(--warn))"
              stroke="hsl(var(--stroke))"
              strokeWidth="3"
            />
          </g>

          {/* Label */}
          <g>
            {/* Tape */}
            <path
              d="M90 70 L 110 70 L 113 80 L 87 80 Z"
              fill="hsl(var(--warn))"
              opacity="0.7"
            />

            {/* Label BG */}
            <rect
              x="75"
              y="75"
              width="50"
              height="25"
              fill="hsl(var(--card))"
              stroke="hsl(var(--stroke))"
              strokeWidth="3"
              rx="2"
            />

            {/* Label Text */}
            <text
              x="100"
              y="92"
              fontFamily="var(--font-heading)"
              fontSize="12"
              fill="hsl(var(--stroke))"
              textAnchor="middle"
              fontWeight="bold"
            >
              TIPS
            </text>
          </g>
        </g>
      </svg>
      {label && (
        <div className="mt-4 rounded-full border-[3px] border-stroke bg-card px-4 py-1 text-sm font-bold shadow">
          {label}
        </div>
      )}
    </div>
  );
};