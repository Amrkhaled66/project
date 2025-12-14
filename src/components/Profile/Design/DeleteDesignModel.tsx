import React from "react";
import Model from "src/components/ui/Model";

interface DeleteDesignModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDesignModel: React.FC<DeleteDesignModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Delete Design?</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this design? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Model>
  );
};

export default DeleteDesignModel;
