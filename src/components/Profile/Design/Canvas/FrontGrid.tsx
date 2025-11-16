// src/components/Canvas/CanvasFront.tsx

import React, { useMemo } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Corners from "../DesignWidget/Corners";
import GridItem, { GridItemType } from "./GridItem";
import Blocking from "../upgrades/Blocking";
import EmbroideryZones from "../upgrades/Embroidery";
import QualityPreservedEffect from "src/components/ui/pattern/QualityPreservedEffect";
import { useCartFlags } from "src/context/cartFlags.context";

// -------------------------------------------------------
// Memoized Components
// -------------------------------------------------------
const EmptyCell = React.memo(() => (
  <div className="aspect-square border border-dashed border-gray-400 bg-neutral-200/30" />
));

const MemoCorners = React.memo(Corners);
const MemoBlocking = React.memo(Blocking);
const MemoEmbroidery = React.memo(EmbroideryZones);
const MemoQualityPreservedEffect = React.memo(QualityPreservedEffect);

interface CanvasFrontProps {
  size: { cols: number; rows: number; id?: string };
  items: GridItemType[];
  onDeleteItem: (id: string) => void;
  onDragEnd?: (event: any) => void;
  blanketColor: string | null;
  borderColor: string | null;
  bindingColor?: string | null;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

const CanvasFront: React.FC<CanvasFrontProps> = ({
  size,
  items,
  onDeleteItem,
  blanketColor,
  borderColor,
  bindingColor,
  canvasRef,
}) => {
  // -------------------------------------------------------
  // Selector pattern for smoother re-renders
  // -------------------------------------------------------
  const {
    hasBinding,
    hasFringe,
    isCornerstones,
    isQualityPreserve,
    hasBlocking,
    hasEmbroidery,
  } = useCartFlags();

  const totalCells = size.rows * size.cols;

  // -------------------------------------------------------
  // Placeholder cells
  // -------------------------------------------------------
  const placeholders = useMemo(() => {
    const remain = totalCells - items.length;
    return remain > 0 ? Array.from({ length: remain }, (_, i) => i) : [];
  }, [totalCells, items.length]);

  // -------------------------------------------------------
  // Sortable IDs
  // -------------------------------------------------------
  const sortableIds = useMemo(() => items.map((i) => i.id), [items]);

  // -------------------------------------------------------
  // Dynamic styles
  // -------------------------------------------------------
  const borderStyle = useMemo(
    () => ({ backgroundColor: borderColor || "" }),
    [borderColor],
  );

  const bindingStyle = useMemo(
    () => ({ borderColor: bindingColor || "#000" }),
    [bindingColor],
  );

  // Adaptive cell size based on grid dimensions
  const gridStyle = useMemo(() => {
    // Smaller cells for larger grids to keep canvas compact
    const getCellSize = () => {
      const maxDimension = Math.max(size.cols, size.rows);
      if (maxDimension <= 3) return 100; // 3x3 or smaller: 100px cells
      if (maxDimension <= 4) return 85;  // 4x4: 85px cells
      if (maxDimension <= 5) return 70;  // 5x5: 70px cells
      return 60; // 6x6 or larger: 60px cells
    };

    const cellSize = getCellSize();
    const gap = 8; // gap-2 in Tailwind
    const padding = 32; // p-4 (16px * 2) in Tailwind
    
    return {
      gridTemplateColumns: `repeat(${size.cols}, 1fr)`,
      gridTemplateRows: `repeat(${size.rows}, 1fr)`,
      backgroundColor: blanketColor || "",
      width: `${size.cols * cellSize + (size.cols - 1) * gap + padding}px`,
      height: `${size.rows * cellSize + (size.rows - 1) * gap + padding}px`,
    };
  }, [size.cols, size.rows, blanketColor]);

  return (
    <>
      <div
        ref={canvasRef}
        className={`relative overflow-hidden ${
          hasFringe ? "p-7" : "p-5"
        } drop-shadow-x`}
        style={borderStyle}
      >
        {hasBinding && (
          <div className="absolute inset-0 border-2" style={bindingStyle} />
        )}

        {isCornerstones && <MemoCorners />}
        {hasEmbroidery && <MemoEmbroidery />}

        <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
          {isQualityPreserve && <MemoQualityPreservedEffect />}
          {hasBlocking && <MemoBlocking rows={size.rows} cols={size.cols} />}

          {hasFringe && (
            <div
              className="absolute inset-[19px]"
              style={{
                border: `8px solid ${blanketColor}`,
                pointerEvents: "none",
              }}
            />
          )}

          <div className="mx-auto grid h-fit gap-2 p-4" style={gridStyle}>
            {items.map((item) => (
              <GridItem key={item.id} {...item} onDelete={onDeleteItem} />
            ))}

            {placeholders.map((i) => (
              <EmptyCell key={`empty-${i}`} />
            ))}
          </div>
        </SortableContext>
      </div>
    </>
  );
};

export default React.memo(CanvasFront);