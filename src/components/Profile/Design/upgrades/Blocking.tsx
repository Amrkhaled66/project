// src/components/upgrades/Blocking.tsx
import React, { useMemo } from "react";
import { useCart } from "src/context/cart.context";
import { DEFAULT_COLORS } from "src/data/colors";

interface BlockingProps {
  rows: number;
  cols: number;
}

const Blocking: React.FC<BlockingProps> = ({ rows, cols }) => {
  const { cartItem } = useCart();

  const blockingUpgrade = cartItem.upgrades.find((u) => u.id === "blocking");

  const colors =
    blockingUpgrade?.props?.color?.length > 0
      ? blockingUpgrade?.props?.color
      : DEFAULT_COLORS;

  const isRandom = blockingUpgrade?.props?.random ?? false;

  const getColor = (index: number) =>
    isRandom
      ? colors[Math.floor(Math.random() * colors.length)]
      : colors[0] || "#000000";

  // Memoize blocks calculation for performance
  const blocks = useMemo(() => {
    const blockList = [];

    // Adaptive cell size matching CanvasFront.tsx logic
    const getCellSize = () => {
      const maxDimension = Math.max(rows, cols);
      if (maxDimension <= 3) return 100;
      if (maxDimension <= 4) return 85;
      if (maxDimension <= 5) return 70;
      return 60;
    };

    const cellSize = getCellSize();
    const gridPadding = 16; // p-4 from parent grid
    const gridGap = 8; // gap-2 from parent grid
    const blockSize = 16; // Size of blocking square

    // Blocking squares should appear at intersections
    // For a grid with N cells, there are N-1 intersections
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        // Calculate exact intersection point
        // Position = padding + (cellSize + gap) * (index + 1) - blockSize/2
        const top =
          gridPadding + (cellSize + gridGap) * (r + 1) - blockSize + 20;
        const left =
          gridPadding + (cellSize + gridGap) * (c + 1) - blockSize + 20;

        blockList.push({
          id: `block-${r}-${c}`,
          top,
          left,
          color: getColor(r * cols + c),
        });
      }
    }

    return blockList;
  }, [rows, cols, colors, isRandom]);

  return (
    <>
      {blocks.map((block) => (
        <div
          key={block.id}
          className="pointer-events-none absolute"
          style={{
            top: `${block.top}px`,
            left: `${block.left}px`,
            width: "16px",
            height: "16px",
            backgroundColor: block.color,
            borderRadius: "2px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            zIndex: 60,
            transition: "background-color 300ms",
          }}
        />
      ))}
    </>
  );
};

export default React.memo(Blocking);
