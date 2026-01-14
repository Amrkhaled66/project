import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";

export type GridItemType = {
  id: string;
  image: string;
};

function GridItem({
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
  } = useSortable({
    id,
    data: { type: "grid-item", id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    willChange: "transform",
    zIndex: isDragging ? 999 : undefined,
    touchAction: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group aspect-square cursor-grab overflow-hidden ${
        isDragging ? "scale-[1.02] opacity-80" : "transition hover:shadow-md"
      }`}
    >
      <img
        src={image}
        alt={id}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="pointer-events-none h-full w-full object-cover select-none"
        style={{ willChange: isDragging ? "transform" : "auto" }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="sm:opcatity-100 absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

// Proper memoization with comparison function
export default React.memo(GridItem, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.image === next.image &&
    prev.onDelete === next.onDelete
  );
});