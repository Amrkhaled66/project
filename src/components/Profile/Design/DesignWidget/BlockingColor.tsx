import ColorSelector from "src/components/ui/ColorSelector";
import { DEFAULT_COLORS } from "src/data/colors";
import { useDesign } from "src/context/desgin.context";
import showDesignViewer from "src/utils/designViewer";
export default function BlockingColor() {
  const { updateBlocking, designData } = useDesign();

  const selectedColor = designData.colors.blocking.colors[0];

  const onSelectColor = (color: string) => {
    updateBlocking([color], false);
    showDesignViewer("Heirloom block color applied");
  };

  const onRandomize = () => {
    updateBlocking(DEFAULT_COLORS, true);
    showDesignViewer("Heirloom block colors randomized");
  };

  return (
    <div className="flex flex-col gap-3">
      <ColorSelector
        header="Heirloom Block™"
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
