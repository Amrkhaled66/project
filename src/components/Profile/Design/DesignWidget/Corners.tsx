import { useDroppable } from "@dnd-kit/core";

import {
  useDesignDerived,
  useDesignEditorState,
} from "src/context/desgin.context";

const CornerBox = ({
  index,
  position,
}: {
  index: number;
  position: string;
}) => {
  const { designData } = useDesignEditorState();
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
          src={cornerImages[index]}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default function Corners() {
  const { hasDoubleCorner } = useDesignDerived();

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

  const cornersToRender = hasDoubleCorner ? positions : positions.slice(0, 4);

  return (
    <div className="pointer-events-auto size-full">
      {cornersToRender.map((position, index) => (
        <CornerBox key={index} index={index} position={position} />
      ))}
    </div>
  );
}
