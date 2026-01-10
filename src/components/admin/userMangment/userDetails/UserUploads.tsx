import { useState } from "react";
import { useParams } from "react-router-dom";
import { Upload, Image as ImageIcon } from "lucide-react";

import UploadForm from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";

import {
  useAdminUploadImages,
  useAdminUploads,
  useAdminDeleteUpload,
} from "src/hooks/queries/admin/uploads.queries";

import Toast from "src/components/ui/Toast";

const ITEMS_PER_PAGE = 9;

const TABS = [
  { key: "upload", label: "Upload New", icon: Upload },
  { key: "library", label: "User Uploads", icon: ImageIcon },
];

const UserUploads = () => {
  const { id : userId } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<"upload" | "library">("upload");

  const [page, setPage] = useState(1);

  /* ------------------------------------------------------------------ */
  /* Upload logic (ADMIN)                                                */
  /* ------------------------------------------------------------------ */
  const uploadMutation = useAdminUploadImages(userId!);

  const handleUpload = async (files: File[], clear: () => void) => {
    try {
      await uploadMutation.mutateAsync(files);
      Toast("Uploaded Successfully!", "success", "#ecfdf5", "top");
      clear();

      // switch to uploads tab after success
      setActiveTab("library");
    } catch (err: any) {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    }
  };

  /* ------------------------------------------------------------------ */
  /* Fetch user uploads (ADMIN)                                          */
  /* ------------------------------------------------------------------ */
  const { data, isLoading, isError } = useAdminUploads(
    page,
    ITEMS_PER_PAGE,
    userId!,
  );

  console.log(data);
  const deleteMutation = useAdminDeleteUpload(userId!);

  const uploads = data?.data || [];
  const pageCount = data?.pagination?.pages || 1;

  const handleDelete = (uploadId: string) => {
    deleteMutation.mutate(uploadId);
  };

  return (
    <div className="space-y-6">
      {/* ================= Tabs Header ================= */}
      <div
        className="rounded-xl border bg-white"
        style={{ borderColor: "#f3f4f6" }}
      >
        <div className="flex gap-1 p-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
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

      {/* ================= Tab Content ================= */}
      <div>
        {activeTab === "upload" && (
          <UploadForm
            isLoading={uploadMutation.isPending}
            onUpload={handleUpload}
          />
        )}

        {activeTab === "library" && (
          <UploadedImagesList
            uploads={uploads}
            isLoading={isLoading}
            isError={isError}
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default UserUploads;
