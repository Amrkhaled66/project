// src/components/Canvas/CanvasBack.tsx
import React from "react";
import { backingColors } from "src/data/colors";

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
      className="relative grid p-5 w-fit mx-auto drop-shadow-xl"
    >
      <div className="flex h-fit items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Back Side</p>
        </div>
      </div>
    </div>
  );
};

export default CanvasBack;
