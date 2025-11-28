// src/components/Canvas/CanvasFront.tsx

import React, { useMemo, useRef } from "react";
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
const EmptyCell = React.memo(({ cellSize }: { cellSize: number }) => (
  <div
    className="rounded-md border border-dashed border-gray-300 bg-neutral-200/40"
   
  />
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
  const gridRef = useRef<HTMLDivElement | null>(null);

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

  const getCellSize = () => {
    const maxDimension = Math.max(size.cols, size.rows);
    if (maxDimension <= 3) return 100; // 3x3 or smaller: 100px cells
    if (maxDimension <= 4) return 85; // 4x4: 85px cells
    if (maxDimension <= 5) return 70; // 5x5: 70px cells
    return 60; // 6x6 or larger: 60px cells
  };
  const gridStyle = useMemo(() => {
    // Smaller cells for larger grids to keep canvas compact

    const cellSize = getCellSize();
    const gap = 8;
    const padding = 32;

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
        className={`drop-shadow-x relative overflow-hidden snapshot-safe p-5`}
        style={borderStyle}
        id="canvas-front"
      >
        {hasBinding && (
          <div className="absolute inset-0 border-2" style={bindingStyle} />
        )}

        {isCornerstones && <MemoCorners />}

        <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
          {isQualityPreserve && <MemoQualityPreservedEffect />}

          <div
            ref={gridRef}
            className={`animate mx-auto grid h-fit gap-2 overflow-hidden  ${hasFringe && "p-4"}`}
            style={gridStyle}
          >
            {items.map((item) => (
              <GridItem key={item.id} {...item} onDelete={onDeleteItem} />
            ))}

            {hasEmbroidery && <MemoEmbroidery />}

            {placeholders.map((i) => (
              <EmptyCell cellSize={getCellSize()} key={`empty-${i}`} />
            ))}
          </div>

          {/* ⚡ NOW call blocking AFTER the grid is rendered */}
        </SortableContext>
        {/* {hasBlocking && (
          <MemoBlocking gridRef={gridRef} rows={size.rows} cols={size.cols} />
        )} */}
      </div>
    </>
  );
};

export default React.memo(CanvasFront);
