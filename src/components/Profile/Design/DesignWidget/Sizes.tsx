import DesginContainer from "src/components/Profile/Design/DesginContainer";
import {
  BLANKET_SIZES,
  BlanketSizeId,
  getSizeById,
  flipSizeOrientation,
} from "src/data/blanketSizes";

import { useDesign } from "src/context/desgin.context";
import { RotateCcw } from "lucide-react";

const Sizes = () => {
  const { designData, updateCanvasSize } = useDesign();
  const startingSizeId = designData.startingSize || BLANKET_SIZES[0].id;
  const {
    size: selectedId,
    cols,
    rows,
  } = designData.canvas || { name: "Lap", cols: 2, rows: 3 };

  const startingSizeIndex = BLANKET_SIZES.findIndex(
    (s) => s.id === startingSizeId,
  );

  const visibleSizes = BLANKET_SIZES.slice(
    startingSizeIndex >= 0 ? startingSizeIndex : 0,
  );

  const onSelectSize = (id: BlanketSizeId) => {
    const s = getSizeById(id);
    // Update the canvas size in the state
    updateCanvasSize({
      size: s.id,
      cols: s.cols,
      rows: s.rows,
    });
  };

  const handleFlipOrientation = () => {
    if (rows !== cols) {
      const isFlipped = getSizeById(selectedId)?.cols === rows; 
      const flipped = flipSizeOrientation(selectedId,isFlipped); // MUST use ID

      updateCanvasSize({
        size: flipped.id,
        cols: flipped.cols,
        rows: flipped.rows,
      });
    }
  };

  return (
    <DesginContainer header="Blanket Size" className="h-full">
      <div className="w-full space-y-3">
        {visibleSizes.map((s) => {
          const isSelected = selectedId === s.id;
          const isFlippable = s.rows !== s.cols;
          const stepPrice = s.price - getSizeById(startingSizeId)?.price!;

          return (
            <div
              key={s.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition ${
                isSelected ? "bg-neutral-100" : "hover:bg-neutral-50"
              }`}
            >
              <label className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="blanketSize"
                    checked={isSelected}
                    onChange={() => onSelectSize(s.id)}
                    className="h-4 w-4 accent-black"
                  />

                  <span className="text-sm text-neutral-900">
                    {s.name} ({s.cols}x{s.rows})
                  </span>
                </div>

                {s.id !== startingSizeId && (
                  <span className="text-sm font-medium text-neutral-800">
                    ${stepPrice.toFixed(2)}
                  </span>
                )}
              </label>

              {isSelected && isFlippable && (
                <button
                  onClick={handleFlipOrientation}
                  className="ml-2 flex items-center gap-1 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-100"
                >
                  <RotateCcw size={14} />
                  Flip
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DesginContainer>
  );
};

export default Sizes;
