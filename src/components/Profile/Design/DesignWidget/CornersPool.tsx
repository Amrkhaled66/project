import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Pagination from "src/components/ui/Pagination";
import { useDesign } from "src/context/desgin.context";
import { useUploads } from "src/hooks/queries/upload.queries";

const ITEMS_PER_PAGE = 16;
const API_URL = import.meta.env.VITE_API_URL;

export default function CornersPool() {
  // ---------------- PAGINATION ----------------
  const [page, setPage] = useState(1);

  const { data, isLoading } = useUploads(page, ITEMS_PER_PAGE);
  const uploads = data?.data || [];
  const pagination = data?.pagination;

  const { designData, update } = useDesign();

  // assigned corner images
  const cornerImages =
    designData.upgrades?.props?.cornerstones?.images || {};
  const cornerEntries = Object.entries(cornerImages);

  const deleteCornerImage = (index: number) => {
    update((d) => {
      if (d.upgrades.props.cornerstones.images[index]) {
        delete d.upgrades.props.cornerstones.images[index];
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-3 text-sm text-neutral-500">
        Loading images…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* IMAGES POOL */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-neutral-200 p-3">
        {uploads.map((img: any) => {
          const foundEntry = cornerEntries.find(
            ([, value]) => value === img.imageUrl
          );

          const isSelected = !!foundEntry;
          const selectedCornerIndex = foundEntry
            ? Number(foundEntry[0])
            : null;

          return (
            <CornerImage
              key={img.id}
              id={img.id}
              src={img.imageUrl}
              isSelected={isSelected}
              cornerIndex={selectedCornerIndex}
              deleteCornerImage={deleteCornerImage}
            />
          );
        })}
      </div>

      {/* PAGINATION */}
      {pagination?.pages > 1 && (
        <Pagination
          pageCount={pagination.pages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
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
    disabled: isSelected,
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
        src={API_URL + src}
        style={style}
        className={`size-16 rounded border object-cover shadow-sm ${
          isSelected ? "pointer-events-none" : "cursor-grab"
        }`}
      />

      {isSelected && cornerIndex !== null && (
        <button
          onClick={() => deleteCornerImage(cornerIndex)}
          className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow"
        >
          ✕
        </button>
      )}
    </div>
  );
}
