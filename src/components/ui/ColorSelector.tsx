import DesginContainer from "src/components/Profile/Design/DesginContainer";
import { DEFAULT_COLORS } from "src/data/colors";

type Props = {
  header?: string;
  colors?: string[];
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
};

export default function ColorSelector({
  header = "Colors",
  colors = DEFAULT_COLORS,
  selectedColor,
  onSelectColor,
}: Props) {
  return (
    <DesginContainer header={header}>
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {colors.map((c) => {
          const selected = selectedColor === c;
          return (
            <label
              key={c}
              className="relative inline-flex size-8 cursor-pointer items-center justify-center   transition hover:scale-105 active:scale-95"
              title={c}
            >
              <input
                type="radio"
                name={header}
                value={c}
                checked={selected}
                onChange={() => onSelectColor(c)}
                className="peer sr-only"
                aria-label={`Select ${header} color ${c}`}
              />
              <span
                className={`block size-full rounded-full shadow-sm transition-all ${
                  selected ? "scale-105 ring ring-black ring-offset-1" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            </label>
          );
        })}
      </div>
    </DesginContainer>
  );
}
