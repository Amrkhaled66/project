import { useState, useRef, useCallback } from "react";

export default function useUploadForm({
  maxFiles = 150,
  accept = "image/*",
}: {
  maxFiles?: number;
  accept?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const remaining = Math.max(0, maxFiles - files.length);

  const addFiles = useCallback(
    (incoming: FileList | File[] | null) => {
      if (!incoming) return;
      setError(null);
      const list = Array.from(incoming);

      // Filter by accept pattern
      const acceptPattern = accept;
      const filtered = acceptPattern
        ? list.filter((f) => f.type.match(acceptPattern.replace("*", ".*")))
        : list;

      // De-duplicate by name+size+lastModified
      const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
      const exists = new Set(files.map(key));

      let next = [...files];
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
    [accept, files, maxFiles]
  );

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clear = useCallback(() => {
    setFiles([]);
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
    [addFiles]
  );

  return {
    files,
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
