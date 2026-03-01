import { useState, useMemo } from "react";
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

import Sizes from "src/components/Profile/Design/DesignWidget/Sizes";
import BlanketColor from "src/components/Profile/Design/DesignWidget/BlanketColor";
import BorderColor from "src/components/Profile/Design/DesignWidget/BorderColor";
import BackingColorSelector from "src/components/Profile/Design/DesignWidget/BackingColor";
import BindingColor from "src/components/Profile/Design/DesignWidget/BindingColor";
import BlockingColor from "src/components/Profile/Design/DesignWidget/BlockingColor";
import QualityPreserveColor from "src/components/Profile/Design/DesignWidget/QualityPreservedColor";
import Button from "src/components/ui/Button";
import GoastButton from "src/components/ui/GoastButton";

import Upgrades from "src/components/Profile/Design/DesignWidget/Upgrades";
import Text from "src/components/Profile/Design/DesignWidget/Text";
import CornersPool from "src/components/Profile/Design/DesignWidget/CornersPool";
import CustomPanelTab from "src/components/Profile/Design/DesignWidget/CustomPanel";

import { useDesign } from "src/context/desgin.context";
import { useCart } from "src/context/cart.context";
import { useDesign as useDesignQuery } from "src/hooks/queries/design.queries";
import Toast from "src/components/ui/Toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
type TabId =
  | "size"
  | "colors"
  | "elements"
  | "script"
  | "corners"
  | "customPanel";

interface Tab {
  id: TabId;
  label: string;
  component: React.ReactNode;
  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/* UI Components                                                              */
/* -------------------------------------------------------------------------- */
const TabButton = ({
  tab,
  isActive,
  onClick,
}: {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary" : "hover:text-primary text-neutral-600"
    }`}
  >
    {tab.label}
    {isActive && (
      <motion.div
        layoutId="activeTabUnderline"
        className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] rounded-full"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </button>
);

const ColorGrid = ({
  hasBinding,
  hasBlocking,
  isQualityPreserve,
}: {
  hasBinding: boolean;
  hasBlocking: boolean;
  isQualityPreserve: boolean;
}) => (
  <div className="grid gap-4">
    <BlanketColor />
    <BorderColor />
    {hasBinding && <BindingColor />}
    {hasBlocking && <BlockingColor />}
    {isQualityPreserve && <QualityPreserveColor />}
    <BackingColorSelector />
  </div>
);

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */
export default function BlanketDesigner() {
  const { id: designId } = useParams<{ id: string }>();

  const {
    designData,
    hasBinding,
    hasBlocking,
    hasEmbroidery,
    hasCornerstones,
    hasCustomPanel,
    hasQualityPreserve,
    handleDragEnd,
    isLoading,
    isError,
    hasChanged,
    price,
    flushSave,
    data,
  } = useDesign();

  const { addOrIncrease, isItemInCart } = useCart();

  const inCart = designId ? isItemInCart(designId) : false;

  const [activeTab, setActiveTab] = useState<TabId>("size");

  const selectedUpgrades = designData?.upgrades?.selected ?? [];

  /* ------------------------------------------------------------------------ */
  /* Tabs                                                                     */
  /* ------------------------------------------------------------------------ */

  const handleAddToCart = () => {
    addOrIncrease({
      designId: designId || " ",
      name: data?.name || "",
      previewImage: data?.previewImage ?? null,
      price: Number(data?.price) || 0,
    });

    Toast("Added to cart", "success", "#d1fae5", "top-end");
  };

  const tabs = useMemo<Tab[]>(
    () => [
      {
        id: "size",
        label: "Size",
        component: <Sizes />,
        isActive: true,
      },
      {
        id: "colors",
        label: "Colors",
        component: (
          <ColorGrid
            hasBinding={hasBinding}
            hasBlocking={hasBlocking}
            isQualityPreserve={hasQualityPreserve}
          />
        ),
        isActive: true,
      },
      {
        id: "elements",
        label: "elements",
        component: <Upgrades selectedUpgrades={selectedUpgrades} />,
        isActive: true,
      },
      {
        id: "script",
        label: "script",
        component: <Text />,
        isActive: hasEmbroidery,
      },
      {
        id: "corners",
        label: "Corners",
        component: <CornersPool />,
        isActive: hasCornerstones,
      },
      {
        id: "customPanel",
        label: "Custom Panel",
        component: <CustomPanelTab />,
        isActive: hasCustomPanel,
      },
    ],
    [
      hasBinding,
      hasBlocking,
      hasEmbroidery,
      hasQualityPreserve,
      hasCornerstones,
      hasCustomPanel,
      selectedUpgrades,
    ],
  );

  console.log(designData);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeTabs = tabs.filter((t) => t.isActive);
  const activeTabContent = tabs.find((t) => t.id === activeTab)?.component;

  if (isError) {
    return <Navigate replace to="/profile/design-library" />;
  }

  const handleUpdate = () => {
    flushSave();
  };
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
          <header className="page-header flex items-center justify-between font-bold">
            <p>
              Total: <span>{priceFormmater(Number(price))}</span>
            </p>
            <div className="flex gap-4">
              {/* <Button disabled={!hasChanged} onClick={handleUpdate}>
                Save Your Updates
              </Button> */}

              <Button
                disabled={inCart}
                className="px-3"
                onClick={() => handleAddToCart()}
              >
                {inCart ? "Added To Cart" : "Add To Cart"}
              </Button>

              {/* <GoastButton
                className="px-3"
                onClick={() => handleAddToCart(designData)}
              >
                Add To Cart
              </GoastButton> */}
            </div>
          </header>
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
          <aside className="sticky top-2 flex h-fit w-full flex-col space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:w-[40%]">
            <nav className="relative flex w-full flex-wrap gap-1 border-b border-neutral-200 pb-2">
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
    </DndContext>
  );
}
