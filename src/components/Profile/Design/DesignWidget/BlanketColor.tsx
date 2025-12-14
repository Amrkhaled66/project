// BlanketColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useDesign } from "src/context/desgin.context";
export default function BlanketColorSelector() {
  const { updateBlanketColor, designData } = useDesign();
  const onSelectColor = (color: string) => {
    updateBlanketColor(color);
  };
  const selectedColor = designData?.colors.blanket ?? null;
  return (
    <ColorSelector
      header="Sashing"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
