import formatBytes from "src/utils/formatBytes";

export default function FilePreviewGrid({
  files,
  previews,
  removeFile,
  maxFiles,
}: {
  files: File[];
  previews: { name: string; url: string; size: number }[];
  removeFile: (idx: number) => void;
  maxFiles: number;
}) {
  return (
    files.length > 0 && (
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
    )
  );
}
