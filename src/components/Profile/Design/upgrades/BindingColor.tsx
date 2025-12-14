// BlanketColorSelector.tsx
import { useCart } from "src/context/cart.context";
import ColorSelector from "src/components/ui/ColorSelector";
import { useDesign } from "src/context/desgin.context";
export default function BindingColor() {
  const {
    updateBindingColor,
    designData,
  } = useDesign();
  const onSelectColor = (color: string) => {
    updateBindingColor(color);
  };
  return (
    <ColorSelector
      header="Binding Color"
      selectedColor={
        designData.upgrades.selected.some((u) => u === "binding")
          ? designData.colors.binding
          : null
      }
      onSelectColor={onSelectColor}
    />
  );
}
