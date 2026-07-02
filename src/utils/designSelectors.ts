import { UPGRADE_IDS } from "src/data/upgrades";
import { calculateDesignPrice } from "src/utils/calcDesignPrice";
import { getChangedFields } from "src/utils/getChangedFields";
import type { Design } from "src/types/design.types";
import type { DesignData } from "src/types/design.types";
import type {
  DesignDerivedValue,
  DirtySection,
} from "src/types/desgin/editor.types";

const DIRTY_SECTION_KEYS: DirtySection[] = [
  "canvas",
  "panelSize",
  "colors",
  "photos",
  "upgrades",
  "text",
];

export const getDirtySections = (
  snapshot: DesignData | undefined,
  current: DesignData,
): DirtySection[] => {
  if (!snapshot) {
    return [];
  }
  const changed = getChangedFields(snapshot as any, current as any);
  return DIRTY_SECTION_KEYS.filter((key) => key in changed);
};

export const mergeDesignRecord = (
  previous: Design | undefined,
  payload: Partial<DesignData> | undefined,
  price: number | undefined,
) => {
  if (!previous || !payload) {
    return previous;
  }

  return {
    ...previous,
    designData: {
      ...previous.designData,
      ...payload,
    },
    price: typeof price === "number" ? price.toFixed(2) : previous.price,
  };
};

export const getDesignDerivedValue = ({
  designData,
  dirtySections,
  hasChanged,
  isDragging,
}: {
  designData: DesignData;
  dirtySections: DirtySection[];
  hasChanged: boolean;
  isDragging: boolean;
}): DesignDerivedValue => {
  const selected = designData.upgrades.selected.map(String);
  const hasCornerstones =
    selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE) ||
    selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE);

  return {
    price: calculateDesignPrice(designData).toString(),
    hasCornerstones,
    hasDoubleCorner: selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE),
    hasBlocking: selected.includes(UPGRADE_IDS.HEIRLOOM_BLOCK),
    hasEmbroidery: selected.includes(UPGRADE_IDS.HEIRLOOM_SCRIPT),
    hasCustomPanel: selected.includes(UPGRADE_IDS.HEIRLOOM_PANEL),
    hasQualityPreserve: selected.includes(UPGRADE_IDS.HEIRLOOM_PRESERVE),
    hasBinding: selected.includes(UPGRADE_IDS.HEIRLOOM_EDGE),
    hasFringe: selected.includes(UPGRADE_IDS.HEIRLOOM_SEAL),
    hasChanged,
    isDragging,
    dirtySections,
  };
};
