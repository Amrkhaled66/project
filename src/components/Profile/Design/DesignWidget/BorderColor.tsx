// BorderColorSelector.tsx
import ColorSelector from "src/components/ui/ColorSelector";
import {
  useDesignEditorActions,
  useDesignEditorState,
} from "src/context/desgin.context";
import showDesignViewer from "src/utils/designViewer";
export default function BorderColorSelector() {
 const { designData } = useDesignEditorState();
 const { updateBorderColor } = useDesignEditorActions();
  const onSelectColor = (color: string) => {
    updateBorderColor(color);
    showDesignViewer("Frame bordering color applied");
  };
  const selectedColor = designData?.colors.border ?? null;
  return (
    <ColorSelector
      header="Frame Bordering"
      selectedColor={selectedColor}
      onSelectColor={onSelectColor}
    />
  );
}
