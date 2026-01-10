import { useState } from "react";

import EmptyState from "src/components/ui/EmptyState";
import ConfirmDialog from "src/components/ui/ConfirmDialog";
import Pagination from "src/components/ui/Pagination";

import { useMyCustomPanels } from "src/hooks/queries/upload.queries";
import { Trash } from "lucide-react";
type CustomPanel = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

type Props = {
  onDelete: (id: string) => void;
};

const ITEMS_PER_PAGE = 9;

export default function CustomPanelsList({ onDelete }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMyCustomPanels(page, ITEMS_PER_PAGE);

  const panels: CustomPanel[] = data?.data || [];
  const pageCount = data?.pagination?.pages || 1;

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 w-full animate-pulse rounded-lg bg-neutral-200"
          />
        ))}
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Failed to load your custom panels."
      />
    );
  }

  /* ---------------- Empty ---------------- */
  if (!panels.length) {
    return (
      <EmptyState
        title="No Custom Panels"
        description="You haven’t created any custom panels yet."
      />
    );
  }


 return (
  <div className="rounded-xl bg-gray-50 p-6 shadow-sm border border-gray-200 space-y-6">
    {/* GRID */}
    <div className="flex flex-wrap gap-4">
      {panels.map((panel) => (
        <PanelCard key={panel.id} panel={panel} onDelete={onDelete} />
      ))}
    </div>

    {/* PAGINATION */}
    {pageCount > 1 && (
      <Pagination
        currentPage={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    )}
  </div>
);

}

/* -------------------------------- Card -------------------------------- */

function PanelCard({
  panel,
  onDelete,
}: {
  panel: CustomPanel;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="group relative w-fit overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* IMAGE */}
      <img
        src={import.meta.env.VITE_API_URL + panel.imageUrl}
        alt="Custom Panel"
        className="object-fit aspect-square w-40"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0  flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
      

        {/* DELETE */}
        <ConfirmDialog
          title="Delete Custom Panel?"
          description="This action cannot be undone."
          onConfirm={() => onDelete(panel.id)}
        >
          <button className="rounded-full bg-red-500  py-1 px-2 absolute top-1 end-2  text-sm font-medium text-white">
            <Trash className="inline-block h-4 w-4" />
          </button>
        </ConfirmDialog>
      </div>
    </div>
  );
}
