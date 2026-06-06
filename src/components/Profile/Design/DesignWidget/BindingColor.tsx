// BlanketColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import {
  useDesignEditorActions,
  useDesignEditorState,
} from "src/context/desgin.context";
import showDesignViewer from "src/utils/designViewer";
export default function BindingColor() {
  const { designData } = useDesignEditorState();
  const { updateBindingColor } = useDesignEditorActions();
  const onSelectColor = (color: string) => {
    updateBindingColor(color);
    showDesignViewer("Heirloom edge color applied");
  };
  return (
    <ColorSelector
      header="Heirloom Edge™ Color"
      selectedColor={
        designData.upgrades.selected.some((u) => u === "binding")
          ? designData.colors.binding
          : null
      }
      onSelectColor={onSelectColor}
    />
  );
}
