// BlanketColorSelector.tsx
import { useCart } from "src/context/cart.context";
import ColorSelector from "src/components/ui/ColorSelector";
export default function BindingColor() {
  const {
    updateBindingColor,
    cartItem: { upgrades },
  } = useCart();
  const onSelectColor = (color: string) => {
    updateBindingColor(color);
  };
  return (
    <ColorSelector
      header="Binding Color"
      selectedColor={
        upgrades.some((u) => u.id === "binding")
          ? upgrades.find((u) => u.id === "binding")?.props?.color
          : null
      }
      onSelectColor={onSelectColor}
    />
  );
}
