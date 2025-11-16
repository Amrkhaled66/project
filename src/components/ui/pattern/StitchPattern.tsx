import React from "react";

interface StitchPatternProps {
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const StitchPattern: React.FC<StitchPatternProps> = ({
  stroke = "#FF0000",
  strokeWidth = 2,
  dash = "6 6",
  width = 265,
  height = 260,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 265 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M12.5233 20.3625C52.3804 5.85961 77.4892 60.8238 90.7749 111.584C104.061 162.344 78.9518 158.14 39.0947 158.14C-0.762433 158.14 66.0856 133.09 52.7999 104.084C39.5142 75.0782 -27.3338 34.8654 12.5233 20.3625Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dash}
        />

        <path
          d="M8.02321 202.762C34.4918 159.079 100.663 159.079 127.132 202.762C153.601 246.444 213.998 214.878 180.913 244C147.827 273.122 127.975 258.561 88.2726 229.439C48.5696 200.318 -5.2111 231.883 8.02321 202.762Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dash}
        />

        <path
          d="M82.7358 46.7617C109.204 3.07943 175.376 3.07943 201.845 46.7617C228.313 90.444 288.711 58.8785 255.625 88C222.54 117.122 202.688 102.561 162.985 73.4392C123.282 44.3177 69.5015 75.8832 82.7358 46.7617Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dash}
        />

        <path
          d="M113 99.8678C158.595 76.8494 214.711 111.915 214.01 162.986C213.309 214.057 281.256 219.294 237.766 226.457C194.275 233.621 185.156 210.753 166.918 165.017C148.68 119.282 86.3446 117.551 113 99.8678Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dash}
        />
      </g>

      <defs>
        <clipPath id="clip0">
          <rect width="265" height="260" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StitchPattern;
