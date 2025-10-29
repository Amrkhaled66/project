import { useState } from "react";
import Model from "src/components/ui/Model";
import { X, Check } from "lucide-react";
import { images } from "src/data/images";
import MainDashButton from "src/components/ui/MainDashButton";
import { useCart } from "src/context/cart";
import Toast from "src/components/ui/Toast";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { id: string; image: string }) => void;
  onDeleteItem: (id: string) => void;
  isItemExits: (id: string) => boolean;
  itemsLength: number;
};

export default function AddPhotosModel({
  isOpen,
  onClose,
  onAddItem,
  onDeleteItem,
  isItemExits,
  itemsLength,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const { cartItem } = useCart();
  const {
    size: { cols, rows },
  } = cartItem;
  const maxphoto = cols * rows;
  const isFull = itemsLength + selected.length >= maxphoto;

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
                "top-end",
              );
              return prev;
            })(),
    );
  };

  const handleAddSelected = () => {
    selected.slice(0, maxphoto).forEach((src) => {
      const id = src; // use src as ID
      if (!isItemExits(id)) {
        onAddItem({ id, image: src });
      }
    });
    setSelected([]);
    onClose();
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3 bg-white p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-2">
          <h2 className="font-semibold">Add Photos</h2>
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Images grid */}
        <div className="flex max-h-[400px] flex-wrap gap-3 overflow-y-auto rounded-xl bg-neutral-100 px-4 py-3">
          {images.map((src, index) => {
            const isSelected = selected.includes(src);
            const exists = isItemExits(src);

            return (
              <div
                key={index}
                onClick={() => {
                  if (!exists) toggleSelect(src);
                }}
                className={`relative aspect-square size-20 cursor-pointer overflow-hidden rounded-xl transition ${exists ? "opacity-50" : "hover:scale-105"} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
              >
                <img
                  src={src}
                  alt={`photo-${index}`}
                  className="h-full w-full object-cover"
                />
                {exists && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                    <Check size={20} />
                  </div>
                )}
                {isSelected && !exists && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/40 text-white">
                    <Check size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">
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
