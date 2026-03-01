import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import Corners from "../DesignWidget/Corners";
import GridItem from "./GridItem";
import Blocking from "../upgrades/Blocking";
import EmbroideryZones from "../upgrades/Embroidery";
import QualityPreservedEffect from "src/components/ui/pattern/QualityPreservedEffect";

import { useDesign } from "src/context/desgin.context";

// -------------------------------------------------------
// Memoized Components
// -------------------------------------------------------
const EmptyCell = React.memo(function EmptyCell() {
  return (
    <div className="rounded-md border border-dashed border-gray-300 bg-neutral-200/40" />
  );
});

const MemoCorners = React.memo(Corners);
const MemoBlocking = React.memo(Blocking);
const MemoEmbroidery = React.memo(EmbroideryZones);
const MemoQualityPreservedEffect = React.memo(QualityPreservedEffect);

// -------------------------------------------------------
// Helper: RAF-throttled window width (less spammy than raw resize)
// -------------------------------------------------------
function useRafWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setW(window.innerWidth));
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return w;
}

interface CanvasFrontProps {
  onDeleteItem: (id: string) => void;
}

const CanvasFront: React.FC<CanvasFrontProps> = ({ onDeleteItem }) => {
  const {
    designData,
    hasBinding,
    hasBlocking,
    hasCornerstones,
    hasEmbroidery,
    hasQualityPreserve,
    hasFringe,
    canvasRef,
  } = useDesign();

  const { canvas, photos, colors } = designData;

  // Guard (in case context returns undefined canvas at first render)
  const rows = canvas?.rows ?? 0;
  const cols = canvas?.cols ?? 0;

  const items = photos?.items ?? [];

  const gridRef = useRef<HTMLDivElement | null>(null);

  // Use RAF window width (less re-render spam than raw resize)
  const windowWidth = useRafWindowWidth();

  const totalCells = useMemo(() => rows * cols, [rows, cols]);

  // -------------------------------------------------------
  // Cell size (computed once)
  // -------------------------------------------------------
  const cellSize = useMemo(() => {
    if (!rows || !cols) return 0;

    const maxDimension = Math.max(cols, rows);
    const vw = windowWidth || (typeof window !== "undefined" ? window.innerWidth : 0);

    // Scale cell size based on screen width
    const base = vw < 400 ? 40 : vw < 640 ? 50 : 85;

    if (maxDimension <= 3) return base;
    if (maxDimension <= 4) return base * 0.85;
    if (maxDimension <= 5) return base * 0.7;
    return base * 0.6;
  }, [rows, cols, windowWidth]);

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
  // Dynamic styles (stable)
  // -------------------------------------------------------
  const borderStyle = useMemo(
    () => ({ backgroundColor: colors?.border || "" }),
    [colors?.border],
  );

  const bindingStyle = useMemo(
    () => ({ borderColor: colors?.binding || "#000" }),
    [colors?.binding],
  );

  const gridStyle = useMemo(() => {
    if (!rows || !cols || !cellSize) {
      return {
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "repeat(1, 1fr)",
        backgroundColor: colors?.blanket || "",
        width: "0px",
        height: "0px",
      } as React.CSSProperties;
    }

    const gap = 8;
    const padding = 32;

    return {
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      backgroundColor: colors?.blanket || "",
      width: `${cols * cellSize + (cols - 1) * gap + padding}px`,
      height: `${rows * cellSize + (rows - 1) * gap + padding}px`,
    } as React.CSSProperties;
  }, [cols, rows, colors?.blanket, cellSize]);

  // -------------------------------------------------------
  // Stable handler (so children don’t re-render بسبب function identity)
  // -------------------------------------------------------
  const handleDelete = useCallback(
    (id: string) => {
      onDeleteItem(id);
    },
    [onDeleteItem],
  );

  // If canvas not ready, render nothing (or skeleton)
  if (!rows || !cols) {
    return (
      <div
        ref={canvasRef}
        className="drop-shadow-x snapshot-safe relative overflow-hidden p-5"
        style={borderStyle}
        id="canvas-front"
      />
    );
  }

  return (
    <div
      ref={canvasRef}
      className="drop-shadow-x snapshot-safe relative overflow-hidden p-5"
      style={borderStyle}
      id="canvas-front"
    >
      {/* Binding Frame */}
      {hasBinding && <div className="absolute inset-0 border-2" style={bindingStyle} />}

      {/* Cornerstones */}
      {hasCornerstones && <MemoCorners />}

      <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
        {/* Quality Preserved Texture */}
        {hasQualityPreserve && <MemoQualityPreservedEffect />}

        {/* GRID */}
        <div
          ref={gridRef}
          className={`animate mx-auto grid h-fit gap-2 overflow-hidden ${hasFringe ? "!p-4" : ""}`}
          style={gridStyle}
        >
          {items.map((item) => (
            <GridItem key={item.id} {...item} onDelete={handleDelete} />
          ))}

          {hasEmbroidery && <MemoEmbroidery />}

          {placeholders.map((i) => (
            <EmptyCell key={`empty-${i}`} />
          ))}
        </div>

        {/* Blocking (over entire grid) */}
        {hasBlocking && (
          <MemoBlocking gridRef={gridRef} rows={rows} cols={cols} />
        )}
      </SortableContext>
    </div>
  );
};

export default React.memo(CanvasFront);