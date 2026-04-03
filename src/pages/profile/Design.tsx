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
import priceFormmater from "src/utils/priceFormmater";

import Button from "src/components/ui/Button";
import TabButton, {
  TabId,
} from "src/components/Profile/Design/upgrades/TabButton";

import { useDesign } from "src/context/desgin.context";
import { useCart } from "src/context/cart.context";
import LeavePageModal from "src/components/Profile/Design/Canvas/LeavePageModal";
import Skeleton from "react-loading-skeleton";
import useGetUpgradeTabs from "src/hooks/useGetUpgradeTabs";
import useUnsavedChangesBlocker from "src/hooks/useUnsavedChangesBlocker";
import PageHeader from "src/components/ui/PageHeader";
import "react-loading-skeleton/dist/skeleton.css";
import MainDashButton from "src/components/ui/MainDashButton";

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */
export default function BlanketDesigner() {
  const { id: designId } = useParams<{ id: string }>();
  const tabs = useGetUpgradeTabs();

  const {
    designData,
    handleDragEnd,
    isLoading,
    isError,
    hasChanged,
    price,
    data,
  } = useDesign();

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
  const activeTabContent = tabs.find((t) => t.id === activeTab)?.component;

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
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto min-h-dvh space-y-4">
        {/* Header */}
        {isLoading ? (
          <header className="page-header flex items-center justify-between">
            <Skeleton width={120} height={24} />
            <Skeleton width={100} height={36} />
          </header>
        ) : (
          <div className="items-ce flex justify-between">
            <PageHeader
              title="Blueprint Review™"
              subtitle="Finalize your artisanal configuration before build commencement."
            />
            <div className="flex h-fit gap-x-12 px-8 items-center rounded-3xl bg-white  py-3 drop-shadow-sm">
              <div className="flex flex-row">
                <span className="text-subTitle tracking-wider uppercase">
                  Total:
                </span>

                <span className="font-bold">{priceFormmater(Number(price))}</span>
              </div>
              <MainDashButton
                disabled={inCart}
                text={inCart ? "Added" : "Commission Build"}
                className="!h-fit !rounded-full px-3"
                onClick={() =>
                  addOrIncrease({
                    designId: designId || " ",
                    name: data?.name || "",
                    previewImage: data?.previewImage ?? null,
                    price: Number(data?.price) || 0,
                    sizeId: designData?.canvas.size || " ",
                  })
                }
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-x-6 gap-y-4 lg:flex-row">
          {/* Canvas */}
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
              {/* <div className="max-w-[75%] space-y-1">
                <h2 className="text-xl font-medium">Build Configuration</h2>

                <h3 className="text-sm text-neutral-500">
                  Configure your Premium Build™ Blueprint
                </h3>
              </div> */}
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
                    {activeTabContent}
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
