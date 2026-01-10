import Button from "src/components/ui/Button";

type Props = {
  file: File | null;
  isUploading: boolean;
  onUpload: () => void;
};

export default function UploadMergedPanel({
  file,
  isUploading,
  onUpload,
}: Props) {
  if (!file) return null;

  return (
    <div>
      <Button
        onClick={onUpload}
        isLoading={isUploading}
        className="w-full justify-center"
      >
        Save as New Custom Panel
      </Button>
    </div>
  );
}
