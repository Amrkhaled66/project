// addonsData.ts
import CustomPanelsImg from "src/assets/addOns/customePanels.webp";
import CornerstonesImg from "src/assets/addOns/corner.webp";
import QuiltedPreserveImg from "src/assets/addOns/quality.webp";
import BlockingImg from "src/assets/addOns/blocking.webp";
import BindingImg from "src/assets/addOns/binding.webp";
import EmbroideryImg from "src/assets/addOns/embroidery.webp";
import { BLANKET_SIZE_IDS, BlanketSizeId } from "src/data/blanketSizes";

// upgradeIds.ts
export const UPGRADE_IDS = {
  HEIRLOOM_SCRIPT: "heirloomScript",
  HEIRLOOM_BLOCK: "heirloomBlock",
  HEIRLOOM_CORNER_SINGLE: "heirloomCornerSingle",
  HEIRLOOM_CORNER_DOUBLE: "heirloomCornerDouble",
  HEIRLOOM_PANEL: "heirloomPanel",
  HEIRLOOM_PRESERVE: "heirloomPreserve",
  HEIRLOOM_SEAL: "heirloomSeal",
  HEIRLOOM_EDGE: "heirloomEdge",
} as const;

export type UpgradeId = (typeof UPGRADE_IDS)[keyof typeof UPGRADE_IDS];

export type UpgradeOption = {
  id: UpgradeId;
  name: string;
  description: string;
  autoAppliedBy?: UpgradeId;
  img?: string;
  brief?: string;
};

export const upgrades: UpgradeOption[] = [
  {
    id: UPGRADE_IDS.HEIRLOOM_PANEL,
    name: "Heirloom Panel",
    description: "Integrate unique fabric panels into the design.",
    img: CustomPanelsImg,
    brief:
      "Custom panels can be made at your request to fill what would be a blank. .",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_PRESERVE,
    name: "Heirloom Preserve",
    description: "Enhanced durability and texture.",
    img: QuiltedPreserveImg,
    brief:
      "Each blanket boasts a meticulous quilting process, incorporating up to 100,000 stitches to guarantee unparalleled longevity and enduring quality.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_EDGE,
    name: "Heirloom Edge",
    description:
      "Protective stitched edge wrapping the full blanket; auto-enabled with Heirloom Preserve.",
    autoAppliedBy: UPGRADE_IDS.HEIRLOOM_PRESERVE,
    img: BindingImg,
    brief:
      "Individually tailored binding surrounds the entirety of each blanket, ensuring enduring security and timeless quality.",
  },

  {
    id: UPGRADE_IDS.HEIRLOOM_SEAL,
    name: "Heirloom Seal",
    description: "Add a decorative seal to the border.",
    img: BindingImg,
    brief:
      "A decorative fringe border adds a classic, textured finish around the edge of your blanket.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_BLOCK,
    name: "Heirloom Block",
    description: "Adds structural support and pattern definition.",
    img: BlockingImg,
    brief:
      "Tailored blockingchoices for each intersection, seamlessly blending the sashing together with extra jersey materials adding a diverse array of colors for a personalized touch, all coming straight from your jerseys.",
  },
   {
    id: UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
    name: "Heirloom Stone (Single)",
    description: "Add decorative patches to the 4 corners of the blanket.",
    img: CornerstonesImg,
    brief:
      "Tailored corner stoning choices for each blanket, seamlessly blending sashing together with extra jersey materials and a diverse array of colors for a personalized touch.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
    name: "Heirloom Stone (Double)",
    description:
      "Add decorative patches to all 8 positions - 4 corners and 4 midpoints on each side.",
    img: CornerstonesImg,
    brief:
      "Tailored corner stoning choices for each blanket, seamlessly blending sashing together with extra jersey materials and a diverse array of colors for a personalized touch.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_SCRIPT,
    name: "Heirloom Script",
    description: "Add custom text or designs to specific areas.",
    img: EmbroideryImg,
    brief:
      "Exquisite custom embroidery adorns the borders of each blanket, adding a touch of personalized elegance.",
  },

 
];

type UpgradePriceBySize = Record<BlanketSizeId, number>;

export const priceMap: Record<UpgradeId, UpgradePriceBySize> = {
  [UPGRADE_IDS.HEIRLOOM_SCRIPT]: {
    [BLANKET_SIZE_IDS.LAP]: 29.86,
    [BLANKET_SIZE_IDS.THROW]: 29.86,
    [BLANKET_SIZE_IDS.GAME]: 29.86,
    [BLANKET_SIZE_IDS.STADIUM]: 29.86,
    [BLANKET_SIZE_IDS.TWIN]: 29.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 29.86,
    [BLANKET_SIZE_IDS.FULL]: 29.86,
    [BLANKET_SIZE_IDS.QUEEN]: 29.86,
    [BLANKET_SIZE_IDS.KING]: 29.86,
  },
  [UPGRADE_IDS.HEIRLOOM_BLOCK]: {
    [BLANKET_SIZE_IDS.LAP]: 16.86,
    [BLANKET_SIZE_IDS.THROW]: 19.86,
    [BLANKET_SIZE_IDS.GAME]: 29.86,
    [BLANKET_SIZE_IDS.STADIUM]: 39.86,
    [BLANKET_SIZE_IDS.TWIN]: 49.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 54.86,
    [BLANKET_SIZE_IDS.FULL]: 59.86,
    [BLANKET_SIZE_IDS.QUEEN]: 69.86,
    [BLANKET_SIZE_IDS.KING]: 79.86,
  },
  [UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE]: {
    [BLANKET_SIZE_IDS.LAP]: 29.86,
    [BLANKET_SIZE_IDS.THROW]: 29.86,
    [BLANKET_SIZE_IDS.GAME]: 29.86,
    [BLANKET_SIZE_IDS.STADIUM]: 29.86,
    [BLANKET_SIZE_IDS.TWIN]: 29.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 29.86,
    [BLANKET_SIZE_IDS.FULL]: 29.86,
    [BLANKET_SIZE_IDS.QUEEN]: 29.86,
    [BLANKET_SIZE_IDS.KING]: 29.86,
  },
  [UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE]: {
    [BLANKET_SIZE_IDS.LAP]: 49.86,
    [BLANKET_SIZE_IDS.THROW]: 49.86,
    [BLANKET_SIZE_IDS.GAME]: 49.86,
    [BLANKET_SIZE_IDS.STADIUM]: 49.86,
    [BLANKET_SIZE_IDS.TWIN]: 49.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 49.86,
    [BLANKET_SIZE_IDS.FULL]: 49.86,
    [BLANKET_SIZE_IDS.QUEEN]: 49.86,
    [BLANKET_SIZE_IDS.KING]: 49.86,
  },
  [UPGRADE_IDS.HEIRLOOM_PANEL]: {
    [BLANKET_SIZE_IDS.LAP]: 29.86,
    [BLANKET_SIZE_IDS.THROW]: 29.86,
    [BLANKET_SIZE_IDS.GAME]: 29.86,
    [BLANKET_SIZE_IDS.STADIUM]: 29.86,
    [BLANKET_SIZE_IDS.TWIN]: 29.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 29.86,
    [BLANKET_SIZE_IDS.FULL]: 29.86,
    [BLANKET_SIZE_IDS.QUEEN]: 29.86,
    [BLANKET_SIZE_IDS.KING]: 29.86,
  },
  [UPGRADE_IDS.HEIRLOOM_PRESERVE]: {
    [BLANKET_SIZE_IDS.LAP]: 79.86,
    [BLANKET_SIZE_IDS.THROW]: 99.86,
    [BLANKET_SIZE_IDS.GAME]: 129.86,
    [BLANKET_SIZE_IDS.STADIUM]: 149.86,
    [BLANKET_SIZE_IDS.TWIN]: 159.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 174.88,
    [BLANKET_SIZE_IDS.FULL]: 189.86,
    [BLANKET_SIZE_IDS.QUEEN]: 209.86,
    [BLANKET_SIZE_IDS.KING]: 249.86,
  },
  [UPGRADE_IDS.HEIRLOOM_SEAL]: {
    [BLANKET_SIZE_IDS.LAP]: 19.86,
    [BLANKET_SIZE_IDS.THROW]: 24.86,
    [BLANKET_SIZE_IDS.GAME]: 29.86,
    [BLANKET_SIZE_IDS.STADIUM]: 34.86,
    [BLANKET_SIZE_IDS.TWIN]: 39.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 44.86,
    [BLANKET_SIZE_IDS.FULL]: 49.86,
    [BLANKET_SIZE_IDS.QUEEN]: 54.86,
    [BLANKET_SIZE_IDS.KING]: 59.86,
  },
  [UPGRADE_IDS.HEIRLOOM_EDGE]: {
    [BLANKET_SIZE_IDS.LAP]: 59.86,
    [BLANKET_SIZE_IDS.THROW]: 69.86,
    [BLANKET_SIZE_IDS.GAME]: 79.86,
    [BLANKET_SIZE_IDS.STADIUM]: 89.86,
    [BLANKET_SIZE_IDS.TWIN]: 99.86,
    [BLANKET_SIZE_IDS.DORMIE_TWIN]: 104.86,
    [BLANKET_SIZE_IDS.FULL]: 109.86,
    [BLANKET_SIZE_IDS.QUEEN]: 119.86,
    [BLANKET_SIZE_IDS.KING]: 129.86,
  },
};
