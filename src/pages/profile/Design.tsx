import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Navigate, useParams } from "react-router-dom";

import DesginArea from "src/components/Profile/Design/DesignArea";

import TabButton, {
  TabId,
} from "src/components/Profile/Design/upgrades/TabButton";

import {
  useDesignDerived,
  useDesignEditorActions,
  useDesignEditorState,
} from "src/context/desgin.context";
import { useCart } from "src/context/cart.context";
import LeavePageModal from "src/components/Profile/Design/Canvas/LeavePageModal";
import Skeleton from "react-loading-skeleton";
import useGetUpgradeTabs from "src/hooks/useGetUpgradeTabs";
import useUnsavedChangesBlocker from "src/hooks/useUnsavedChangesBlocker";
import PageHeader from "src/components/ui/PageHeader";
import DesignViewer from "src/components/Profile/Design/Viewer";
import "react-loading-skeleton/dist/skeleton.css";

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */
export default function BlanketDesigner() {
  const { id: designId } = useParams<{ id: string }>();
  const tabs = useGetUpgradeTabs();

  const { designData, designRecord, isLoading, isError } =
    useDesignEditorState();
  const { handleDragStart, handleDragEnd } = useDesignEditorActions();
  const { hasChanged, price } = useDesignDerived();

  const { addOrIncrease, isItemInCart, updateItemPrice } = useCart();
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);

  const inCart = designId ? isItemInCart(designId) : false;

  useEffect(() => {
    if (inCart) {
      updateItemPrice(designId || " ", Number(price));
    }
  }, [hasChanged]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const { isModalOpen, isLeaving, handleStay, handleLeave, closeModal } =
    useUnsavedChangesBlocker({});

  const activeTabs = tabs.filter((t) => t.isActive);
  const activeTabConfig = tabs.find((t) => t.id === activeTab);
  const ActiveTabComponent = activeTabConfig?.Component;

  useEffect(() => {
    if (
      !activeTabs.some((tab) => tab.id === activeTab) &&
      activeTabs.length > 0
    ) {
      setActiveTab(activeTabs[0].id);
    }
  }, [activeTab, activeTabs]);

  if (isError) {
    return <Navigate replace to="/profile/design-library" />;
  }
  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto min-h-dvh space-y-4">
        {isLoading ? (
          <header className="page-header flex items-center justify-between">
            <Skeleton width={120} height={24} />
            <Skeleton width={100} height={36} />
          </header>
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <PageHeader
              title="Blueprint Review™"
              subtitle="Finalize your artisanal configuration before build commencement."
            />
          </div>
        )}

        {!isLoading && (
          <DesignViewer
            selectedUpgrades={designData.upgrades.selected}
            price={Number(price)}
            inCart={inCart}
                onAddToCart={() =>
                  addOrIncrease({
                    designId: designId || " ",
                    name: designRecord?.name || "",
                    previewImage: designRecord?.previewImage ?? null,
                    price: Number(designRecord?.price) || 0,
                    sizeId: designData?.canvas.size || " ",
                  })
                }
          />
        )}

        <div className="flex flex-col gap-x-6 gap-y-4 lg:flex-row">
          <div className="flex-1">
            {isLoading ? (
              <div className="w-full space-y-3">
                <Skeleton height={45} width="60%" borderRadius={8} />
                <Skeleton height={380} borderRadius={12} />
                <Skeleton height={25} width="40%" />
              </div>
            ) : (
              <DesginArea />
            )}
          </div>

          {/* Sidebar */}
          <aside className="sticky top-2 flex h-fit w-full flex-col space-y-4 rounded-3xl bg-white p-4 shadow-sm lg:w-[40%]">
            <div className="flex h-fit items-start justify-between">
            </div>
            <nav className="relative grid grid-cols-4 border-b border-neutral-200 px-5 pb-2">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <Skeleton key={i} width={80} height={28} borderRadius={6} />
                  ))
                : activeTabs.map((tab) => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      isActive={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  ))}
            </nav>

            {isLoading ? (
              <div className="mt-4 space-y-4">
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={220} />
              </div>
            ) : (
              <div className="py-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {ActiveTabComponent ? (
                      <ActiveTabComponent {...activeTabConfig?.componentProps} />
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </aside>
        </div>
      </div>

      <LeavePageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onStay={handleStay}
        onLeave={handleLeave}
        isLeaving={isLeaving}
      />
    </DndContext>
  );
}
