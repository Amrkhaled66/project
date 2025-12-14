import Uploadform from "src/components/Profile/Uploads/UploadForm";
import UploadedImagesList from "src/components/Profile/Uploads/UploadedImagesList";

export default function Uploads() {
  return (
    <div className="mx-auto space-y-8">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="text-2xl font-semibold sm:text-3xl">Upload Photos</h1>
        <p className="text-base font-light sm:text-lg">
          Upload new photos and manage your previously uploaded ones.
        </p>
      </div>

      {/* TWO COLUMNS — 50/50 */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="w-full">
          <Uploadform />
        </div>
        <div className="w-full space-y-3">
          <UploadedImagesList />
        </div>
      </div>
    </div>
  );
}
