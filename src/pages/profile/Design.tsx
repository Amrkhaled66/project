import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainDashButton from "src/components/ui/MainDashButton";
import DesginArea from "src/components/Profile/Design/DesignArea";
import { useCart } from "src/context/cart.context";
import priceFormmater from "src/utils/priceFormmater";
import { Link } from "react-router-dom";
import { upgrades } from "src/data/upgrades";
import { useDesign } from "src/context/desgin.context";

import BorderColor from "src/components/Profile/Design/DesignWidget/BorderColor";
import BlanketColor from "src/components/Profile/Design/DesignWidget/BlanketColor";
import Upgrades from "src/components/Profile/Design/DesignWidget/Upgrades";
import Preview from "src/components/Profile/Design/DesignWidget/Preview";
import Sizes from "src/components/Profile/Design/DesignWidget/Sizes";
import BackingColorSelector from "src/components/Profile/Design/DesignWidget/BackingColor";
import BindingColor from "src/components/Profile/Design/DesignWidget/BindingColor";
export default function BlanketDesigner() {
  const { cartItem, getCartTotal, updateUpgrades, hasBinding } = useCart();
  const total = getCartTotal();
  const selectedUpgrades = cartItem?.upgrades?.map((u) => u.id) ?? [];
  const { setIsAddPhotoModelOpen } = useDesign();

  const [activeTab, setActiveTab] = useState<
    "size" | "colors" | "upgrades" | "preview"
  >("size");

  const onToggleUpgrade = (id: string) => {
    let newIds = [...selectedUpgrades];
    const isSelected = newIds.includes(id);

    if (isSelected) {
      // Deselect the current upgrade
      newIds = newIds.filter((u) => u !== id);

      // If quiltedPreserve is removed, also remove binding
      if (id === "quiltedPreserve") {
        newIds = newIds.filter((u) => u !== "binding");
      }
    } else {
      // Selecting a new upgrade
      newIds.push(id);

      // Automatically add binding with quiltedPreserve
      if (id === "quiltedPreserve" && !newIds.includes("binding")) {
        newIds.push("binding");
      }

      if (id === "cornerstonesDouble") {
        newIds = newIds.filter((u) => u !== "cornerstonesSingle");
      }
      if (id === "cornerstonesSingle") {
        newIds = newIds.filter((u) => u !== "cornerstonesDouble");
      }
    }

    if (
      (id === "cornerstonesSingle" || id === "cornerstonesDouble") &&
      !cartItem.cornerImage
    ) {
      setIsAddPhotoModelOpen(true);
    }

    const newUpgrades = upgrades.filter((u) => newIds.includes(u.id));
    updateUpgrades(newUpgrades);
  };

  const tabs = [
    { id: "size", label: "Size", component: <Sizes /> },
    {
      id: "colors",
      label: "Colors",
      component: (
        <div className="space-y-4">
          <BlanketColor />
          <BorderColor />
          {hasBinding && <BindingColor />}
          <BackingColorSelector />
        </div>
      ),
    },
    {
      id: "upgrades",
      label: "Upgrades",
      component: (
        <Upgrades
          selectedUpgrades={selectedUpgrades}
          onToggleUpgrade={onToggleUpgrade}
        />
      ),
    },
    { id: "preview", label: "Preview", component: <Preview /> }, // 👈 new tab
  ];

  return (
    <div className="mx-auto min-h-dvh space-y-4">
      {/* Header */}
      <div className="page-header flex items-center justify-between font-bold">
        <p>
          Total: <span>{priceFormmater(total)}</span>
        </p>
        <Link to={"/profile/cart"}>
          <MainDashButton className="!w-fit px-4" text="Check Out" />
        </Link>
      </div>

      <div className="flex flex-col gap-x-6 gap-y-4 lg:flex-row">
        {/* Left: Design Preview */}
        <DesginArea />

        {/* Right: Tabbed Controls */}
        <div className="sticky top-2 flex h-fit w-full flex-col space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:w-[40%]">
          {/* Tabs Header */}
          <div className="relative flex w-full gap-2 border-b border-neutral-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "hover:text-primary text-neutral-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

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
                {tabs.find((tab) => tab.id === activeTab)?.component}
              </motion.div>
            </AnimatePresence>
          </div>

          <MainDashButton text="Order Now" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
