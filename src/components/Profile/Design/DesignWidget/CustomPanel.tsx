import { useState } from "react";
import { Check } from "lucide-react";

import { useDesign } from "src/context/desgin.context";
import { useMyCustomPanels } from "src/hooks/queries/upload.queries";
import EmptyState from "src/components/ui/EmptyState";
import Button from "src/components/ui/Button";

type CustomPanelItem = {
  id: string;
  imageUrl: string;
};

const ITEMS_PER_PAGE = 20;

const CustomPanel = () => {
  const { designData, update } = useDesign();

  const maxphoto = designData.canvas.size.cols * designData.canvas.size.rows;

  /* ---------------- Fetch custom panels ---------------- */
  const { data, isLoading, isError } = useMyCustomPanels(1, ITEMS_PER_PAGE);

  const panels: CustomPanelItem[] = data?.data || [];

  /* ---------------- Selection ---------------- */
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (src: string) => {
    setSelected((prev) =>
      prev.includes(src)
        ? prev.filter((i) => i !== src)
        : designData.photos.items.length + selected.length < maxphoto
          ? [...prev, src]
          : [...prev],
    );
  };

  /* ---------------- Add to design ---------------- */
  const handleAddSelected = () => {
    selected.slice(0, maxphoto).forEach((src) => {
      update((d) => {
        d.photos.items.push({
          id: src,
          image: src,
          type: "custom_panael",
        });
      });
    });

    setSelected([]);
  };

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <EmptyState
        title="Failed to load custom panels"
        description="Please try again later."
      />
    );
  }

  /* ---------------- Empty ---------------- */
  if (!panels.length) {
    return (
      <EmptyState
        title="No Custom Panels"
        description="Create custom panels first to use them in your design."
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {panels.map((panel) => {
          const src =  panel.imageUrl;
          const isSelected = selected.includes(src);

          return (
            <button
              key={panel.id}
              onClick={() => toggleSelect(src)}
              className={`relative overflow-hidden rounded-lg border transition ${
                isSelected ? "border-primary shadow-md" : "border-gray-200"
              }`}
            >
              <img
                src={src}
                alt="Custom panel"
                className="aspect-square w-full object-cover"
              />

              {/* SELECTED OVERLAY */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Check className="text-primary h-5 w-5" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ACTION */}
      <div className="flex items-center justify-between border-t pt-4">
        {/* <span className="text-sm text-gray-600">
          Selected {selected.length} / {maxphoto}
        </span> */}

        <Button onClick={handleAddSelected} disabled={!selected.length}>
          Add to Design
        </Button>
      </div>
    </div>
  );
};

export default CustomPanel;
