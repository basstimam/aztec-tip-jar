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
          <path
            d="M40 40H140"
            stroke="#171717"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M130 40C130 21.2222 116.569 6 100 6H80C63.4315 6 50 21.2222 50 40V55H130V40Z"
            fill="#fff"
            stroke="#171717"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 55V155C50 166.046 58.9543 175 70 175H110C121.046 175 130 166.046 130 155V55"
            fill="#fff"
            stroke="#171717"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Coin */}
          <circle cx="90" cy="100" r="15" fill="#F7B500" stroke="#171717" strokeWidth="3" />
          <text x="90" y="105" fontFamily="JetBrains Mono" fontSize="14" fill="#171717" textAnchor="middle" fontWeight="bold">$</text>
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