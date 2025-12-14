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

  // Correct: selectedName is actually ID
  const { name: selectedId, cols, rows } = designData.canvas?.size ||{ name: "Lap", cols: 2, rows: 3 };

const onSelectSize = (id: BlanketSizeId) => {
  const s = getSizeById(id);
  // Update the canvas size in the state
  updateCanvasSize({
    name: s.id,
    cols: s.cols,
    rows: s.rows,
  });
};



  const handleFlipOrientation = () => {
    if (rows !== cols) {
      const flipped = flipSizeOrientation(selectedId); // MUST use ID

      updateCanvasSize({
        name: flipped.id,
        cols: flipped.cols,
        rows: flipped.rows,
      });
    }
  };

  return (
    <DesginContainer header="Blanket Size" className="h-full">
      <div className="w-full space-y-3">
        {BLANKET_SIZES.map((s) => {
          const isSelected = selectedId === s.id; // FIX

          const isFlippable = s.rows !== s.cols;

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
                    {s.name} ({s.cols}×{s.rows})
                  </span>
                </div>

                <span className="text-sm font-medium text-neutral-800">
                  ${s.price.toFixed(2)}
                </span>
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
