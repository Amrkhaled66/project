// BlanketColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useDesign } from "src/context/desgin.context";
import showDesignViewer from "src/utils/designViewer";
export default function BlanketColorSelector() {
  const { updateBlanketColor, designData } = useDesign();
  const onSelectColor = (color: string) => {
    updateBlanketColor(color);
    showDesignViewer("Heirloom framing color applied");
  };
  const selectedColor = designData?.colors.blanket ?? null;
  return (
    <ColorSelector
      header="Heirloom Framing™ Color"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
