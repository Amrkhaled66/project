// src/components/DesignWidget/QualityPreserveColor.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import { useDesign } from "src/context/desgin.context";

import { UPGRADE_IDS } from "src/data/upgrades";
export default function QualityPreserveColor() {
  const {
    updateQualityPreserveColor,

    designData,
  } = useDesign();

  // get the selected color from upgrade props
  const selectedColor =
    (designData.upgrades.selected.find((u) => u === UPGRADE_IDS.HEIRLOOM_PRESERVE) &&
      designData.colors.qualityPreserve) ||
    null;

  const onSelectColor = (color: string) => {
    updateQualityPreserveColor(color);
  };

  return (
    <ColorSelector
      header="Quality Preserve Stitch Color"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
