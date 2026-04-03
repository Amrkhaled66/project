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
      className={`bg-subTitle/2 border-subTitle mx-auto w-[95%] cursor-pointer rounded-xl border border-dashed p-8 text-center transition-all ${
        dragActive ? "border-blue-600 bg-blue-50/60" : ""
      } `}
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
      <div className="mb-4 flex justify-center">
        <UploadCloud
          size={48}
          className={`${
            dragActive ? "text-blue-600" : "text-neutral-500"
          } transition-colors`}
        />
      </div>

      <p className="text-lg font-semibold font-subTitle text-primary-container">Drag or select images... </p>

      <p className="mt-1 text-xs text-neutral-400">Remaining: {remaining}</p>

      <button
        type="button"
        className="bg-subTitle/20 animate mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-black hover:scale-105 active:scale-[.99]"
      >
        Select Files
      </button>
    </div>
  );
};

export default DropZone;
