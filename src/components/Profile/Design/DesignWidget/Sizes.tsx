import { RotateCcw } from "lucide-react";

import DesginContainer from "src/components/Profile/Design/DesginContainer";
import FormSelect from "src/components/ui/FormSelect";
import {
  BLANKET_SIZES,
  type BlanketSizeId,
  flipSizeOrientation,
  getSizeById,
} from "src/data/blanketSizes";
import {
  useDesignEditorActions,
  useDesignEditorState,
} from "src/context/desgin.context";
import showDesignViewer from "src/utils/designViewer";

const Sizes = () => {
  const { designData } = useDesignEditorState();
  const { updateCanvasSize, updatePanelSize } = useDesignEditorActions();
  const startingSizeId = designData.startingSize || BLANKET_SIZES[0].id;
  const panelSize = Number(designData.panelSize) || 10;
  const {
    size: selectedId,
    cols,
    rows,
  } = designData.canvas || { name: "Lap", cols: 2, rows: 3 };
  const panelSizeOptions = Array.from({ length: 15 }, (_, index) => {
    const value = String(index + 10);
    return {
      label: `${value} in`,
      value,
    };
  });

  const startingSizeIndex = BLANKET_SIZES.findIndex(
    (size) => size.id === startingSizeId,
  );
  const visibleSizes = BLANKET_SIZES.slice(
    startingSizeIndex >= 0 ? startingSizeIndex : 0,
  );

  const onSelectSize = (id: BlanketSizeId) => {
    const size = getSizeById(id);
    updateCanvasSize({
      size: size.id,
      cols: size.cols,
      rows: size.rows,
    });
    showDesignViewer(`Size updated to ${size.name}`);
  };

  const handleFlipOrientation = () => {
    if (rows !== cols) {
      const isFlipped = getSizeById(selectedId)?.cols === rows;
      const flipped = flipSizeOrientation(selectedId, isFlipped);

      updateCanvasSize({
        size: flipped.id,
        cols: flipped.cols,
        rows: flipped.rows,
      });
      showDesignViewer(`Orientation updated to ${flipped.cols}x${flipped.rows}`);
    }
  };

  const handlePanelSizeChange = (value: string) => {
    const nextPanelSize = Number(value);

    if (!Number.isFinite(nextPanelSize) || nextPanelSize === panelSize) {
      return;
    }

    updatePanelSize(nextPanelSize);
    showDesignViewer(`Panel size updated to ${nextPanelSize} in`);
  };

  return (
    <DesginContainer header="Premium Build™ Size" className="h-full">
      <div className="w-full space-y-4">
        <FormSelect
          label="Panel Size"
          name="panelSize"
          value={String(panelSize)}
          options={panelSizeOptions}
          onChange={(event) => handlePanelSizeChange(event.target.value)}
        />

        {visibleSizes.map((size) => {
          const isSelected = selectedId === size.id;
          const isFlippable = size.rows !== size.cols;
          const stepPrice = size.price - getSizeById(startingSizeId)?.price!;

          return (
            <div
              key={size.id}
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
                    onChange={() => onSelectSize(size.id)}
                    className="h-4 w-4 accent-black"
                  />

                  <span className="text-sm text-neutral-900">
                    {size.name} ({size.cols}x{size.rows})
                  </span>
                </div>

                {size.id !== startingSizeId && (
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
