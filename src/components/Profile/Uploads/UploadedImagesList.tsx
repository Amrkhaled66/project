import { Trash2 } from "lucide-react";
import Pagination from "src/components/ui/Pagination";

type UploadedImagesListProps = {
  uploads: any[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  isUserList?: boolean;
};

export default function UploadedImagesList({
  uploads,
  isLoading,
  isError,
  page,
  pageCount,
  onPageChange,
  onDelete,
  isUserList,
}: UploadedImagesListProps) {
  return (
    <div className="w-full space-y-4 ">
      <header>
        <h2 className="text-lg font-semibold text-neutral-900">
          Uploaded Photos
        </h2>
        <p className="text-sm text-neutral-500">
          Manage your previously uploaded images.
        </p>
      </header>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 w-full animate-pulse rounded-lg bg-neutral-200"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load uploads. Please try again.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {/* Grid */}
          <div className="max-h-[420px] overflow-auto pr-1">
            <div
              className={` ${isUserList ? "grid-cols-3" : "grid-cols-6"} grid flex-wrap gap-4`}
            >
              {uploads.map((img) => (
                <div
                  key={img.id}
                  className={
                    "group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg"
                  }
                >
                  <img
                    src={img.imageUrl}
                    className="object-fit aspect-square size-full object-cover transition duration-300 group-hover:scale-105"
                    alt="uploaded"
                  />

                  <button
                    onClick={() => onDelete(img.id)}
                    className="absolute top-2 right-2 rounded-full bg-white/95 p-1.5 text-red-600 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {uploads.length === 0 && (
                <div className="col-span-full py-6 text-center text-neutral-500">
                  No uploaded photos yet.
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            pageCount={pageCount}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
