// src/components/DesignWidget/QualityPreserveColor.tsx

import { useCart } from "src/context/cart.context";
import ColorSelector from "src/components/ui/ColorSelector";

export default function QualityPreserveColor() {
  const {
    updateQualityPreservedColor,
    cartItem: { upgrades },
  } = useCart();

  // get the selected color from upgrade props
  const selectedColor = upgrades.find((u) => u.id === "quiltedPreserve")
    ?.props?.color || null;

  const onSelectColor = (color: string) => {
    updateQualityPreservedColor(color);
  };

  return (
    <ColorSelector
      header="Quality Preserve Stitch Color"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
