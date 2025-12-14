// BorderColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useDesign } from "src/context/desgin.context";
export default function BorderColorSelector() {
 const {updateBorderColor , designData } = useDesign();
  const onSelectColor = (color: string) => {
    updateBorderColor(color);
  };
  const selectedColor = designData?.colors.border ?? null;
  return (
    <ColorSelector
      header="Bordering"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
