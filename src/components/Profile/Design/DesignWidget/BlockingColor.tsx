// src/components/BlanketColorSelector/BlockingColor.tsx
import { useCart } from "src/context/cart.context";
import ColorSelector from "src/components/ui/ColorSelector";
import { DEFAULT_COLORS } from "src/data/colors";
export default function BlockingColor() {
  const {
    updateBlockingColor,
    cartItem: { upgrades },
  } = useCart();

  const blockingUpgrade = upgrades.find((u) => u.id === "blocking");
  const selectedColor = Array.isArray(blockingUpgrade?.props?.color)
    ? blockingUpgrade?.props?.color[0]
    : blockingUpgrade?.props?.color || null;

  const onSelectColor = (color: string) => {
    updateBlockingColor([color], false);
  };

  const onRandomize = () => {
    updateBlockingColor(DEFAULT_COLORS, true);
  };

  return (
    <div className="flex flex-col gap-3">
      <ColorSelector
        header="Blocking Color"
        headerComponenet={
          <button
            className="animate bg-primary rounded-md px-3 py-1 text-white hover:opacity-80"
            onClick={onRandomize}
          >
            Random
          </button>
        }
        selectedColor={!blockingUpgrade?.props?.random && selectedColor}
        onSelectColor={onSelectColor}
      />
    </div>
  );
}
