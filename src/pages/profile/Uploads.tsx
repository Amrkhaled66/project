import { useState } from "react";
import UploadForm from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";
import Tabs from "src/components/ui/Tabs";
import {
  useUploadMyImages,
  useGetAllUploads,
  useMyCorners,
  useDeleteMyUpload,
} from "src/hooks/queries/upload.queries";
import Toast from "src/components/ui/Toast";
import { MAX_UPLOAD_SIZE } from "src/utils/defaultSettings";

const ITEMS_PER_PAGE = 9;

type IMAGE_TYPE = "panel" | "corner";

export default function Uploads() {
  /* ---------------- Tabs ---------------- */
  const [activeTab, setActiveTab] = useState<IMAGE_TYPE>("panel");

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
  const panelsQuery = useGetAllUploads(panelPage, ITEMS_PER_PAGE);
  const cornersQuery = useMyCorners(cornerPage, ITEMS_PER_PAGE);

  /* ---------------- Delete ---------------- */
  const deleteMutation = useDeleteMyUpload();
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  /* ---------------- Extract Data ---------------- */
  const panelUploads = panelsQuery.data?.data || [];
  const panelPages = panelsQuery.data?.pagination?.pages || 1;

  const cornerUploads = cornersQuery.data?.data || [];
  const cornerPages = cornersQuery.data?.pagination?.pages || 1;

  return (
    <div className="mx-auto space-y-8">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="text-2xl font-semibold sm:text-3xl">Upload Photos</h1>
        <p className="text-base font-light sm:text-lg">
          Upload new photos and manage your previously uploaded ones.
        </p>
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* UPLOAD FORM */}
        <UploadForm
          maxFiles={
            MAX_UPLOAD_SIZE -
            (activeTab === "panel"
              ? panelUploads.length
              : cornerUploads.length)
          }
          isLoading={uploadMutation.isPending}
          onUpload={handleUpload}
        />

        {/* TABS */}
        <Tabs
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key as IMAGE_TYPE)}
          tabs={[
            {
              key: "panel",
              label: "Panels",
              content: (
                <UploadedImagesList
                  uploads={panelUploads}
                  isLoading={panelsQuery.isLoading}
                  isError={panelsQuery.isError}
                  page={panelPage}
                  pageCount={panelPages}
                  onPageChange={setPanelPage}
                  onDelete={handleDelete}
                  isUserList
                />
              ),
            },
            {
              key: "corner",
              label: "Corners",
              content: (
                <UploadedImagesList
                  uploads={cornerUploads}
                  isLoading={cornersQuery.isLoading}
                  isError={cornersQuery.isError}
                  page={cornerPage}
                  pageCount={cornerPages}
                  onPageChange={setCornerPage}
                  onDelete={handleDelete}
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
