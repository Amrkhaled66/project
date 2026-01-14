import { useState } from "react";
import Toast from "src/components/ui/Toast";

import {
  useMyUploads,
  useUploadMyImages,
  useDeleteMyUpload,
} from "src/hooks/queries/upload.queries";

import PanelsLibrary from "src/components/Profile/CustomPanels/PanelsLibrary";
import PanelMergePreview from "src/components/Profile/CustomPanels/PanelMergePreview";
import UploadMergedPanel from "src/components/Profile/CustomPanels/UploadMergedPanel";
import CustomPanelsList from "src/components/Profile/CustomPanels/CustomPanelsList";

const ITEMS_PER_PAGE = 9;

type Panel = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

export default function CustomPanels() {
  /* ---------------- Pagination (library only) ---------------- */
  const [page, setPage] = useState(1);

  /* ---------------- Selection & Merge ---------------- */
  const [selectedPanels, setSelectedPanels] = useState<Panel[]>([]);
  const [mergedFile, setMergedFile] = useState<File | null>(null);

  /* ---------------- Upload merged panel ---------------- */
  const uploadMutation = useUploadMyImages();

  const handleUploadMergedPanel = async () => {
    if (!mergedFile) return;

    try {
      await uploadMutation.mutateAsync({
        files: [mergedFile],
        type: "CUSTOME_PANEL",
      });

      Toast(
        "Custom panel created successfully!",
        "success",
        "#ecfdf5",
        "top",
      );

      // reset merge flow
      setSelectedPanels([]);
      setMergedFile(null);
    } catch (err: any) {
      Toast(
        err?.message || "Failed to upload custom panel",
        "error",
        "#fee2e2",
        "top",
      );
    }
  };

  /* ---------------- Fetch base panels (library) ---------------- */
  const { data, isLoading, isError } = useMyUploads(
    page,
    ITEMS_PER_PAGE,
  );

  const deleteMutation = useDeleteMyUpload();

  const panels: Panel[] = data?.data || [];
  const pageCount = data?.pagination?.pages || 1;

  const handleDeletePanel = (id: string) => {
    deleteMutation.mutate(id);
  };

  /* ---------------- Selection handlers ---------------- */
  const handleSelectPanel = (panel: Panel) => {
    setSelectedPanels((prev) => {
      if (prev.some((p) => p.id === panel.id)) return prev;
      return [...prev, panel];
    });
  };

  const handleUnselectPanel = (panelId: string) => {
    setSelectedPanels((prev) =>
      prev.filter((p) => p.id !== panelId),
    );
  };

  const handleClearSelection = () => {
    setSelectedPanels([]);
    setMergedFile(null);
  };

  return (
    <div className="mx-auto space-y-10">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Custom Panels
        </h1>
        <p className="text-base font-light sm:text-lg">
          View your custom panels, select up to 4 base panels, merge them,
          and save a new custom panel.
        </p>
      </div>

      {/* 1️⃣ EXISTING CUSTOM PANELS (MERGED RESULTS) */}
      <CustomPanelsList onDelete={handleDeletePanel} />

      {/* 2️⃣ LIBRARY + MERGE WORKSPACE */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT — PANELS LIBRARY */}
        <PanelsLibrary
          panels={panels}
          selectedPanels={selectedPanels}
          onSelect={handleSelectPanel}
          onUnselect={handleUnselectPanel}
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          isLoading={isLoading}
          isError={isError}
        />

        {/* RIGHT — MERGE WORKSPACE */}
        <div className="space-y-6">
          <PanelMergePreview
            panels={selectedPanels}
            onMerged={setMergedFile}
            onClear={handleClearSelection}
          />

          {selectedPanels.length > 1 && (
            <UploadMergedPanel
              file={mergedFile}
              isUploading={uploadMutation.isPending}
              onUpload={handleUploadMergedPanel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
