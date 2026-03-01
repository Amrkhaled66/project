import { useDroppable } from "@dnd-kit/core";
import { useDesign } from "src/context/desgin.context";
import getImageLink from "src/utils/getImageLink";
import { UPGRADE_IDS } from "src/data/upgrades";
const CornerBox = ({
  index,
  position,
}: {
  index: number;
  position: string;
}) => {
  const { designData } = useDesign();

  const cornerImages = designData.upgrades?.props?.cornerstones?.images || {};

  const { isOver, setNodeRef } = useDroppable({
    id: `corner-${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`absolute size-5 ${
        !cornerImages[index] && "border-2 border-dashed"
      } ${position} flex items-center justify-center overflow-hidden bg-white ${
        isOver ? "scale-105 bg-blue-200" : ""
      }`}
    >
      {cornerImages[index] && (
        <img
          src={ cornerImages[index]}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default function Corners() {
  const { designData } = useDesign();

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

  const isDouble = designData.upgrades?.selected?.includes(
    UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE
  );

  const cornersToRender = isDouble ? positions : positions.slice(0, 4);

  return (
    <div className="pointer-events-auto size-full">
      {cornersToRender.map((pos, index) => (
        <CornerBox key={index} index={index} position={pos} />
      ))}
    </div>
  );
}
