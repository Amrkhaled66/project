import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cornerImages as defaultCorners } from "src/data/images";
import UploadImage from "src/components/ui/UploadImage";
import { useCart } from "src/context/cart.context";

export default function CornersPool() {
  const [Images, setImages] = useState<string[]>([...defaultCorners]);

  const {
    cartItem: { upgrades },
    deleteCornerImage,
  } = useCart();

  // Get cornerImages as array
  let cornerImages =
    upgrades.find((u) => u.id === "cornerstonesSingle")?.props?.cornerImages ||
    upgrades.find((u) => u.id === "cornerstonesDouble")?.props?.cornerImages ||
    [];

  // Convert object -> array of values
  const cornerArray = Object.values(cornerImages);

  // Convert object -> array of [index, value]
  const cornerEntries = Object.entries(cornerImages); // [["0","img1"], ["2","img2"]]

  const handleUpload = (images: string[]) => {
    setImages((prev) => [...prev, ...images]);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-neutral-200 p-3">
      <UploadImage onUpload={handleUpload} />

      {Images.map((src, i) => {
        // find if this src exists in any corner
        const foundEntry = cornerEntries.find(([, value]) => value === src);
        const isSelected = !!foundEntry;

        // Corner index for deleteCornerImage()
        const selectedCornerIndex = foundEntry ? Number(foundEntry[0]) : null;

        return (
          <CornerImage
            key={i}
            id={`${src}-${i}`}
            src={src}
            isSelected={isSelected}
            cornerIndex={selectedCornerIndex}
            deleteCornerImage={deleteCornerImage}
          />
        );
      })}
    </div>
  );
}

function CornerImage({
  id,
  src,
  isSelected,
  cornerIndex,
  deleteCornerImage,
}: {
  id: string;
  src: string;
  isSelected: boolean;
  cornerIndex: number | null;
  deleteCornerImage: (index: number) => void;
}) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id,
    disabled: isSelected, // disable dragging if selected
    data: { image: src, type: "corner-image" },
  });

  const style = {
    opacity: isSelected ? 0.4 : 1,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div className="relative">
      <img
        ref={setNodeRef}
        {...(!isSelected ? listeners : {})}
        {...attributes}
        src={src}
        style={style}
        className={`size-16 rounded border object-cover shadow-sm ${
          isSelected ? "pointer-events-none" : "cursor-grab"
        }`}
      />

      {/* Delete button only if selected */}
      {isSelected && cornerIndex !== null && (
        <button
          onClick={() => deleteCornerImage(cornerIndex)}
          className="absolute -top-2 -right-2 size-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow"
        >
          ✕
        </button>
      )}
    </div>
  );
}
