// BlanketColorSelector.tsx
import DesginContainer from "../DesginContainer";
import { backingColors } from "src/data/colors";
import { useDesign } from "src/context/desgin.context";

export default function BackingColorSelector() {
  const {
    updateBackingColor,
    designData,
  } = useDesign();
  const onSelectColor = (color: string) => {
    updateBackingColor(color);
  };
  const backingColor = designData.colors.backing || null;
  return (
    <DesginContainer header="Backing Color">
      <div className="space-y-3">
        <div className="flex gap-4">
          {backingColors.map((c) => (
            <button
              key={c.name}
              onClick={() => onSelectColor(c.name)}
              className={`animate rounded border-2 p-0.5 ${backingColor === c.name ? "border-primary scale-105" : "border-transparent"}`}
            >
              <img className="size-14" src={c.img} alt={c.name} />
            </button>
          ))}
        </div>
        <p>Selected : {backingColor}</p>
      </div>
    </DesginContainer>
  );
}
