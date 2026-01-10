import { useState } from "react";
import Model from "src/components/ui/Model";

type ConfirmDialogProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

export default function ConfirmDialog({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  children,
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <span
        onClick={() => setIsOpen(true)}
        className="inline-block cursor-pointer"
      >
        {children}
      </span>

      {/* Modal */}
      <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="rounded-lg bg-white p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-gray-600">
              {description}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              {cancelText}
            </button>

            <button
              onClick={handleConfirm}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </Model>
    </>
  );
}
