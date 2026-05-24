import { CloudAlert, Trash2 } from "lucide-react";
import Pagination from "src/components/ui/Pagination";
import { IMAGE_TYPE } from "src/utils/defaultSettings";
import getImageLink from "src/utils/getImageLink";
type UploadedImagesListProps = {
  uploads: any[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string, type: IMAGE_TYPE) => void;
  isUserList?: boolean;
  type: IMAGE_TYPE;
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
  type,
}: UploadedImagesListProps) {
  return (
    <div className="space-y-4">
      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg bg-neutral-200"
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
            <div>
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
                      src={getImageLink(img.imageUrl)}
                      className="object-fit aspect-square size-full object-cover transition duration-300 group-hover:scale-105"
                      alt="uploaded"
                    />

                    <button
                      onClick={() => onDelete(img.id, type)}
                      className="absolute top-2 right-2 rounded-full bg-white/95 p-1.5 text-red-600 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              {uploads.length === 0 && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-subTitle/5 drop-shadow-md flex items-center justify-center rounded-full p-5">
                    <CloudAlert className="text-secondary" size={40} />
                  </div>
                  <p className="font-header text-primary-container col-span-full py-6 text-center text-lg font-bold">
                    No Component Library™ yet.
                  </p>
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
