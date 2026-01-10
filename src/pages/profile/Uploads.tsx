import { useState } from "react";
import UploadForm from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";
import {
  useUploadMyImages,
  useMyUploads,
  useDeleteMyUpload,
} from "src/hooks/queries/upload.queries";
import Toast from "src/components/ui/Toast";

const ITEMS_PER_PAGE = 9;
import {MAX_UPLOAD_SIZE} from "src/utils/defaultSettings";
export default function Uploads() {
  const [page, setPage] = useState(1);

  /* ---------------- Upload ---------------- */
  const uploadMutation = useUploadMyImages();

  const handleUpload = async (files: File[], clear: () => void) => {
    try {
      await uploadMutation.mutateAsync({ files, type: "panael" });
      Toast("Uploaded Successfully!", "success", "#ecfdf5", "top");
      clear();
    } catch (err: any) {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    }
  };

  /* ---------------- Fetch uploads ---------------- */
  const { data, isLoading, isError } = useMyUploads(page, ITEMS_PER_PAGE);

  const deleteMutation = useDeleteMyUpload();

  const uploads = data?.data || [];
  const pageCount = data?.pagination?.pages || 1;

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

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
        <UploadForm
          maxFiles={MAX_UPLOAD_SIZE - data?.data.length}
          isLoading={uploadMutation.isPending}
          onUpload={handleUpload}
        />

        <UploadedImagesList
          uploads={uploads}
          isLoading={isLoading}
          isError={isError}
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          onDelete={handleDelete}
          isUserList
        />
      </div>
    </div>
  );
}
