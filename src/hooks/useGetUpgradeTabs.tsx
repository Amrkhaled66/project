import { useMemo, type ComponentType } from "react";

import CornersPool from "src/components/Profile/Design/DesignWidget/CornersPool";
import CustomPanelTab from "src/components/Profile/Design/DesignWidget/CustomPanel";
import Sizes from "src/components/Profile/Design/DesignWidget/Sizes";
import Text from "src/components/Profile/Design/DesignWidget/Text";
import Upgrades from "src/components/Profile/Design/DesignWidget/Upgrades";
import ColorGrid from "src/components/Profile/Design/upgrades/ColorGrid";
import type { TabId } from "src/components/Profile/Design/upgrades/TabButton";
import { useDesignDerived, useDesignEditorState } from "src/context/desgin.context";

type TabComponentProps = {
  selectedUpgrades?: string[];
};

export type UpgradeTabConfig = {
  id: TabId;
  label: string;
  Component: ComponentType<TabComponentProps>;
  componentProps?: TabComponentProps;
  isActive: boolean;
};

const TAB_REGISTRY: Record<
  TabId,
  { label: string; Component: ComponentType<TabComponentProps> }
> = {
  size: {
    label: "Size",
    Component: Sizes,
  },
  materials: {
    label: "Colors",
    Component: ColorGrid,
  },
  elements: {
    label: "Elements",
    Component: Upgrades,
  },
  script: {
    label: "Heirloom Script™",
    Component: Text,
  },
  corners: {
    label: "Corners",
    Component: CornersPool,
  },
  customPanel: {
    label: "Custom Panels™",
    Component: CustomPanelTab,
  },
};

const useGetUpgradeTabs = (): UpgradeTabConfig[] => {
  const { designData } = useDesignEditorState();
  const { hasEmbroidery, hasCornerstones } = useDesignDerived();
  const selectedUpgrades = designData.upgrades.selected;

  return useMemo(
    () => [
      {
        id: "size" as const,
        ...TAB_REGISTRY.size,
        isActive: true,
      },
      {
        id: "materials" as const,
        ...TAB_REGISTRY.materials,
        isActive: true,
      },
      {
        id: "elements" as const,
        ...TAB_REGISTRY.elements,
        componentProps: { selectedUpgrades },
        isActive: true,
      },
      {
        id: "script" as const,
        ...TAB_REGISTRY.script,
        isActive: hasEmbroidery,
      },
      {
        id: "corners" as const,
        ...TAB_REGISTRY.corners,
        isActive: hasCornerstones,
      },
      {
        id: "customPanel" as const,
        ...TAB_REGISTRY.customPanel,
        isActive: true,
      },
    ],
    [hasCornerstones, hasEmbroidery, selectedUpgrades],
  );
};

export default useGetUpgradeTabs;
