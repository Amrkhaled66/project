import React, { useMemo, useState } from "react";
import useUploadForm from "src/hooks/useUploadForm";
import FilePreviewGrid from "./FilePreviewGrid";
import DropZone from "./Dropzone";
import FormSelect from "src/components/ui/FormSelect";

type UploadType = "panel" | "corner";

type UploadFormProps = {
  maxFiles?: number;
  accept?: string;
  isLoading: boolean;
  onUpload: (
    files: File[],
    type: UploadType,
    clear: () => void
  ) => Promise<void>;
};

export default function UploadForm({
  maxFiles = 150,
  accept = "image/*",
  isLoading,
  onUpload,
}: UploadFormProps) {
  /* ---------------- Type ---------------- */
  const [type, setType] = useState<UploadType>("panel");

  /* ---------------- Upload Hook ---------------- */
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

  const disabled = files.length === 0 || isLoading;

  /* ---------------- Handlers ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    await onUpload(files, type, clear);
  };

  /* ---------------- Previews ---------------- */
  const previews = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
      })),
    [files]
  );

  React.useEffect(
    () => () => previews.forEach((p) => URL.revokeObjectURL(p.url)),
    [previews]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-8 h-fit rounded-2xl border bg-white/70 p-6 shadow-md backdrop-blur-md
        ${isLoading ? "pointer-events-none opacity-60" : ""}`}
    >
      {/* HEADER */}
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Upload from Your Device</h2>
        <p className="text-sm text-neutral-500">
          Upload up to <span className="font-medium">{maxFiles}</span> photos.
        </p>
      </header>

      {/* TYPE SELECT */}
      <FormSelect
        label="Image Type"
        name="type"
        required
        value={type}
        onChange={(e) => setType(e.target.value as UploadType)}
        options={[
          { label: "Panel", value: "panel" },
          { label: "Corner", value: "corner" },
        ]}
        placeholder="Select image type"
      />

      {/* DROPZONE */}
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

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* PREVIEWS */}
      <FilePreviewGrid
        files={files}
        previews={previews}
        removeFile={removeFile}
        maxFiles={maxFiles}
      />

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={disabled}
        className={`w-full rounded-xl px-4 py-3 font-semibold transition-all
          ${
            disabled
              ? "bg-neutral-300 text-neutral-600"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
      >
        {isLoading ? "Uploading..." : "Upload Selected Files"}
      </button>
    </form>
  );
}
