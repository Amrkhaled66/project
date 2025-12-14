import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useUploads, useDeleteUpload } from "src/hooks/queries/upload.queries";
import Pagination from "src/components/ui/Pagination";

const ITEMS_PER_PAGE = 9;

export default function UploadedImagesList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUploads(page, ITEMS_PER_PAGE);
  const deleteMutation = useDeleteUpload();

  const uploads = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="w-full space-y-4 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-md backdrop-blur-sm">
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
          {/* Scrollable Grid */}
          <div className="max-h-[420px] overflow-auto pr-1">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {uploads.map((img: any) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <img
                    src={import.meta.env.VITE_API_URL + img.imageUrl}
                    className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                    alt="uploaded"
                  />

                  <button
                    onClick={() => deleteMutation.mutate(img.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-red-600 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:scale-110"
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
            pageCount={pagination?.pages || 1}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
