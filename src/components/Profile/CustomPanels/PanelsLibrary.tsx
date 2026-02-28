import Skeleton from "react-loading-skeleton";
import { Check, Image as ImageIcon } from "lucide-react";

import Pagination from "src/components/ui/Pagination";
import EmptyState from "src/components/ui/EmptyState";
import getImageLink from "src/utils/getImageLink";
type Panel = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

type Props = {
  panels: Panel[];
  selectedPanels: Panel[];
  onSelect: (panel: Panel) => void;
  onUnselect: (panelId: string) => void;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
};

const MAX_SELECTION = 4;

export default function PanelsLibrary({
  panels,
  selectedPanels,
  onSelect,
  onUnselect,
  page,
  pageCount,
  onPageChange,
  isLoading,
  isError,
}: Props) {
  const selectionPercentage = (selectedPanels.length / MAX_SELECTION) * 100;

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="space-y-4 rounded-xl border bg-gray-50 p-6 shadow-sm">
        <Skeleton height={18} width={160} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <EmptyState
        title="Failed to load panels"
        description="Please try again later."
      />
    );
  }

  /* ---------------- Empty ---------------- */
  if (!panels.length) {
    return (
      <EmptyState
        title="No Panels Found"
        description="Upload panels to start creating a custom panel."
      />
    );
  }

  return (
    <div className="space-y-6 rounded-xl border bg-gray-50 p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Panel Selection
          </span>
        </div>

        <span className="text-sm font-semibold text-gray-900">
          {selectedPanels.length} / {MAX_SELECTION}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full transition-all duration-300 ${
            selectedPanels.length === MAX_SELECTION
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${selectionPercentage}%` }}
        />
      </div>

      {selectedPanels.length === MAX_SELECTION && (
        <p className="text-xs font-medium text-green-600">
          ✓ Maximum panels selected
        </p>
      )}

      {/* GRID */}
      <div className="grid max-h-[220px] grid-cols-2 gap-4 overflow-y-auto px-1 sm:grid-cols-3 lg:grid-cols-4">
        {panels.map((panel) => {
          const isSelected = selectedPanels.some((p) => p.id === panel.id);

          const disabled =
            !isSelected && selectedPanels.length >= MAX_SELECTION;

          return (
            <PanelCard
              key={panel.id}
              panel={panel}
              isSelected={isSelected}
              disabled={disabled}
              panelNumber={
                selectedPanels.findIndex((p) => p.id === panel.id) + 1
              }
              onClick={() =>
                isSelected ? onUnselect(panel.id) : onSelect(panel)
              }
            />
          );
        })}
      </div>

      {/* PAGINATION */}
      {pageCount > 1 && (
        <Pagination
          currentPage={page}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

/* ---------------------------- Card ---------------------------- */

function PanelCard({
  panel,
  isSelected,
  disabled,
  onClick,
  panelNumber,
}: {
  panel: Panel;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
  panelNumber: number;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${
        isSelected
          ? "border-blue-500 shadow-md"
          : "border-gray-200 hover:shadow-sm"
      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {/* IMAGE */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={getImageLink(panel.imageUrl)}
          alt="Panel"
          className="h-full w-full object-cover"
        />

        {/* SELECTED OVERLAY */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-600/85">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Check className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        )}

        {/* DISABLED OVERLAY */}
        {disabled && !isSelected && (
          <div className="absolute inset-0 bg-gray-900/10" />
        )}

        {/* ORDER BADGE */}
        {isSelected && (
          <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600 shadow">
            {panelNumber}
          </div>
        )}
      </div>
    </button>
  );
}
