import { useState } from "react";

import EmptyState from "src/components/ui/EmptyState";
import ConfirmDialog from "src/components/ui/ConfirmDialog";
import Pagination from "src/components/ui/Pagination";

import { useUserUploads } from "src/hooks/queries/upload.queries";

import { Trash } from "lucide-react";
import getImageLink from "src/utils/getImageLink";
import { IMAGE_TYPE, panels } from "src/utils/defaultSettings";

type CustomPanel = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

type Props = {
  onDelete: (id: string, type: IMAGE_TYPE) => void;
};

const ITEMS_PER_PAGE = 9;

export default function CustomPanelsList({ onDelete }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUserUploads({
    type: panels.custome_panel.key,
    used: false,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const panelsList: CustomPanel[] = data?.data || [];
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

  if (!panelsList.length) {
    return (
      <EmptyState
        title="No Custom Heirloom Panels™ Yet"
        description="Your Custom Heirloom Panels™ will appear here once created."
      />
    );
  }

  return (
    <div className="space-y-6 rounded-3xl bg-white drop-shadow-sm p-6">
      {/* GRID */}
      <div className="flex flex-wrap gap-4">
        {panelsList.map((panel) => (
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
  onDelete: (id: string, type: IMAGE_TYPE) => void;
}) {
  return (
    <div className="group relative w-fit overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* IMAGE */}
      <img
        src={getImageLink(panel.imageUrl)}
        alt="Custom Panel"
        className="aspect-square w-40 object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
        <ConfirmDialog
          title="Delete Custom Panel?"
          description="This action cannot be undone."
          onConfirm={() => onDelete(panel.id, panels.custome_panel.key)}
        >
          <button className="absolute end-2 top-1 rounded-full bg-red-500 px-2 py-1 text-sm font-medium text-white">
            <Trash className="inline-block h-4 w-4" />
          </button>
        </ConfirmDialog>
      </div>
    </div>
  );
}