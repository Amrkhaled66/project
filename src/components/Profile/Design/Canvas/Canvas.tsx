// src/components/Canvas/Canvas.tsx
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useCart } from "src/context/cart.context";
import { useDesign } from "src/context/desgin.context";
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
  }
>(({ items, onUpdateItems, onDeleteItem, onDragEnd }, ref) => {
  const {
    cartItem,
    hasBinding,
    hasFringe,
    isCornerstones,
    isQualityPreserve,
  } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);
  const canvasRef = useRef<HTMLDivElement|null>(null);

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
            />
          ) : (
            <CanvasFront
              size={size}
              items={items}
              onDeleteItem={onDeleteItem}
              onDragEnd={onDragEnd}
              blanketColor={blanketColor}
              borderColor={borderColor}
              hasBinding={hasBinding}
              hasFringe={hasFringe}
              isCornerstones={isCornerstones}
              isQualityPreserve={isQualityPreserve}
              bindingColor={
                cartItem.upgrades.find((u) => u.id === "binding")?.props?.color
              }
              canvasRef={canvasRef}
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
        >
          {isFlipped ? "Show Front" : "Show Back"}
        </button>
      </div>
    </div>
  );
});

export default Canvas;
