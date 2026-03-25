import { useMemo } from "react";
import CornersPool from "src/components/Profile/Design/DesignWidget/CornersPool";
import CustomPanelTab from "src/components/Profile/Design/DesignWidget/CustomPanel";
import Sizes from "src/components/Profile/Design/DesignWidget/Sizes";
import Text from "src/components/Profile/Design/DesignWidget/Text";
import Upgrades from "src/components/Profile/Design/DesignWidget/Upgrades";
import ColorGrid from "src/components/Profile/Design/upgrades/ColorGrid";
import type { Tab } from "src/components/Profile/Design/upgrades/TabButton";
import { useDesign } from "src/context/desgin.context";

const useGetUpgradeTabs = (): Tab[] => {
  const { designData, hasEmbroidery, hasCornerstones } = useDesign();
  const selectedUpgrades = designData?.upgrades?.selected ?? [];

  return useMemo(
    () => [
      {
        id: "size",
        label: "Size",
        component: <Sizes />,
        isActive: true,
      },
      {
        id: "materials",
        label: "Materials",
        component: <ColorGrid />,
        isActive: true,
      },
      {
        id: "elements",
        label: "Elements",
        component: <Upgrades selectedUpgrades={selectedUpgrades} />,
        isActive: true,
      },
      {
        id: "script",
        label: "Heirloom Script™",
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
        label: "Custom Panels™",
        component: <CustomPanelTab />,
        isActive: true,
      },
    ],
    [hasCornerstones, hasEmbroidery, selectedUpgrades],
  );
};

export default useGetUpgradeTabs;
