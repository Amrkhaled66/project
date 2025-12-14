import React, { useMemo } from "react";
import { useUploadImages } from "src/hooks/queries/upload.queries";
import useUploadForm from "src/hooks/useUploadForm";
import FilePreviewGrid from "./FilePreviewGrid";
import Toast from "src/components/ui/Toast";
import DropZone from "./Dropzone";

export default function Uploadform({
  maxFiles = 150,
  accept = "image/*",
}) {
  const {
    files,
    error,
    dragActive,
    remaining,
    addFiles,
    removeFile,
    clear,
    inputRef,
    openFileDialog,
    onDragOver,
    onDragLeave,
    onDrop,
  } = useUploadForm({ maxFiles, accept });

  const uploadMutation = useUploadImages();
  const disabled = files.length === 0 || uploadMutation.isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    try {
      await uploadMutation.mutateAsync(files);
      Toast("Uploaded Successfully!", "success", "#ecfdf5", "top");
      clear();
    } catch (err: any) {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    }
  };

  const previews = useMemo(
    () =>
      files.map(f => ({
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
      })),
    [files],
  );

  React.useEffect(
    () => () => previews.forEach(p => URL.revokeObjectURL(p.url)),
    [previews],
  );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`w-full space-y-8 rounded-2xl border border-neutral-200 
        bg-white/70 p-6 shadow-md backdrop-blur-md transition-all
        ${uploadMutation.isPending ? "pointer-events-none opacity-60" : ""}`}
      >
        {/* HEADER */}
        <header className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
            Upload from Your Device
          </h2>
          <p className="text-sm text-neutral-500">
            Upload up to{" "}
            <span className="font-medium text-neutral-700">{maxFiles}</span>{" "}
            photos.
          </p>
        </header>

        {/* DROPZONE */}
        <section className="space-y-3">
          <p className="text-sm font-medium text-neutral-700">
            Drag & Drop or Click to Upload
          </p>

          <DropZone
            inputRef={inputRef}
            openDialog={openFileDialog}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            handleChange={handleChange}
            maxFiles={maxFiles}
            accept={accept}
            dragActive={dragActive}
            remaining={remaining}
          />

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}
        </section>

        {/* PREVIEW GRID */}
        <FilePreviewGrid
          files={files}
          previews={previews}
          removeFile={removeFile}
          maxFiles={maxFiles}
        />

        {/* SUBMIT BUTTON */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all 
            ${
              disabled
                ? "cursor-not-allowed bg-neutral-300 text-neutral-600"
                : "bg-neutral-900 hover:bg-neutral-800 active:scale-[.97]"
            }`}
          >
            {uploadMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Selected Files"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
