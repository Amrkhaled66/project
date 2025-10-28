import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
export type GridItemType = {
  id: string;
  image: string;
};

export default function GridItem({
  id,
  image,
  onDelete,
}: GridItemType & { onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative aspect-square cursor-grab overflow-hidden ${
        isDragging ? "" : "transition hover:shadow-md"
      }`}
    >
      <img
        src={image}
        alt={id}
        className="object-fit pointer-events-none h-full w-full select-none"
      />

      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering drag
          onDelete(id);
        }}
        className={`absolute end-1 top-1 aspect-square rounded-full bg-black/50 p-1 text-white sm:opacity-0  transition hover:bg-red-600 hover:opacity-100 ${isHovered && "opacity-100"}`}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
