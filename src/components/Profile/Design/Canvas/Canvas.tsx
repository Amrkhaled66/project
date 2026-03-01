// src/components/Canvas/Canvas.tsx
import {
  useEffect,
  useRef,
  forwardRef,
} from "react";

import CanvasFront from "./FrontGrid";
import CanvasBack from "./BackGrid";
import { GridItemType } from "src/components/Profile/Design/Canvas/GridItem";
import { useDesign } from "src/context/desgin.context";

export interface CanvasHandle {
  getSnapshot: () => Promise<string>;
}

const Canvas = forwardRef<
  CanvasHandle,
  {
    items: GridItemType[];
    onUpdateItems: (items: GridItemType[]) => void;
    onDeleteItem: (id: string) => void;
    isFlipped: boolean;
  }
>(
  (
    { items, onUpdateItems, onDeleteItem, isFlipped },
    ref,
  ) => {

    // Load from Design Context
    const { designData } = useDesign();

    const backingColor = designData.colors?.backing;
    const bindingColor = designData.colors?.binding;

    const { rows, cols } = designData?.canvas || { rows: 2, cols: 3 };

    // -------------------------------------------------------
    // FIXED: Reset items ONLY when canvas size REALLY changes
    // -------------------------------------------------------
    const prevSizeRef = useRef({ rows, cols });

    useEffect(() => {
      const prev = prevSizeRef.current;
      const sizeChanged = prev.rows !== rows || prev.cols !== cols;

      if (sizeChanged) {
        onUpdateItems(items.slice(0, rows * cols)); // Reset items only on real size change
      }

      prevSizeRef.current = { rows, cols };
    }, [rows, cols, onUpdateItems]);

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
            className={`mx-auto w-fit ${
              isFlipped ? "min-w-[90%]" : "w-fit"
            } bg-transparent`}
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {isFlipped ? (
              <CanvasBack
                cols={cols}
                rows={rows}
                backgingColor={backingColor}
                bindingColor={bindingColor}
              />
            ) : (
              <CanvasFront onDeleteItem={onDeleteItem} />
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default Canvas;
