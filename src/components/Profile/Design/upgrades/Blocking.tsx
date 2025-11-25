// src/components/upgrades/Blocking.tsx
import React, { useEffect, useState } from "react";
import { useCart } from "src/context/cart.context";

interface BlockingProps {
  rows: number;
  cols: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const BLOCK_SIZE = 14;
// لازم يكون نفس قيمة gap اللي في Tailwind (gap-2 = 8px)
const GRID_GAP = 8;
// p-4 = 16px padding من كل جانب لو الـ Fringe شغال
const FRINGE_PADDING = 16;

type Block = { top: number; left: number; color: string };

const Blocking: React.FC<BlockingProps> = ({ rows, cols, gridRef }) => {
  const { cartItem } = useCart();

  const blockingUpgrade = cartItem.upgrades.find((u) => u.id === "blocking");

  const colors: string[] =
    blockingUpgrade?.props?.color?.length > 0
      ? blockingUpgrade?.props?.color
      : ["#000"];

  const isRandom: boolean = blockingUpgrade?.props?.random ?? false;

  const [intersections, setIntersections] = useState<Block[]>([]);

  const getColor = (index: number) =>
    isRandom
      ? colors[Math.floor(Math.random() * colors.length)]
      : colors[index % colors.length] || "#000";

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const parent = grid.parentElement as HTMLElement | null;
    if (!parent) return;

    const recalcBlocks = () => {
      const gridRect = grid.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      // هل فيه p-4 مفعّلة ولا لأ
      const hasFringePadding = grid.classList.contains("p-4");
      const innerPadding = hasFringePadding ? FRINGE_PADDING : 0;

      // حجم الشبكة مقابل حواف الكونتينر اللي فيها البلوكات
      const offsetLeft = gridRect.left - parentRect.left;
      const offsetTop = gridRect.top - parentRect.top;

      const innerWidth = gridRect.width - innerPadding * 2;
      const innerHeight = gridRect.height - innerPadding * 2;

      if (rows <= 1 || cols <= 1) {
        setIntersections([]);
        return;
      }

      const cellWidth =
        (innerWidth - GRID_GAP * (cols - 1)) / cols;
      const cellHeight =
        (innerHeight - GRID_GAP * (rows - 1)) / rows;

      const blocks: Block[] = [];

      // بنحسب نقطة تقاطع بين كل صف وعمود
      // (rows - 1) * (cols - 1) بلوك
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          // خط العمود بعد العمود c
          const xInsideGrid =
            innerPadding + (c + 1) * cellWidth + c * GRID_GAP+3;
          // خط الصف بعد الصف r
          const yInsideGrid =
            innerPadding + (r + 1) * cellHeight + r * GRID_GAP+3;

          const centerX = offsetLeft + xInsideGrid;
          const centerY = offsetTop + yInsideGrid;

          blocks.push({
            left: centerX - BLOCK_SIZE / 2,
            top: centerY - BLOCK_SIZE / 2,
            color: getColor(r * (cols - 1) + c),
          });
        }
      }

      setIntersections(blocks);
    };

    // نحسب مرة في الأول
    recalcBlocks();

    // لو الشبكة نفسها حجمها اتغيّر (resize)
    const resizeObserver = new ResizeObserver(() => {
      recalcBlocks();
    });
    resizeObserver.observe(grid);

    return () => {
      resizeObserver.disconnect();
    };
  }, [rows, cols, gridRef, colors, isRandom]);

  return (
    <>
      {intersections.map((b, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${b.top}px`,
            left: `${b.left}px`,
            width: `${BLOCK_SIZE}px`,
            height: `${BLOCK_SIZE}px`,
            backgroundColor: b.color,
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
