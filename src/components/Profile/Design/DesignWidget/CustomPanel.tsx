import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Toast from "src/components/ui/Toast";
import Pagination from "src/components/ui/Pagination";
import { useDesign } from "src/context/desgin.context";
import { useUploads } from "src/hooks/queries/upload.queries";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 12;

export default function CustomPanelTab() {
  const { designData, update } = useDesign();

  // ---------------- PAGINATION ----------------
  const [page, setPage] = useState(1);

  const { data, isLoading } = useUploads(page, ITEMS_PER_PAGE);
  const uploads = data?.data || [];
  const pagination = data?.pagination;

  const customPanel = designData.upgrades.props.customPanel;

  // ---------------- STATE ----------------
  const [localSelect, setLocalSelect] = useState<string[]>([]);
  const [localPreview, setLocalPreview] = useState<string | null>(
    customPanel.image || null
  );
  const [localNotes, setLocalNotes] = useState(
    customPanel.options?.notes || ""
  );
  const [isAddedToCanvas, setIsAddedToCanvas] = useState(
    customPanel.options?.addedToCanvas || false
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---------------- RESET ----------------
  const resetPanel = () => {
    setLocalSelect([]);
    setLocalPreview(null);
    setLocalNotes("");
    setIsAddedToCanvas(false);

    update((d) => {
      d.upgrades.props.customPanel = {
        text: "",
        image: null,
        options: {},
      };
    });
  };

  // ---------------- SELECT IMAGE ----------------
  const handleSelectPanel = (src: string) => {
    const updated = localSelect.includes(src)
      ? localSelect.filter((x) => x !== src)
      : [...localSelect, src];

    setLocalSelect(updated);

    update((d) => {
      d.upgrades.props.customPanel.options.selectedPanels = updated;
      d.upgrades.props.customPanel.options.addedToCanvas = false;
    });
  };

  // ---------------- MERGE ----------------
  const mergeImages = async () => {
    if (localSelect.length === 0) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const imgs = await Promise.all(localSelect.map(loadImage));

      const cols = Math.ceil(Math.sqrt(imgs.length));
      const rows = Math.ceil(imgs.length / cols);
      const cellSize = 400;

      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      imgs.forEach((img, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        ctx.drawImage(
          img,
          col * cellSize,
          row * cellSize,
          cellSize,
          cellSize
        );
      });

      const finalImage = canvas.toDataURL("image/png");

      setLocalPreview(finalImage);

      update((d) => {
        d.upgrades.props.customPanel.image = finalImage;
        d.upgrades.props.customPanel.options.selectedPanels = localSelect;
        d.upgrades.props.customPanel.options.addedToCanvas = false;
      });
    } catch (err) {
      console.error("Merge error:", err);
      Toast("Failed to merge images", "error", "#ff0000");
    }

    setIsProcessing(false);
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  // ---------------- ADD TO CANVAS ----------------
  const handleAddToCanvas = () => {
    if (!localPreview) return;

    update((d) => {
      d.photos.items.push({
        id: `custom-panel-${Date.now()}`,
        image: localPreview,
      });

      d.upgrades.props.customPanel.options.addedToCanvas = true;
      d.upgrades.props.customPanel.options.notes = localNotes;
    });

    setIsAddedToCanvas(true);
    Toast("Custom panel added!", "success");
  };

  // ---------------- UI ----------------
  return (
    <div className="mt-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Custom Panel</h3>
          <p className="text-xs text-gray-500">
            Merge from your uploaded images
          </p>
        </div>

        {(localPreview || localSelect.length > 0) && (
          <button
            onClick={resetPanel}
            className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* IMAGES GRID */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-4 gap-1 max-h-52 overflow-y-auto rounded-xl border bg-white p-3"
        >
          {isLoading && (
            <p className="text-sm text-gray-400 col-span-full">
              Loading images…
            </p>
          )}

          {!isLoading &&
            uploads.map((u: any) => {
              const fullSrc = API_URL + u.imageUrl;

              return (
                <motion.div
                  key={u.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSelectPanel(fullSrc)}
                  className={`relative size-[70px] rounded-lg border cursor-pointer overflow-hidden ${
                    localSelect.includes(fullSrc)
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={fullSrc}
                    className="h-full w-full object-cover"
                  />

                  {localSelect.includes(fullSrc) && (
                    <div className="absolute top-1 right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {localSelect.indexOf(fullSrc) + 1}
                    </div>
                  )}
                </motion.div>
              );
            })}
        </motion.div>
      </AnimatePresence>

      {/* PAGINATION */}
      {pagination?.pages > 1 && (
        <Pagination
          pageCount={pagination.pages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {/* MERGE */}
      {localSelect.length > 0 && (
        <button
          onClick={mergeImages}
          className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isProcessing ? "Merging…" : "✨ Merge Selected"}
        </button>
      )}

      {/* PREVIEW */}
      {localPreview && (
        <motion.img
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          src={localPreview}
          className="h-44 w-44 mx-auto rounded-lg shadow object-cover"
        />
      )}

      {/* NOTES */}
      {localPreview && (
        <textarea
          value={localNotes}
          onChange={(e) => {
            setLocalNotes(e.target.value);
            update((d) => {
              d.upgrades.props.customPanel.options.notes = e.target.value;
            });
          }}
          placeholder="Add notes..."
          className="w-full rounded-lg border p-3 text-sm"
          rows={2}
        />
      )}

      {/* ADD TO CANVAS */}
      {localPreview && !isAddedToCanvas && (
        <button
          onClick={handleAddToCanvas}
          className="w-full py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Add to Canvas
        </button>
      )}

      {isAddedToCanvas && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-green-700 text-sm">
          <Check size={14} /> Added to canvas
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
