// src/components/DesignWidget/QualityPreserveColor.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import {
  useDesignEditorActions,
  useDesignEditorState,
} from "src/context/desgin.context";

import { UPGRADE_IDS } from "src/data/upgrades";
import showDesignViewer from "src/utils/designViewer";
export default function QualityPreserveColor() {
  const { designData } = useDesignEditorState();
  const { updateQualityPreserveColor } = useDesignEditorActions();

  // get the selected color from upgrade props
  const selectedColor =
    (designData.upgrades.selected.find((u) => u === UPGRADE_IDS.HEIRLOOM_PRESERVE) &&
      designData.colors.qualityPreserve) ||
    null;

  const onSelectColor = (color: string) => {
    updateQualityPreserveColor(color);
    showDesignViewer("Heirloom preserve stitch color applied");
  };

  return (
    <ColorSelector
      header="Heirloom Preserve Stitch Color"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
