import React, { useEffect, useState } from "react";
import Model from "src/components/ui/Model";

interface DeleteDesignModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (note: string) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  isSubmitting?: boolean;
}

const DeleteDesignModel: React.FC<DeleteDesignModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Design?",
  description = "Are you sure you want to delete this design?",
  confirmLabel = "Delete",
  isSubmitting = false,
}) => {
  const [note, setNote] = useState("");
  debugger;
  useEffect(() => {
    if (!isOpen) {
      setNote("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmedNote = note.trim();
    if (!trimmedNote || isSubmitting) return;
    onConfirm(trimmedNote);
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="text-sm text-gray-600">{description}</p>

        <div className="space-y-2">
          <label
            htmlFor="delete-design-note"
            className="block text-sm font-medium text-gray-700"
          >
            Delete note
          </label>
          <textarea
            id="delete-design-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write why this design is being deleted"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          />
          <p className="text-xs text-gray-500">
            This note will be saved with the soft-deleted design.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!note.trim() || isSubmitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </Model>
  );
};

export default DeleteDesignModel;
