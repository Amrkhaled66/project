// BlanketColorSelector.tsx
import { useCart } from "src/context/cart.context";
import DesginContainer from "../DesginContainer";
import { backingColors } from "src/data/colors";

export default function BackingColorSelector() {
  const {
    updateBackingColor,
    cartItem: { backingColor },
  } = useCart();
  const onSelectColor = (color: string) => {
    updateBackingColor(color);
  };
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
