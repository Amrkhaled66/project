import React, { useCallback, useMemo, useRef, useState } from "react";

/**
 * UploadFromDevice
 * -------------------------------------------------------
 * A single-file React (TypeScript-friendly) component that reproduces
 * the UI from the screenshot and handles logic via a custom hook.
 * - Drag & drop or click to browse
 * - Limit of 150 images
 * - Optional personal letter
 * - Accessible + keyboard friendly
 * - Clean Tailwind styling (no external UI libs)
 *
 * Usage:
 * <UploadFromDevice onSubmit={async (payload) => { await apiUpload(payload) }} />
 */

// ---------------------------
// Types
// ---------------------------
export type UploadPayload = {
  files: File[];
  note: string;
};

export type UploadFromDeviceProps = {
  maxFiles?: number; // default 150
  accept?: string; // default "image/*"
  onSubmit?: (payload: UploadPayload) => Promise<void> | void;
};

// ---------------------------
// Custom Hook
// ---------------------------
function useUploadForm({
  maxFiles = 150,
  accept = "image/*",
}: {
  maxFiles?: number;
  accept?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const remaining = Math.max(0, maxFiles - files.length);

  const addFiles = useCallback(
    (incoming: FileList | File[] | null) => {
      if (!incoming) return;
      setError(null);
      const list = Array.from(incoming);

      // Filter by accept pattern if provided
      const acceptPattern = accept;
      const filtered = acceptPattern
        ? list.filter((f) => f.type.match(acceptPattern.replace("*", ".*")))
        : list;

      // De-duplicate by name+size+lastModified
      const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
      const exists = new Set(files.map(key));

      let next = files.slice();
      for (const f of filtered) {
        if (next.length >= maxFiles) break;
        const k = key(f);
        if (!exists.has(k)) {
          next.push(f);
          exists.add(k);
        }
      }

      if (
        next.length === files.length &&
        filtered.length > 0 &&
        files.length >= maxFiles
      ) {
        setError(`You can upload up to ${maxFiles} photos.`);
      }

      setFiles(next);
    },
    [accept, files, maxFiles],
  );

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clear = useCallback(() => {
    setFiles([]);
    setNote("");
    setError(null);
  }, []);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer?.files?.length) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles],
  );

  return {
    files,
    note,
    setNote,
    error,
    setError,
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
    accept,
    maxFiles,
  } as const;
}

// ---------------------------
// Helpers
// ---------------------------
function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

// ---------------------------
// Component
// ---------------------------
export default function Uploadform({
  maxFiles = 150,
  accept = "image/*",
  onSubmit,
}: UploadFromDeviceProps) {
  const {
    files,
    note,
    setNote,
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

  const disabled = files.length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    try {
      if (onSubmit) {
        await onSubmit({ files, note });
      } else {
        // Demo: simulate async
        await new Promise((res) => setTimeout(res, 600));
        alert(
          `${files.length} file(s) queued. Optional note length: ${note.length}`,
        );
      }
      clear();
    } catch (err: any) {
      console.error(err);
      // Set a user-friendly fallback message
      // (surface server error message if provided)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const msg = err?.message || "Upload failed. Please try again.";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (window as any).toast?.error?.(msg);
    }
  };

  // Thumbnails (object URLs) — memoize so they don't recreate repeatedly
  const previews = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
      })),
    [files],
  );

  // Revoke object URLs on unmount to avoid memory leaks
  React.useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="bg-mainProfile w-full space-y-6 rounded-lg border border-neutral-200 p-6 shadow-sm"
      >
        <header>
          <h2 className="text-lg font-semibold text-neutral-900">
            Upload from Your Device
          </h2>
          <p className="text-base text-neutral-500">
            Upload up to 150 photos directly from your computer or phone.
          </p>
        </header>

        <section
          aria-label="Drag & Drop Photos Here or Click to Browse"
          className="space-y-2"
        >
          <p className="text-sm font-medium text-neutral-700">
            Drag &amp; Drop Photos Here or Click to Browse
          </p>

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && openFileDialog()
            }
            className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center transition-all outline-none ${dragActive ? "border-neutral-700 bg-neutral-50" : "border-neutral-300 bg-white"}`}
            aria-describedby="upload-help"
            onClick={openFileDialog}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple
              hidden
              onChange={handleChange}
            />
            <div className="space-y-3">
              <p className="text-sm text-neutral-500">
                Click or drag files to this area to upload. Max {maxFiles}{" "}
                photos.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 active:scale-[.99]"
              >
                Browse Files
              </button>
            </div>
          </div>

          <p id="upload-help" className="text-xs text-neutral-500">
            Accepted: {accept}. You can add {remaining} more.
          </p>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </section>

        {files.length > 0 && (
          <section className="space-y-2">
            <p className="text-sm font-medium text-neutral-700">
              Selected ({files.length}/{maxFiles})
            </p>
            <ul className="grid grid-cols-3 gap-3">
              {previews.map((p, idx) => (
                <li
                  key={`${p.name}-${idx}`}
                  className="group relative overflow-hidden rounded-md border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.name}
                    className="h-24 w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 px-1 py-0.5 text-[11px] text-white">
                    <span className="truncate" title={p.name}>
                      {p.name}
                    </span>
                    <span className="ml-2 shrink-0">{formatBytes(p.size)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 rounded-full bg-white/90 px-2 text-xs text-neutral-700 shadow hover:bg-white"
                    aria-label={`Remove ${p.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-y-3">
          <label
            htmlFor="note"
            className="text-sm font-medium text-neutral-700"
          >
            Add a personal letter (Optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your heartfelt message here (e.g., ‘To my loving grandma, hope this blanket brings you warmth and joy!’)"
            className="min-h-[80px] w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-neutral-800 focus:ring-2 focus:ring-neutral-800 focus:outline-none"
          />
        </section>

        <div className="pt-2">
          <button
            type="submit"
            disabled={disabled}
            className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white transition ${disabled ? "cursor-not-allowed bg-neutral-400" : "bg-neutral-700 hover:bg-neutral-800 active:scale-[.99]"}`}
          >
            Upload Selected Files
          </button>
        </div>
      </form>
    </div>
  );
}
