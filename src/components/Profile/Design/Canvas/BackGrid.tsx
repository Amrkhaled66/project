// src/components/Canvas/CanvasBack.tsx
import React from "react";
import { backingColors } from "src/data/colors";
import { useCart } from "src/context/cart.context";
interface CanvasBackProps {
  cols: number;
  rows: number;
  backgingColor: string | null;
  bindingColor: string | null;
}

const CanvasBack: React.FC<CanvasBackProps> = ({
  cols,
  rows,
  backgingColor,
  bindingColor
}) => {
  const backing = backingColors.find((c) => c.name === backgingColor);
  const { hasBinding } = useCart();
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
    >
      {hasBinding && (
        <div
          className="absolute inset-0 border-1"
          style={{ borderColor: bindingColor || "#000" }}
        />
      )}
    </div>
  );
};

export default CanvasBack;
