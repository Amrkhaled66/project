// src/components/upgrades/Blocking.tsx
import React, { useEffect, useState } from "react";
import { useCart } from "src/context/cart.context";

interface BlockingProps {
  rows: number;
  cols: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const BLOCK_SIZE = 14;

const Blocking: React.FC<BlockingProps> = ({ rows, cols, gridRef }) => {
  const { cartItem } = useCart();

  // Get the blocking upgrade from the cart
  const blockingUpgrade = cartItem.upgrades.find((u) => u.id === "blocking");

  const colors: string[] =
    blockingUpgrade?.props?.color?.length > 0
      ? blockingUpgrade?.props?.color
      : ["#000"];

  const isRandom: boolean = blockingUpgrade?.props?.random ?? false;

  const [intersections, setIntersections] = useState<
    { top: number; left: number; color: string }[]
  >([]);

  // COLOR SYSTEM — same as original logic
  const getColor = (index: number) =>
    isRandom
      ? colors[Math.floor(Math.random() * colors.length)]
      : colors[index % colors.length] || "#000";

  useEffect(() => {
  if (!gridRef.current) return;

  const grid = gridRef.current;

  const calculateIntersections = () => {
    const children = Array.from(grid.children);
    if (children.length === 0) return;

    const gridRect = grid.getBoundingClientRect();

    const cellRects = children
      .slice(0, cols)
      .map((el) => el.getBoundingClientRect());

    const rowRects = children
      .filter((_, i) => i % cols === 0)
      .map((el) => el.getBoundingClientRect());

    const blocks: any[] = [];

    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const x = cellRects[c].right - gridRect.left + 23;
        const y = rowRects[r].bottom - gridRect.top + 26;

        blocks.push({
          left: x - BLOCK_SIZE / 2,
          top: y - BLOCK_SIZE / 2,
          color: getColor(r * cols + c),
        });
      }
    }

    setIntersections(blocks);
  };

  // 🔥 1. Calculate right away
  calculateIntersections();

  // 🔥 2. Recalculate when grid Resizes
  const resizeObserver = new ResizeObserver(() => {
    calculateIntersections();
  });
  resizeObserver.observe(grid);

  // 🔥 3. Recalculate when children change (items dragged/added)
  const mutationObserver = new MutationObserver(() => {
    calculateIntersections();
  });
  mutationObserver.observe(grid, {
    childList: true,
    subtree: true,
  });

  return () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  };
}, [rows, cols, gridRef, colors, isRandom]);


  return (
    <>
      {intersections.map((b, i) => (
        <div
          key={i}
          className="absolute animate pointer-events-none"
          style={{
            top: `${b.top}px`,
            left: `${b.left}px`,
            width: `${BLOCK_SIZE}px`,
            height: `${BLOCK_SIZE}px`,
            backgroundColor: b.color,
            borderRadius: "2px",
            // border: "1px solid rgba(0,0,0,0.15)`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            zIndex: 50,
          }}
        />
      ))}
    </>
  );
};

export default React.memo(Blocking);
