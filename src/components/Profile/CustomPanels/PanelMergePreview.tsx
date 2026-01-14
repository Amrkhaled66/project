import { useEffect, useState } from "react";
import { mergeImagesToGrid } from "src/utils/mergeImagesToGrid";
import { Layers } from "lucide-react";

type Panel = {
  id: string;
  imageUrl: string;
};

type Props = {
  panels: Panel[];
  onMerged: (file: File) => void;
  onClear: () => void;
};

export default function PanelMergePreview({
  panels,
  onMerged,
  onClear,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    if (panels.length < 2) {
      setPreview(null);
      return;
    }

    const merge = async () => {
      setIsMerging(true);

      const { blob, previewUrl } = await mergeImagesToGrid(
        panels.map((p) =>  p.imageUrl),
      );

      const file = new File([blob], "custom-panel.png", {
        type: "image/png",
      });

      setPreview(previewUrl);
      onMerged(file);
      setIsMerging(false);
    };

    merge();
  }, [panels, onMerged]);

  return (
    <div className="rounded-xl bg-gray-50 p-6 shadow-sm border border-gray-200 space-y-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          Merged Preview
        </h3>

        {panels.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {panels.length < 2 && !isMerging && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-white py-12 text-center">
          <Layers className="h-10 w-10 text-gray-400" />
          <p className="mt-3 text-sm font-medium text-gray-700">
            Select images to create a custom panel
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Choose at least 2 images from the left
          </p>
        </div>
      )}

      {/* MERGING STATE */}
      {isMerging && (
        <div className="relative h-64 overflow-hidden rounded-lg border bg-white">
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="h-24 w-24 animate-pulse rounded-md bg-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-600">
              Merging panels...
            </p>
          </div>

          <div className="h-full w-full animate-pulse bg-gray-100" />
        </div>
      )}

      {/* PREVIEW */}
      {!isMerging && preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Merged panel preview"
            className="aspect-square max-w-xs rounded-lg border bg-white"
          />
        </div>
      )}
    </div>
  );
}
