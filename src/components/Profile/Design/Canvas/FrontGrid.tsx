import React, { useMemo, useRef } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Corners from "../DesignWidget/Corners";
import GridItem from "./GridItem";
import Blocking from "../upgrades/Blocking";
import EmbroideryZones from "../upgrades/Embroidery";
import QualityPreservedEffect from "src/components/ui/pattern/QualityPreservedEffect";

import { useDesign } from "src/context/desgin.context"; // Directly using useDesign

// -------------------------------------------------------
// Memoized Components
// -------------------------------------------------------
const EmptyCell = React.memo(({ cellSize }: { cellSize: number }) => (
  <div className="rounded-md border border-dashed border-gray-300 bg-neutral-200/40" />
));

const MemoCorners = React.memo(Corners);
const MemoBlocking = React.memo(Blocking);
const MemoEmbroidery = React.memo(EmbroideryZones);
const MemoQualityPreservedEffect = React.memo(QualityPreservedEffect);

interface CanvasFrontProps {
  onDeleteItem: (id: string) => void;
}

const CanvasFront: React.FC<CanvasFrontProps> = ({
  onDeleteItem,

}) => {
  // -------------------------------------------------------
  // NEW: Flags & upgrade states from Design Context
  // -------------------------------------------------------
  const {
    designData,
    hasBinding,
    hasBlocking,
    hasCornerstones,
    hasEmbroidery,
    hasQualityPreserve,
    hasFringe,
    canvasRef
  } = useDesign(); // Access flags and data directly from DesignContext

  const { canvas, photos, colors } = designData;
  const { size } = canvas;

  const {
    blanket: blanketColor,
    border: borderColor,
    binding: bindingColor,
  } = colors;
  const items = photos.items;

  const totalCells = size?.rows * size?.cols;
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
    if (maxDimension <= 3) return 100;
    if (maxDimension <= 4) return 85;
    if (maxDimension <= 5) return 70;
    return 60;
  };

  const gridStyle = useMemo(() => {
    const cellSize = getCellSize();
    const gap = 8;
    const padding = 32;

    return {
      gridTemplateColumns: `repeat(${size.cols}, 1fr)`,
      gridTemplateRows: `repeat(${size.rows}, 1fr)`,
      backgroundColor: blanketColor || "",
      width: `${size.cols * cellSize + (size.cols - 1) * gap + padding}px`,
      height: `${size?.rows * cellSize + (size?.rows - 1) * gap + padding}px`,
    };
  }, [size?.cols, size?.rows, blanketColor]);

  return (
    <div
      ref={canvasRef}
      className="drop-shadow-x snapshot-safe relative overflow-hidden p-5"
      style={borderStyle}
      id="canvas-front"
    >
      {/* Binding Frame */}
      {hasBinding && (
        <div className="absolute inset-0 border-2" style={bindingStyle} />
      )}

      {/* Cornerstones */}
      {hasCornerstones && <MemoCorners />}

      <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
        {/* Quality Preserved Texture */}
        {hasQualityPreserve && <MemoQualityPreservedEffect />}

        {/* GRID */}
        <div
          ref={gridRef}
          className={`animate mx-auto grid h-fit gap-2 overflow-hidden ${hasFringe && "!p-4"}`}
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

        {/* Blocking (over entire grid) */}
        {/* Uncomment when Blocking upgrade UI is ready */}
        {hasBlocking && (
            <MemoBlocking gridRef={gridRef} rows={size.rows} cols={size.cols} />
          )}
      </SortableContext>
    </div>
  );
};

export default React.memo(CanvasFront);
