// BorderColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useCart } from "src/context/cart";
export default function BorderColorSelector() {
  const { updateBorderColor, cartItem } = useCart();
  const onSelectColor = (color: string) => {
    updateBorderColor(color);
  }
  const selectedColor = cartItem?.borderColor ?? null;
  return (
    <ColorSelector
      header="Bordering"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
