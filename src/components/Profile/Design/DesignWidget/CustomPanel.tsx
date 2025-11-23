import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "src/context/cart.context";
import UploadImage from "src/components/ui/UploadImage";
import { images } from "src/data/images";
import { Check, X } from "lucide-react";
import Toast from "src/components/ui/Toast";
import { useDesign } from "src/context/desgin.context";

export default function CustomPanelTab() {
  const { cartItem, updateCustomPanelProps } = useCart();
  const upgrade = cartItem.upgrades.find((u) => u.id === "customPanel");
  const { handleAddItem } = useDesign();

  const [mode, setMode] = useState<"upload" | "merge" | null>(
    upgrade?.props?.mode || null
  );

  const [preview, setPreview] = useState(upgrade?.props?.image || null);
  const [selectedPanels, setSelectedPanels] = useState<string[]>(
    upgrade?.props?.selectedPanels || []
  );
  const [notes, setNotes] = useState(upgrade?.props?.notes || "");
  const [isAddedToCanvas, setIsAddedToCanvas] = useState(
    upgrade?.props?.addedToCanvas || false
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const resetPanel = () => {
    setPreview(null);
    setSelectedPanels([]);
    setNotes("");
    setIsAddedToCanvas(false);

    updateCustomPanelProps({
      mode: null,
      image: null,
      selectedPanels: [],
      notes: "",
      addedToCanvas: false,
    });
  };

  const handleModeChange = (newMode: "upload" | "merge") => {
    if (mode !== newMode) {
      resetPanel();
      setMode(newMode);

      updateCustomPanelProps({
        mode: newMode,
        image: null,
        selectedPanels: [],
        addedToCanvas: false,
      });
    }
  };


  const handleUpload = (files: string[]) => {
    const img = files[0];
    setPreview(img);
    setIsAddedToCanvas(false);

    updateCustomPanelProps({
      mode: "upload",
      image: img,
      selectedPanels: [],
      addedToCanvas: false,
    });
  };

  const handleSelectPanel = (id: string) => {
    setSelectedPanels((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );

    setIsAddedToCanvas(false);
  };

  const mergeImages = async () => {
    if (selectedPanels.length === 0) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imgs = await Promise.all(
        selectedPanels.map((src) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });
        })
      );

      const cols = Math.ceil(Math.sqrt(imgs.length));
      const rows = Math.ceil(imgs.length / cols);
      const cellSize = 400;

      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      imgs.forEach((img, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = col * cellSize;
        const y = row * cellSize;
        ctx.drawImage(img, x, y, cellSize, cellSize);
      });

      const finalImage = canvas.toDataURL("image/png");
      setPreview(finalImage);
      updateCustomPanelProps({
        mode: "merge",
        image: finalImage,
        selectedPanels,
        addedToCanvas: false,
      });
    } catch (err) {
      Toast("Failed to merge images", "error", "#fee", "top-end");
    }

    setIsProcessing(false);
  };


  const handleAddToCanvas = () => {
    if (!preview) return;

    /// 🔥 Add to canvas grid using useDesign
    handleAddItem({
      id: "custom-panel",
      image: preview,
    });

    setIsAddedToCanvas(true);

    updateCustomPanelProps({
      image: preview,
      notes,
      addedToCanvas: true,
    });

    Toast("Custom panel added to canvas!", "success", "#d4edda", "top-end");
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Custom Panel</h3>
          <p className="text-xs text-gray-500">Upload or merge images</p>
        </div>

        {/* Reset Button */}
        {(preview || selectedPanels.length > 0) && (
          <button
            onClick={resetPanel}
            className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* MODE TOGGLE */}
      <div className="inline-flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => handleModeChange("upload")}
          className={`px-4 py-2 text-xs rounded-md ${
            mode === "upload" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          📤 Upload
        </button>
        <button
          onClick={() => handleModeChange("merge")}
          className={`px-4 py-2 text-xs rounded-md ${
            mode === "merge" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          🔗 Merge
        </button>
      </div>

      {/* ---------------- UPLOAD MODE ---------------- */}
      <AnimatePresence mode="wait">
        {mode === "upload" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-white p-4"
          >
            <UploadImage onUpload={handleUpload} />

            {preview && (
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={preview}
                className="mt-4 h-44 w-44 rounded-lg shadow object-cover mx-auto"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- MERGE MODE ---------------- */}
      <AnimatePresence mode="wait">
        {mode === "merge" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-white p-4 space-y-4"
          >
            <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto">
              {images.map((img) => (
                <motion.div
                  key={img}
                  whileHover={{ scale: 1.05 }}
                  className={`relative cursor-pointer size-[70px] rounded-lg overflow-hidden border ${
                    selectedPanels.includes(img)
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleSelectPanel(img)}
                >
                  <img src={img} className="object-cover w-full h-full" />

                  {selectedPanels.includes(img) && (
                    <div className="absolute top-1 right-1 h-5 w-5 bg-blue-600 text-white flex items-center justify-center text-xs rounded-full">
                      {selectedPanels.indexOf(img) + 1}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {selectedPanels.length > 0 && (
              <button
                onClick={mergeImages}
                className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                {isProcessing ? "Merging..." : "✨ Merge Panels"}
              </button>
            )}

            {preview && (
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                src={preview}
                className="mt-2 h-44 w-44 rounded-lg shadow mx-auto object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTES */}
      {preview && (
        <textarea
          placeholder="Add printing notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border p-3 text-sm"
          rows={2}
        />
      )}

      {/* ADD TO CANVAS */}
      {preview && !isAddedToCanvas && (
        <button
          onClick={handleAddToCanvas}
          className="w-full py-2.5 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition"
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
