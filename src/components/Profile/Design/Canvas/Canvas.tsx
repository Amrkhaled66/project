// src/components/Canvas/Canvas.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useCart } from "src/context/cart.context";
import CanvasFront from "./FrontGrid";
import CanvasBack from "./BackGrid";
import { GridItemType } from "src/components/Profile/Design/Canvas/GridItem";

export interface CanvasHandle {
  getSnapshot: () => Promise<string>;
}

const Canvas = forwardRef<
  CanvasHandle,
  {
    items: GridItemType[];
    onUpdateItems: (items: GridItemType[]) => void;
    onDeleteItem: (id: string) => void;
    onDragEnd: (event: any) => void;
    isFlipped: boolean;
  }
>(({ items, onUpdateItems, onDeleteItem, onDragEnd, isFlipped }, ref) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const { cartItem } = useCart();
  const size = cartItem?.size;
  const blanketColor = cartItem?.color || null;
  const borderColor = cartItem?.borderColor || null;
  const backgingColor = cartItem?.backingColor || null;

  useImperativeHandle(ref, () => ({
    async getSnapshot() {
      const htmlToImage = await import("html-to-image");
      if (!canvasRef.current) return "";
      return await htmlToImage.toJpeg(canvasRef.current, { quality: 0.85 });
    },
  }));

  useEffect(() => {
    onUpdateItems([]);
  }, [size.id]);

  return (
    <div className="mx-auto w-full p-5">
      <div
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`mx-auto w-fit bg-transparent ${isFlipped && "min-w-[90%]"}`}
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {isFlipped ? (
            <CanvasBack
              cols={size.cols}
              rows={size.rows}
              backgingColor={backgingColor}
              bindingColor={
                cartItem.upgrades.find((u) => u.id === "binding")?.props?.color
              }
            />
          ) : (
            <CanvasFront
              size={size}
              items={items}
              onDeleteItem={onDeleteItem}
              onDragEnd={onDragEnd}
              blanketColor={blanketColor}
              borderColor={borderColor}
              bindingColor={
                cartItem.upgrades.find((u) => u.id === "binding")?.props?.color
              }
              canvasRef={canvasRef}
            />
          )}
    
        </div>
      </div>
    </div>
  );
});

export default Canvas;
