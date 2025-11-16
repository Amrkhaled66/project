import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Link } from "react-router-dom";

import MainDashButton from "src/components/ui/MainDashButton";
import DesginArea from "src/components/Profile/Design/DesignArea";
import { useCart } from "src/context/cart.context";
import { useDesign } from "src/context/desgin.context";
import priceFormmater from "src/utils/priceFormmater";

// Widget Components
import BorderColor from "src/components/Profile/Design/DesignWidget/BorderColor";
import BlanketColor from "src/components/Profile/Design/DesignWidget/BlanketColor";
import Upgrades from "src/components/Profile/Design/DesignWidget/Upgrades";
import Preview from "src/components/Profile/Design/DesignWidget/Preview";
import Sizes from "src/components/Profile/Design/DesignWidget/Sizes";
import BackingColorSelector from "src/components/Profile/Design/DesignWidget/BackingColor";
import BindingColor from "src/components/Profile/Design/DesignWidget/BindingColor";
import BlockingColor from "src/components/Profile/Design/DesignWidget/BlockingColor";
import Text from "src/components/Profile/Design/DesignWidget/Text";
import QualityPreserveColor from "src/components/Profile/Design/DesignWidget/QualityPreservedColor";
import CornersPool from "src/components/Profile/Design/DesignWidget/CornersPool";

type TabId = "size" | "colors" | "upgrades" | "preview" | "text" | "corners";

interface Tab {
  id: TabId;
  label: string;
  component: React.ReactNode;
  isActive: boolean;
}

// Separate component for cleaner tab rendering
const TabButton = ({ 
  tab, 
  isActive, 
  onClick 
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
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    )}
  </button>
);

// Separate component for the color grid
const ColorGrid = ({
  hasBinding,
  hasBlocking,
  isQualityPreserve,
}: {
  hasBinding: boolean;
  hasBlocking: boolean;
  isQualityPreserve: boolean;
}) => (
  <div className="grid  gap-4">
    <BlanketColor />
    <BorderColor />
    {hasBinding && <BindingColor />}
    {hasBlocking && <BlockingColor />}
    {isQualityPreserve && <QualityPreserveColor />}
    <BackingColorSelector />
  </div>
);

export default function BlanketDesigner() {
  const {
    cartItem,
    getCartTotal,
    hasBinding,
    hasBlocking,
    hasEmbroidery,
    isQualityPreserve,
    isCornerstones
  } = useCart();
  
  const { handleDragEnd } = useDesign();
  const [activeTab, setActiveTab] = useState<TabId>("size");

  const total = getCartTotal();
  const selectedUpgrades = cartItem?.upgrades?.map((u) => u.id) ?? [];

  const tabs = useMemo<Tab[]>(
    () => [
      { 
        id: "size", 
        label: "Size", 
        component: <Sizes />, 
        isActive: true 
      },
      {
        id: "colors",
        label: "Colors",
        component: (
          <ColorGrid
            hasBinding={hasBinding}
            hasBlocking={hasBlocking}
            isQualityPreserve={isQualityPreserve}
          />
        ),
        isActive: true,
      },
      {
        id: "upgrades",
        label: "Upgrades",
        component: <Upgrades selectedUpgrades={selectedUpgrades} />,
        isActive: true,
      },
      { 
        id: "preview", 
        label: "Preview", 
        component: <Preview />, 
        isActive: true 
      },
      {
        id: "text",
        label: "Text",
        component: <Text />,
        isActive: hasEmbroidery,
      },
      {
        id: "corners",
        label: "Corners",
        component: <CornersPool />,
        isActive: isCornerstones,
      },
    ],
    [hasBinding, hasBlocking, hasEmbroidery, isQualityPreserve, selectedUpgrades]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeTabs = tabs.filter((tab) => tab.isActive);
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto min-h-dvh space-y-4">
        {/* Header */}
        <header className="page-header flex items-center justify-between font-bold">
          <p>
            Total: <span>{priceFormmater(total)}</span>
          </p>
          <Link to="/profile/cart">
            <MainDashButton className="!w-fit px-4" text="Check Out" />
          </Link>
        </header>

        <div className="flex flex-col gap-x-6 gap-y-4 lg:flex-row">
          {/* Left: Design Preview */}
          <DesginArea />

          {/* Right: Tabbed Controls */}
          <aside className="sticky top-2 flex h-fit w-full flex-col space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:w-[40%]">
            {/* Tabs Header */}
            <nav className="relative flex w-full flex-wrap gap-1 border-b border-neutral-200">
              {activeTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>

            {/* Tabs Content */}
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
          </aside>
        </div>
      </div>
    </DndContext>
  );
}