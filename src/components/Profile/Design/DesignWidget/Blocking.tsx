import React, { useCallback, useEffect, useState } from "react";

import {
  useDesignDerived,
  useDesignEditorState,
} from "src/context/desgin.context";

interface BlockingProps {
  rows: number;
  cols: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const BLOCK_SIZE = 14;
const GRID_GAP = 8;
const FRINGE_PADDING = 16;

type Block = {
  top: number;
  left: number;
  color: string;
};

const Blocking: React.FC<BlockingProps> = ({ rows, cols, gridRef }) => {
  const { designData } = useDesignEditorState();
  const { hasBlocking } = useDesignDerived();
  const colors = designData.colors.blocking.colors;
  const isRandom =
    hasBlocking && colors.length > 1 && designData.colors.blocking.random;
  const [intersections, setIntersections] = useState<Block[]>([]);

  const getColor = useCallback(
    (index: number) =>
      isRandom
        ? colors[Math.floor(Math.random() * colors.length)]
        : colors[index % colors.length],
    [colors, isRandom],
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const parent = grid.parentElement as HTMLElement | null;
    if (!parent) {
      return;
    }

    const recalcBlocks = () => {
      const gridRect = grid.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const hasFringePadding = grid.classList.contains("p-4");
      const innerPadding = hasFringePadding ? FRINGE_PADDING : 0;
      const offsetLeft = gridRect.left - parentRect.left;
      const offsetTop = gridRect.top - parentRect.top;
      const innerWidth = gridRect.width - innerPadding * 2;
      const innerHeight = gridRect.height - innerPadding * 2;

      if (rows <= 1 || cols <= 1) {
        setIntersections([]);
        return;
      }

      const cellWidth = (innerWidth - GRID_GAP * (cols - 1)) / cols;
      const cellHeight = (innerHeight - GRID_GAP * (rows - 1)) / rows;
      const nextBlocks: Block[] = [];

      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const xInsideGrid =
            innerPadding + (col + 1) * cellWidth + col * GRID_GAP + 3;
          const yInsideGrid =
            innerPadding + (row + 1) * cellHeight + row * GRID_GAP + 3;

          nextBlocks.push({
            left: offsetLeft + xInsideGrid - BLOCK_SIZE / 2,
            top: offsetTop + yInsideGrid - BLOCK_SIZE / 2,
            color: getColor(row * (cols - 1) + col),
          });
        }
      }

      setIntersections(nextBlocks);
    };

    recalcBlocks();

    const resizeObserver = new ResizeObserver(recalcBlocks);
    resizeObserver.observe(grid);
    return () => resizeObserver.disconnect();
  }, [cols, getColor, gridRef, rows]);

  if (!hasBlocking) {
    return null;
  }

  return (
    <>
      {intersections.map((block, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            top: `${block.top}px`,
            left: `${block.left}px`,
            width: `${BLOCK_SIZE}px`,
            height: `${BLOCK_SIZE}px`,
            backgroundColor: block.color,
            borderRadius: "2px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            zIndex: 50,
          }}
        />
      ))}
    </>
  );
};

export default React.memo(Blocking);
