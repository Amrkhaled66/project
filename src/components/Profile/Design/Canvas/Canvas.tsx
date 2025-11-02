import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { getSizeById, BlanketSizeId } from "src/data/blanketSizes";
import GridItem, { GridItemType } from "./GridItem";
import { useCart } from "src/context/cart.context";

export interface CanvasHandle {
  getSnapshot: () => Promise<string>;
}

function EmptyCell() {
  return (
    <div className="aspect-square rounded-lg border border-dashed border-gray-400 bg-neutral-200/30" />
  );
}

const Canvas = forwardRef<CanvasHandle, {
  selectedSizeId: BlanketSizeId;
  borderColor: string | null;
  blanketColor: string | null;
  items: GridItemType[];
  onUpdateItems: (newItems: GridItemType[]) => void;
  onDeleteItem: (id: string) => void;
  onDragEnd: (event: any) => void;
}>(({
  selectedSizeId,
  borderColor,
  blanketColor,
  items,
  onUpdateItems,
  onDeleteItem,
  onDragEnd,
}, ref) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const size = getSizeById(selectedSizeId);
  const { cartItem } = useCart();
  const isCornerstones = cartItem?.upgrades?.some(u => u.id === "cornerstones");
  const canvasRef = useRef<HTMLDivElement>(null);

  // Expose snapshot method to parent
  useImperativeHandle(ref, () => ({
    async getSnapshot() {
      const htmlToImage = await import("html-to-image");
      if (!canvasRef.current) return "";
      return await htmlToImage.toJpeg(canvasRef.current, { quality: 0.85 });
    },
  }));

  useEffect(() => {
    onUpdateItems([]);
  }, [selectedSizeId]);

  const totalCells = size.rows * size.cols;
  const placeholders =
    items.length < totalCells
      ? Array.from({ length: totalCells - items.length }, (_, i) => i)
      : [];

  return (
    <div className="mx-auto w-full" ref={canvasRef}>
      <div style={{ backgroundColor: borderColor || "" }} className="relative animate p-5">
        {isCornerstones && (
          <>
            <div className="absolute top-0 left-0 size-5 bg-white shadow-md"></div>
            <div className="absolute top-0 right-0 size-5 bg-white shadow-md"></div>
            <div className="absolute bottom-0 left-0 size-5 bg-white shadow-md"></div>
            <div className="absolute right-0 bottom-0 size-5 bg-white shadow-md"></div>
          </>
        )}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
            <div
              style={{
                gridTemplateColumns: `repeat(${size.cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${size.rows}, minmax(0, 1fr))`,
                backgroundColor: blanketColor || "",
                borderColor: borderColor || "",
              }}
              className="mx-auto animate grid h-fit max-w-[600px] gap-2 p-4"
            >
              {items.map((item) => (
                <GridItem key={item.id} {...item} onDelete={onDeleteItem} />
              ))}
              {placeholders.map((i) => (
                <EmptyCell key={`empty-${i}`} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
});

export default Canvas;
