import { useState } from "react";
import Model from "src/components/ui/Model";
import Button from "src/components/ui/Button";
import FormInput from "src/components/ui/FormInput";

export default function AddDesignModal({
  isOpen,
  onClose,
  onCreate,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  isLoading?: boolean;
}) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Design
        </h2>

        <FormInput
          label="Design Title"
          name="designName"
          placeholder="Enter design name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            className="px-4 py-2"
          >
            Create
          </Button>
        </div>
      </div>
    </Model>
  );
}
