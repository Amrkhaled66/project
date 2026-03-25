import Model from "src/components/ui/Model";

type LeavePageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStay: () => void;
  onLeave: () => void;
  isLeaving?: boolean;
};

const LeavePageModal = ({
  isOpen,
  onClose,
  onStay,
  onLeave,
  isLeaving = false,
}: LeavePageModalProps) => {
  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Unsaved changes
        </h2>

        <p className="mb-6 text-sm leading-6 text-gray-600">
          You have unsaved changes. Are you sure you want to leave this page?
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onStay}
            disabled={isLeaving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Stay
          </button>

          <button
            type="button"
            onClick={onLeave}
            disabled={isLeaving}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLeaving ? "Leaving..." : "Leave"}
          </button>
        </div>
      </div>
    </Model>
  );
};

export default LeavePageModal;