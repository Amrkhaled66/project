import { useState } from "react";
import PanelsLibrary from "src/components/Profile/CustomPanels/PanelsLibrary";
import PanelMergePreview from "src/components/Profile/CustomPanels/PanelMergePreview";
import UploadMergedPanel from "src/components/Profile/CustomPanels/UploadMergedPanel";
import CustomPanelsList from "src/components/Profile/CustomPanels/CustomPanelsList";
import PageHeader from "src/components/ui/PageHeader";
import Toast from "src/components/ui/Toast";
import {
  useUserUploads,
  useUploadMyImages,
  useDeleteMyUpload,
} from "src/hooks/queries/upload.queries";
import usePageTitle from "src/hooks/useUpdatePageTitle";
import { panels as defaultPanelsSettings } from "src/utils/defaultSettings";

const ITEMS_PER_PAGE = 9;

type Panel = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

export default function CustomPanels() {
  usePageTitle("Custom Panel Studio™");
  const [page, setPage] = useState(1);

  const [selectedPanels, setSelectedPanels] = useState<Panel[]>([]);
  const [mergedFile, setMergedFile] = useState<File | null>(null);

  const uploadMutation = useUploadMyImages();

  const handleUploadMergedPanel = async () => {
    if (!mergedFile) return;

    try {
      await uploadMutation.mutateAsync({
        files: [mergedFile],
        type: defaultPanelsSettings.custome_panel.key,
      });

      Toast("Custom panel created successfully!", "success", "#ecfdf5", "top");
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

  const { data, isLoading, isError } = useUserUploads({
    used: false,
    type: [defaultPanelsSettings.corner.key, defaultPanelsSettings.panel.key],
    limit: ITEMS_PER_PAGE,
    page,
  });

  const deleteMutation = useDeleteMyUpload();

  const panels: Panel[] = data?.data || [];
  const pageCount = data?.pagination?.pages || 1;

  const handleDeletePanel = (id: string, type: string) => {
    deleteMutation.mutate({ uploadId: id, type });
  };

  const handleSelectPanel = (panel: Panel) => {
    setSelectedPanels((prev) => {
      if (prev.some((p) => p.id === panel.id)) return prev;
      return [...prev, panel];
    });
  };

  const handleUnselectPanel = (panelId: string) => {
    setSelectedPanels((prev) => prev.filter((p) => p.id !== panelId));
  };

  const handleClearSelection = () => {
    setSelectedPanels([]);
    setMergedFile(null);
  };

  return (
    <div className="mx-auto space-y-10">
      <PageHeader
        title="Custom Panel Studio™"
        subtitle="Compose custom Heirloom Panels™ by combining Blueprint™ components into a single panel element."
      />

      <CustomPanelsList onDelete={handleDeletePanel} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
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

        <div className="space-y-4">
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
