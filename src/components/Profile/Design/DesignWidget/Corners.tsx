import { useDroppable } from "@dnd-kit/core";
import { useCart } from "src/context/cart.context";

const CornerBox = ({
  index,
  position,
}: {
  index: number;
  position: string;
}) => {
  const {
    cartItem: { upgrades },
  } = useCart();

  const upgrade =
    upgrades.find((u) => u.id === "cornerstonesSingle") ||
    upgrades.find((u) => u.id === "cornerstonesDouble");

  const cornerImages = upgrade?.props?.cornerImages || {};

  const { isOver, setNodeRef } = useDroppable({
    id: `corner-${index}`,
  });
  return (
    <div
      ref={setNodeRef}
      className={`absolute size-5 ${!cornerImages[index] && "border-2 border-dashed"} ${position} flex items-center justify-center overflow-hidden bg-white ${isOver ? "scale-105 bg-blue-200" : ""}`}
    >
      {cornerImages[index] && (
        <img src={cornerImages[index]} className="h-full w-full object-cover" />
      )}
    </div>
  );
};

export default function Corners() {
  const positions = [
    "top-0 left-0",
    "top-0 right-0",
    "right-0 bottom-0",
    "bottom-0 left-0",
    "top-1/2 right-0 -translate-y-1/2",
    "top-1/2 left-0 -translate-y-1/2",
    "top-0 left-1/2 -translate-x-1/2",
    "bottom-0 left-1/2 -translate-x-1/2",
  ];

  const { cartItem } = useCart();
  const isDouble = cartItem.upgrades.some((u) => u.id === "cornerstonesDouble");

  const cornersToRender = isDouble ? positions : positions.slice(0, 4);

  return (
    <div className="pointer-events-auto size-full bg-red-500">
      {cornersToRender.map((pos, index) => (
        <CornerBox key={index} index={index} position={pos} />
      ))}
    </div>
  );
}
