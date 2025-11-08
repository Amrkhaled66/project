// src/components/Canvas/CanvasBack.tsx
import React from "react";
import { backingColors } from "src/data/colors";
import { useCart } from "src/context/cart.context";
interface CanvasBackProps {
  cols: number;
  rows: number;
  backgingColor: string | null;
}

const CanvasBack: React.FC<CanvasBackProps> = ({
  cols,
  rows,
  backgingColor,
}) => {
  const backing = backingColors.find((c) => c.name === backgingColor);

  return (
    <div
      style={{
        backgroundImage: `url(${backing?.img || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 100px))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 100px))`,
      }}
      className="relative mx-auto grid w-fit p-5 drop-shadow-xl"
    ></div>
  );
};

export default CanvasBack;
