import { useState } from "react";
import UploadForm from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";
import Tabs from "src/components/ui/Tabs";
import {
  useUploadMyImages,
  useUserUploads,
  useDeleteMyUpload,
} from "src/hooks/queries/upload.queries";
import Toast from "src/components/ui/Toast";
import { MAX_UPLOAD_SIZE, panels, IMAGE_TYPE } from "src/utils/defaultSettings";
import usePageTitle from "src/hooks/useUpdatePageTitle";

const ITEMS_PER_PAGE = 9;

export default function Uploads() {
  usePageTitle("Panel Library");

  /* ---------------- Tabs ---------------- */
  const [activeTab, setActiveTab] = useState<IMAGE_TYPE>("panel");
  const [hasVisitedCornerTab, setHasVisitedCornerTab] = useState(false);

  /* ---------------- Pagination ---------------- */
  const [panelPage, setPanelPage] = useState(1);
  const [cornerPage, setCornerPage] = useState(1);

  /* ---------------- Upload ---------------- */
  const uploadMutation = useUploadMyImages();

  const handleUpload = async (
    files: File[],
    type: IMAGE_TYPE,
    clear: () => void
  ) => {
    try {
      await uploadMutation.mutateAsync({ files, type });
      Toast("Uploaded Successfully!", "success", "#ecfdf5", "top");
      clear();
    } catch (err: any) {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    }
  };

  /* ---------------- Queries ---------------- */

  const panelsQuery = useUserUploads({
    type: panels.panel.key,
    used: false,
    page: panelPage,
    limit: ITEMS_PER_PAGE,
  });

  const cornersQuery = useUserUploads({
    type: panels.corner.key,
    used: false,
    page: cornerPage,
    limit: ITEMS_PER_PAGE,
    enabled: hasVisitedCornerTab || activeTab === "corner",
  });

  /* ---------------- Delete ---------------- */

  const deleteMutation = useDeleteMyUpload();

  const handleDelete = (id: string, type: IMAGE_TYPE) =>
    deleteMutation.mutate({ uploadId: id, type });

  /* ---------------- Extract Data ---------------- */

  const panelUploads = panelsQuery.data?.data || [];
  const panelPages = panelsQuery.data?.pagination?.pages || 1;

  const cornerUploads = cornersQuery.data?.data || [];
  const cornerPages = cornersQuery.data?.pagination?.pages || 1;

  return (
    <div className="mx-auto space-y-8">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="text-2xl font-semibold sm:text-3xl">Photo Lab™</h1>
        <p className="text-base font-light sm:text-lg">
          Upload and organize components for your Blueprint™ library.
        </p>
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* UPLOAD FORM */}
        <UploadForm
          maxFiles={
            MAX_UPLOAD_SIZE -
            (activeTab === "panel" ? panelUploads.length : cornerUploads.length)
          }
          isLoading={uploadMutation.isPending}
          onUpload={handleUpload}
        />

        {/* TABS */}
        <Tabs
          activeTab={activeTab}
          onChange={(key) => {
            const tab = key as IMAGE_TYPE;
            setActiveTab(tab);
            if (tab === "corner") setHasVisitedCornerTab(true);
          }}
          tabs={[
            {
              key: "panel",
              label: "Heirloom Panel™",
              content: (
                <UploadedImagesList
                  uploads={panelUploads}
                  isLoading={panelsQuery.isLoading}
                  isError={panelsQuery.isError}
                  page={panelPage}
                  pageCount={panelPages}
                  onPageChange={setPanelPage}
                  onDelete={handleDelete}
                  type={panels.panel.key}
                  isUserList
                />
              ),
            },
            {
              key: "corner",
              label: "Heirloom Stone™",
              content: (
                <UploadedImagesList
                  uploads={cornerUploads}
                  isLoading={cornersQuery.isLoading}
                  isError={cornersQuery.isError}
                  page={cornerPage}
                  pageCount={cornerPages}
                  onPageChange={setCornerPage}
                  onDelete={handleDelete}
                  type={panels.corner.key}
                  isUserList
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
