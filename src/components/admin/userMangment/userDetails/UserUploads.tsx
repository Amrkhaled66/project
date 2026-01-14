import { useState } from "react";
import { useParams } from "react-router-dom";
import { Upload, Image as ImageIcon } from "lucide-react";

import UploadForm from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";
import Tabs from "src/components/ui/Tabs";

import {
  useAdminUploadImages,
  useAdminUploads,
  useAdminCorners,
  useAdminDeleteUpload,
} from "src/hooks/queries/admin/uploads.queries";

import Toast from "src/components/ui/Toast";

const ITEMS_PER_PAGE = 9;

type IMAGE_TYPE = "panel" | "corner";
type MAIN_TAB = "upload" | "library";

const UserUploads = () => {
  const { id: userId } = useParams<{ id: string }>();

  /* ---------------- Main Tabs ---------------- */
  const [activeTab, setActiveTab] = useState<MAIN_TAB>("upload");

  /* ---------------- Inner Tabs ---------------- */
  const [activeType, setActiveType] = useState<IMAGE_TYPE>("panel");

  /* ---------------- Pagination ---------------- */
  const [panelPage, setPanelPage] = useState(1);
  const [cornerPage, setCornerPage] = useState(1);

  /* ---------------- Upload (ADMIN) ---------------- */
  const uploadMutation = useAdminUploadImages(userId!);

  const handleUpload = async (
    files: File[],
    type: IMAGE_TYPE,
    clear: () => void,
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
  const panelsQuery = useAdminUploads(panelPage, ITEMS_PER_PAGE, userId!);

  const cornersQuery = useAdminCorners(cornerPage, ITEMS_PER_PAGE, userId!);

  /* ---------------- Delete ---------------- */
  const deleteMutation = useAdminDeleteUpload(userId!);
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  return (
    <div className="space-y-6">
      {/* ================= MAIN TABS ================= */}
      <div
        className="rounded-xl border bg-white"
        style={{ borderColor: "#f3f4f6" }}
      >
        <div className="flex gap-1 p-1">
          {[
            { key: "upload", label: "Upload New", icon: Upload },
            { key: "library", label: "User Uploads", icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as MAIN_TAB)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activeTab === "upload" && (
        <UploadForm
          isLoading={uploadMutation.isPending}
          onUpload={handleUpload}
        />
      )}

      {activeTab === "library" && (
        <Tabs
          activeTab={activeType}
          onChange={(key) => setActiveType(key as IMAGE_TYPE)}
          tabs={[
            {
              key: "panel",
              label: "Panels",
              content: (
                <UploadedImagesList
                  uploads={panelsQuery.data?.data || []}
                  isLoading={panelsQuery.isLoading}
                  isError={panelsQuery.isError}
                  page={panelPage}
                  pageCount={panelsQuery.data?.pagination?.pages || 1}
                  onPageChange={setPanelPage}
                  onDelete={handleDelete}
                />
              ),
            },
            {
              key: "corner",
              label: "Corners",
              content: (
                <UploadedImagesList
                  uploads={cornersQuery.data?.data || []}
                  isLoading={cornersQuery.isLoading}
                  isError={cornersQuery.isError}
                  page={cornerPage}
                  pageCount={cornersQuery.data?.pagination?.pages || 1}
                  onPageChange={setCornerPage}
                  onDelete={handleDelete}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default UserUploads;
