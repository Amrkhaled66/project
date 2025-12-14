import React from "react";
import { UploadCloud } from "lucide-react";

const DropZone = ({
  inputRef,
  openDialog,
  onDragOver,
  onDragLeave,
  onDrop,
  handleChange,
  maxFiles,
  accept,
  dragActive,
  remaining,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  openDialog: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxFiles: number;
  accept: string;
  dragActive: boolean;
  remaining: number;
}) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openDialog}
      role="button"
      tabIndex={0}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all
        ${
          dragActive
            ? "border-blue-600 bg-blue-50/60"
            : "border-neutral-300 bg-white"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={handleChange}
      />

      {/* Upload Icon */}
      <div className="flex justify-center mb-4">
        <UploadCloud
          size={48}
          className={`${
            dragActive ? "text-blue-600" : "text-neutral-500"
          } transition-colors`}
        />
      </div>

      <p className="text-sm text-neutral-600">
        Click or drag files to upload. Max {maxFiles} photos.
      </p>

      <p className="text-xs text-neutral-400 mt-1">Remaining: {remaining}</p>

      <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 active:scale-[.99]"
      >
        Browse Files
      </button>
    </div>
  );
};

export default DropZone;
