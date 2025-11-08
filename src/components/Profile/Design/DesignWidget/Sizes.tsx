import DesginContainer from "src/components/Profile/Design/DesginContainer";
import {
  BLANKET_SIZES,
  BlanketSizeId,
  getSizeById,
  flipSizeOrientation,
} from "src/data/blanketSizes";
import { useCart } from "src/context/cart.context";
import { RotateCcw } from "lucide-react"; // nice small icon for flip button

const Sizes = () => {
  const { updateSize, cartItem } = useCart();
  const onSelectSize = (id: BlanketSizeId) => updateSize(getSizeById(id));
  const selectedSize = cartItem?.size ?? getSizeById("Lap");

  const handleFlipOrientation = () => {
    if (selectedSize.rows !== selectedSize.cols) {
      updateSize(flipSizeOrientation(selectedSize));
    }
  };

  return (
    <DesginContainer header="Blanket Size" className="h-full">
      <div className="w-full space-y-3">
        {BLANKET_SIZES.map((s) => {
          const isSelected = selectedSize.id === s.id;
          const isFlippable = s.rows !== s.cols; // ✅ only non-square sizes can flip

          return (
            <div
              key={s.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition ${
                isSelected ? "bg-neutral-100" : "hover:bg-neutral-50"
              }`}
            >
              {/* Radio Selector */}
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

              {/* ✅ Flip Button (only shows when selected & non-square) */}
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
