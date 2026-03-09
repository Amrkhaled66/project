// addonsData.ts
import framingImg from "src/assets/addOns/framing.webp";
import CustomPanelsImg from "src/assets/addOns/customePanels.webp";
import CornerstonesImg from "src/assets/addOns/corner.webp";
import QuiltedPreserveImg from "src/assets/addOns/quality.webp";
import BlockingImg from "src/assets/addOns/blocking.webp";
import egdeImg from "src/assets/addOns/edge.webp";
import EmbroideryImg from "src/assets/addOns/embroidery.webp";
import sale from "src/assets/addOns/sale.webp";
import { BLANKET_SIZE_IDS, BlanketSizeId } from "src/data/blanketSizes";

// upgradeIds.ts
export const UPGRADE_IDS = {
  HEIRLOOM_SCRIPT: "heirloomScript",
  HEIRLOOM_BLOCK: "heirloomBlock",
  HEIRLOOM_CORNER_SINGLE: "heirloomCornerSingle",
  HEIRLOOM_CORNER_DOUBLE: "heirloomCornerDouble",
  HEIRLOOM_PANEL: "heirloomPanel",
  HEIRLOOM_FRAMING: "heirloomFraming",
  HEIRLOOM_PRESERVE: "heirloomPreserve",
  HEIRLOOM_SEAL: "heirloomSeal",
  HEIRLOOM_EDGE: "heirloomEdge",
} as const;

export const upgradesTabs: Record<
  string,
  { label: string; elments: UpgradeId[] }
> = {
  standardIssue: {
    label: "Standard Issue",
    elments: [UPGRADE_IDS.HEIRLOOM_PANEL, UPGRADE_IDS.HEIRLOOM_FRAMING],
  },
  flagshipElements: {
    label: "Flagship Elements",
    elments: [UPGRADE_IDS.HEIRLOOM_PRESERVE, UPGRADE_IDS.HEIRLOOM_EDGE],
  },
  coreElements: {
    label: "Core Elements",
    elments: [
      UPGRADE_IDS.HEIRLOOM_SCRIPT,
      UPGRADE_IDS.HEIRLOOM_BLOCK,
      UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
      UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
      UPGRADE_IDS.HEIRLOOM_SEAL,
    ],
  },
};

export type UpgradeId = (typeof UPGRADE_IDS)[keyof typeof UPGRADE_IDS];

export type UpgradeOption = {
  id: UpgradeId;
  name: string;
  description: string;
  autoAppliedBy?: UpgradeId;
  img?: string;
  brief?: string;
  selected?: boolean;
};

export const upgrades: UpgradeOption[] = [
  {
    id: UPGRADE_IDS.HEIRLOOM_FRAMING,
    name: "Heirloom Framing",
    description: "waiting",
    img: framingImg,
    brief:
      "A controlled framing system that separates and presents each jersey as its own chapter.\nHeirloom Framing™ establishes visual rhythm across the grid—guiding the eye through teams, seasons, numbers, and insignia while maintaining structural stability between panels. The result is a composition that reads like a curated collection rather than a patchwork assembly.",
    selected: true,
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_PANEL,
    name: "Heirloom Panel",
    description: "Integrate unique fabric panels into the design.",
    img: CustomPanelsImg,
    brief:
      "The structural chapter unit of every Jersey Blanket™ artifact.Each jersey panel is stabilized according to its material, construction, and age—ensuring the fabric holds its shape while preserving the integrity of the original garment.This disciplined stabilization allows the story to be read clearly across seasons while protecting the textiles that carry it.",
    selected: true,
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_PRESERVE,
    name: "Heirloom Preserve™",
    description: "Enhanced durability and texture.",
    img: QuiltedPreserveImg,
    brief:
      "A calibrated stitch-density architecture that locks the entire build into permanent alignment.\nHeirloom Preserve™ introduces interior structural layers engineered to stabilize panels, reinforce framing, and resist distortion through real use. The result is measured weight, improved durability, and a blanket that holds its form across years of wear.It is the system most responsible for turning a collection of jerseys into a lasting textile artifact.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_EDGE,
    name: "Heirloom Edge™",
    description:
      "Protective stitched edge wrapping the full blanket; auto-enabled with Heirloom Preserve.",
    img: egdeImg,
    brief:
      "A reinforced perimeter architecture designed to protect the highest-stress boundary of the artifact.\nHeirloom Edge™ stabilizes the outer edge where wear and tension concentrate most—reducing fray risk while preserving the geometry of the build.The result is a clean, controlled boundary that protects the interior architecture and maintains the artifact’s structure through years of use.",
  },

  {
    id: UPGRADE_IDS.HEIRLOOM_SEAL,
    name: "Heirloom Seal™",
    description: "Add a decorative seal to the border.",
    img: sale,
    brief:
      "A controlled finishing doctrine that resolves the composition.\nHeirloom Seal™ brings the artifact to a deliberate conclusion—closing the build with a clean visual boundary and structural confidence. The seal establishes authority in the final presentation, allowing the artifact to read as complete and intentional.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_BLOCK,
    name: "Heirloom Block™",
    description: "Adds structural support and pattern definition.",
    img: BlockingImg,
    brief:
      "Structural reinforcement placed at key intersections within the grid.\nHeirloom Block™ distributes tension across panel junctions—preserving alignment, geometry, and long-term stability while preventing stress concentration in high-load areas.It strengthens the internal architecture without interrupting the visual rhythm of the composition.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
    name: "Heirloom Stone™ (Single)",
    description: "Add decorative patches to the 4 corners of the blanket.",
    img: CornerstonesImg,
    brief:
      "A controlled marker system used to anchor meaning within the artifact.\nHeirloom Stones™ designate milestones—championship seasons, defining teams, locations, or eras—without disrupting the visual discipline of the build.They function as archival markers within the composition, giving important moments a permanent place in the narrative.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
    name: "Heirloom Stone™ (Double)",
    description:
      "Add decorative patches to all 8 positions - 4 corners and 4 midpoints on each side.",
    img: CornerstonesImg,
    brief:
      "A controlled marker system used to anchor meaning within the artifact.\nHeirloom Stones™ designate milestones—championship seasons, defining teams, locations, or eras—without disrupting the visual discipline of the build.They function as archival markers within the composition, giving important moments a permanent place in the narrative.",
  },
  {
    id: UPGRADE_IDS.HEIRLOOM_SCRIPT,
    name: "Heirloom Script™",
    description: "Add custom text or designs to specific areas.",
    img: EmbroideryImg,
    brief:
      "A museum-style inscription integrated directly into the grid.\nHeirloom Script™ introduces a controlled embroidery field designed to read like an archival label rather than a retail customization. Names, years, achievements, or messages are preserved as part of the artifact’s permanent record. The result is an inscription that feels authored, not decorative.",
  },
];

type UpgradePriceBySize = Record<BlanketSizeId, number>;

export const priceMap: Partial<Record<UpgradeId, UpgradePriceBySize>> = {
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
