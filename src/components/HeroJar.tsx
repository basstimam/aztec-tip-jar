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
          {/* Jar Outline */}
          <path
            d="M 70 40 C 70 28.95 78.95 20 90 20 H 110 C 121.05 20 130 28.95 130 40 V 60 H 140 V 70 H 130 V 160 C 130 171.05 121.05 180 110 180 H 90 C 78.95 180 70 171.05 70 160 V 70 H 60 V 60 H 70 V 40 Z"
            fill="#fff"
            stroke="#171717"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Separator Line */}
          <path
            d="M70 70 H 130"
            stroke="#171717"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Coin */}
          <circle
            cx="100"
            cy="120"
            r="15"
            fill="#F7B500"
            stroke="#171717"
            strokeWidth="3"
          />
          <text
            x="100"
            y="125"
            fontFamily="JetBrains Mono"
            fontSize="14"
            fill="#171717"
            textAnchor="middle"
            fontWeight="bold"
          >
            $
          </text>
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