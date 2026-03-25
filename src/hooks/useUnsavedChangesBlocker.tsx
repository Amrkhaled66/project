import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";
import { useDesign } from "src/context/desgin.context";
type UseUnsavedChangesBlockerOptions = {
  onConfirmLeave?: () => void | Promise<void>;
};

const useUnsavedChangesBlocker = ({
  onConfirmLeave,
}: UseUnsavedChangesBlockerOptions) => {
  const { hasChanged } = useDesign();
  console.log(hasChanged)
  const blocker = useBlocker(hasChanged);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setIsModalOpen(true);
    }
  }, [blocker.state]);

  const handleStay = () => {
    setIsModalOpen(false);
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  };

  const handleLeave = async () => {
    try {
      setIsLeaving(true);

      if (onConfirmLeave) {
        await onConfirmLeave();
      }

      setIsModalOpen(false);

      if (blocker.state === "blocked") {
        blocker.proceed();
      }
    } catch (error) {
      console.error("Failed before leaving route:", error);
      setIsModalOpen(true);

      if (blocker.state === "blocked") {
        blocker.reset();
      }
    } finally {
      setIsLeaving(false);
    }
  };

  const closeModal = () => {
    handleStay();
  };

  return {
    isModalOpen,
    isLeaving,
    handleStay,
    handleLeave,
    closeModal,
  };
};

export default useUnsavedChangesBlocker;
