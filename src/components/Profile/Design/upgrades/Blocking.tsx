// src/components/Canvas/Blocking.tsx
import React, { useEffect, useState } from "react";
import { useCart } from "src/context/cart.context";
import { DEFAULT_COLORS } from "src/data/colors";

interface BlockingProps {
  rows: number;
  cols: number;
  gap?: number;
  cellSize?: number;
  offset?: number;
}

const Blocking: React.FC<BlockingProps> = ({
  rows,
  cols,
  gap = 12,
  cellSize = 100,
  offset = 22,
}) => {
  const { cartItem } = useCart();
  const blockingUpgrade = cartItem.upgrades.find((u) => u.id === "blocking");

  const [blocks, setBlocks] = useState<
    { id: string; top: number; left: number; color: string }[]
  >([]);

  const colors =
    blockingUpgrade?.props?.color?.length > 0
      ? blockingUpgrade?.props?.color
      : DEFAULT_COLORS;

  const isRandom = blockingUpgrade?.props?.random ?? false;

  const getColor = (index: number) =>
    isRandom
      ? colors[Math.floor(Math.random() * colors.length)]
      : colors[0] || "#000000";

  useEffect(() => {
    const list = [];
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const top = offset + (r + 1) * (cellSize + gap) - gap / 2 + 1;
        const left = offset + (c + 1) * (cellSize + gap) - gap / 2;
        list.push({
          id: `block-${r}-${c}`,
          top,
          left,
          color: getColor(r * cols + c),
        });
      }
    }
    setBlocks(list);
  }, [rows, cols, cellSize, gap, offset, blockingUpgrade]);

  return (
    <>
      {blocks.map((b) => (
        <div
          key={b.id}
          className="absolute w-4 h-4 rounded-sm border border-gray-400 shadow-sm transition-colors duration-300"
          style={{
            top: `${b.top}px`,
            left: `${b.left}px`,
            backgroundColor: b.color,
            zIndex: 60,
          }}
        />
      ))}
    </>
  );
};

export default Blocking;
