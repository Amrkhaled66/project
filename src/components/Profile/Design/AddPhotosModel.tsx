import { useState } from "react";
import Model from "src/components/ui/Model";
import Pagination from "src/components/ui/Pagination";
import { X, Check } from "lucide-react";
import MainDashButton from "src/components/ui/MainDashButton";
import Toast from "src/components/ui/Toast";
import { useDesign } from "src/context/desgin.context";
import { useUploads } from "src/hooks/queries/upload.queries";

const ITEMS_PER_PAGE = 12;
const API_URL = import.meta.env.VITE_API_URL;

export default function AddPhotosModel({
  isOpen,
  onClose,
  itemsLength,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemsLength: number;
}) {
  // ---------------- PAGINATION ----------------
  const [page, setPage] = useState(1);

  const { data, isLoading } = useUploads(page, ITEMS_PER_PAGE);
  const uploads = data?.data || [];
  const pagination = data?.pagination;

  // ---------------- STATE ----------------
  const [selected, setSelected] = useState<string[]>([]);
  const [activeTab] = useState<"photos">("photos");

  const { designData, update } = useDesign();
  const items = designData?.photos?.items || [];

  const maxphoto =
    designData.canvas.size.cols * designData.canvas.size.rows;

  const isFull = itemsLength + selected.length >= maxphoto;

  // ---------------- SELECT ----------------
  const toggleSelect = (src: string) => {
    setSelected((prev) =>
      prev.includes(src)
        ? prev.filter((s) => s !== src)
        : !isFull
        ? [...prev, src]
        : (() => {
            Toast(
              "Maximum photo slots filled!",
              "warning",
              "#fff3cd",
              "top-end"
            );
            return prev;
          })()
    );
  };

  // ---------------- ADD ----------------
  const handleAddSelected = () => {
    selected.slice(0, maxphoto).forEach((src) => {
      update((d) => {
        d.photos.items.push({
          id: src,
          image: src,
        });
      });
    });

    setSelected([]);
    onClose();
  };

  // ---------------- UI ----------------
  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3 bg-white p-4">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b pb-2">
          <h2 className="font-semibold">Add Photos</h2>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* GRID */}
        <div className="flex max-h-[230px] flex-wrap gap-3 overflow-y-auto rounded-xl bg-neutral-100 px-4 py-3">
          {isLoading && <span>Loading photos...</span>}

          {!isLoading &&
            uploads.map((img: any) => {
              const src = API_URL + img.imageUrl;
              const isSelected = selected.includes(src);
              const exists = items.some((item) => item.image === src);

              return (
                <div
                  key={img.id}
                  onClick={() => !exists && toggleSelect(src)}
                  className={`relative size-20 cursor-pointer overflow-hidden rounded-xl transition ${
                    exists ? "opacity-50" : "hover:scale-105"
                  } ${isSelected ? "ring-primary ring-2" : ""}`}
                >
                  <img
                    src={src}
                    className="h-full w-full object-cover"
                  />

                  {(exists || isSelected) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                      <Check size={20} />
                    </div>
                  )}
                </div>
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

        {/* ACTION */}
        <div className="flex justify-end">
          <MainDashButton
            text="Add to Blanket"
            disabled={selected.length === 0}
            onClick={handleAddSelected}
          />
        </div>
      </div>
    </Model>
  );
}
