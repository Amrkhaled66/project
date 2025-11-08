// src/components/Canvas/CanvasFront.tsx
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Corners from "../DesignWidget/Corners";
import GridItem, { GridItemType } from "./GridItem";
import sashingEffect from "src/assets/sashingEffect.png";
import Blocking from "../upgrades/Blocking";
import { useCart } from "src/context/cart.context";
import EmbroideryZones from "../upgrades/Embroidery";
function EmptyCell() {
  return (
    <div className="aspect-square rounded-lg border border-dashed border-gray-400 bg-neutral-200/30" />
  );
}

interface CanvasFrontProps {
  size: { cols: number; rows: number; id?: string };
  items: GridItemType[];
  onDeleteItem: (id: string) => void;
  onDragEnd: (event: any) => void;
  blanketColor: string | null;
  borderColor: string | null;
  bindingColor?: string | null;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

const CanvasFront: React.FC<CanvasFrontProps> = ({
  size,
  items,
  onDeleteItem,
  onDragEnd,
  blanketColor,
  borderColor,
  bindingColor,
  canvasRef,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const {
    hasBinding,
    hasFringe,
    isCornerstones,
    isQualityPreserve,
    hasBlocking,
    hasEmbroidery,
  } = useCart();

  const totalCells = size.rows * size.cols;
  const placeholders =
    items.length < totalCells
      ? Array.from({ length: totalCells - items.length }, (_, i) => i)
      : [];

  return (
    <div
      ref={canvasRef}
      style={{ backgroundColor: borderColor || "" }}
      className="relative p-5  drop-shadow-xl"
    >
      {hasBinding && (
        <div
          className="absolute inset-0 border-2"
          style={{ borderColor: bindingColor || "#000" }}
        />
      )}

      {isCornerstones && <Corners />}
      {hasEmbroidery && <EmbroideryZones />}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          {isQualityPreserve && (
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage: `url(${sashingEffect})`,
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
                filter: "contrast(1.2) brightness(1.1)",
              }}
            />
          )}
          {hasBlocking && <Blocking rows={size.rows} cols={size.cols} />}
          {hasFringe && (
            <div
              className="absolute inset-3 rounded-md"
              style={{
                border: `8px solid ${blanketColor}`,
                pointerEvents: "none",
              }}
            />
          )}

          <div
            style={{
              gridTemplateColumns: `repeat(${size.cols}, minmax(0, 100px))`,
              gridTemplateRows: `repeat(${size.rows}, minmax(0, 100px))`,
              backgroundColor: blanketColor || "",
            }}
            className="mx-auto grid h-fit gap-2 p-4"
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
  );
};

export default CanvasFront;
