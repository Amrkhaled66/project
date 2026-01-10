import ColorSelector from "src/components/ui/ColorSelector";
import { DEFAULT_COLORS } from "src/data/colors";
import { useDesign } from "src/context/desgin.context";
export default function BlockingColor() {
  const { updateBlocking, designData } = useDesign();

  const blockingUpgrade = designData.upgrades.selected.find(
    (u) => u === "blocking",
  );

  const selectedColor = Array.isArray(designData.colors.blocking)
    ? designData.colors.blocking[0] || null
    : designData.colors.blocking || null;

  const onSelectColor = (color: string) => {
    updateBlocking([color], false);
  };

  const onRandomize = () => {
    updateBlocking(DEFAULT_COLORS, true);
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
        selectedColor={selectedColor}
        onSelectColor={onSelectColor}
      />
    </div>
  );
}
