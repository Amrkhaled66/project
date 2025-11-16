import { useState } from "react";
import Model from "src/components/ui/Model";
import { X, Check } from "lucide-react";
import { images, cornerImages } from "src/data/images";
import MainDashButton from "src/components/ui/MainDashButton";
import { useCart } from "src/context/cart.context";
import Toast from "src/components/ui/Toast";
import { motion } from "framer-motion";
import UploadImage from "src/components/ui/UploadImage";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { id: string; image: string }) => void;
  isItemExits: (id: string) => boolean;
  itemsLength: number;
};

export default function AddPhotosModel({
  isOpen,
  onClose,
  onAddItem,
  isItemExits,
  itemsLength,
}: Props) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"photos" | "armcandy">("photos");
  const {
    cartItem: { cornerImage },
  } = useCart();
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
      const id = src;
      if (!isItemExits(id)) {
        onAddItem({ id, image: src });
      }
    });
    setSelected([]);
    onClose();
  };

  const currentImages =
    activeTab === "photos" ? [...uploadedImages, ...images] : cornerImages;

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

        {/* Tabs */}
        <div className="relative flex w-full items-center gap-2 border-b border-neutral-200">
          {[{ id: "photos", label: "Photos" }].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as "photos" | "armcandy");
                  setSelected([]); // clear when switching
                }}
                className={`relative px-4 py-3 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "hover:text-primary text-neutral-600"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    layout="position"
                    className="bg-primary absolute right-0 bottom-0 left-0 h-[3px] rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <UploadImage
            onUpload={(imgs) => {
              setUploadedImages((prev) => [...imgs, ...prev]);
            }}
          />
        </div>
        {/* Images Grid */}
        <div className="flex max-h-[230px] flex-wrap gap-3 overflow-y-auto rounded-xl bg-neutral-100 px-4 py-3">
          {currentImages.map((src, index) => {
            const isSelected =
              activeTab === "armcandy"
                ? cornerImage === src
                : selected.includes(src);
            const exists =
              activeTab === "armcandy" ? cornerImage === src : isItemExits(src);

            const handleClick = () => {
              if (activeTab === "armcandy") {
                (src: string) => console.log(src);
              } else if (!exists) {
                toggleSelect(src);
              }
            };

            return (
              <div
                key={index}
                onClick={handleClick}
                className={`relative aspect-square size-20 cursor-pointer overflow-hidden rounded-xl transition ${
                  exists ? "opacity-50" : "hover:scale-105"
                } ${isSelected ? "ring-primary ring-2" : ""}`}
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
                  <div className="bg-primary/40 absolute inset-0 flex items-center justify-center text-white">
                    <Check size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">
          {activeTab === "photos" && (
            <MainDashButton
              text="Add to Blanket"
              disabled={selected.length === 0}
              onClick={handleAddSelected}
            />
          )}
        </div>
      </div>
    </Model>
  );
}
