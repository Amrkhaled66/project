// BlanketColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useCart } from "src/context/cart.context";
export default function BlanketColorSelector() {
  const { updateColor, cartItem } = useCart();
  const onSelectColor = (color: string) => {
    updateColor(color);
  };
  const selectedColor = cartItem?.color ?? null;
  return (
    <ColorSelector
      header="Sashing"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
