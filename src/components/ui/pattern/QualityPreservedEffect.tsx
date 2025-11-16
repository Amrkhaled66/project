import React from "react";
import StitchPattern from "./StitchPattern";
import { useCart } from "src/context/cart.context";

interface StitchTileProps {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
  className?: string;
}

interface PatternGridProps {
  rows?: number;
  cols?: number;
  tileSize?: number;
  strokeWidth?: number;
  dash?: string;
  opacity?: number;
}

const StitchTile: React.FC<StitchTileProps> = ({
  size = 140,
  stroke = "#D1D1D1",
  strokeWidth = 3,
  dash = "6 6",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <StitchPattern
        width="100%"
        height="100%"
        stroke={stroke}
        strokeWidth={strokeWidth}
        dash={dash}
      />
    </div>
  );
};

const QualityPreservedEffect: React.FC<PatternGridProps> = ({
  tileSize = 140,
  strokeWidth = 3,
  dash = "6 6",
  opacity = 0.7,
}) => {
  const { cartItem } = useCart();
  const { cols, rows } = cartItem.size;
  const preservedColor =
    cartItem.upgrades.find((u) => u.id === "quiltedPreserve")?.props?.color ||
    "#D1D1D1";

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
        justifyContent: "center",
        alignContent: "center",
        opacity,
      }}
    >
      {[...Array(rows * cols)].map((_, i) => (
        <StitchTile
          key={i}
          size={tileSize}
          stroke={preservedColor}
          strokeWidth={strokeWidth}
          dash={dash}
        />
      ))}
    </div>
  );
};

export default QualityPreservedEffect;
