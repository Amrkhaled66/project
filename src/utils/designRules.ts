import { UPGRADE_IDS } from "src/data/upgrades";

type EmbroideryZone = {
  id: string;
  [key: string]: unknown;
};

const CENTER_ZONE_IDS = new Set([
  "top-center",
  "left-center",
  "right-center",
  "bottom-center",
]);

export const applyUpgradeSelectionRules = (
  selected: string[],
  upgradeId: string,
): string[] => {
  const isActive = selected.includes(upgradeId);
  let nextSelected = isActive
    ? selected.filter((id) => id !== upgradeId)
    : [...selected, upgradeId];

  switch (upgradeId) {
    case UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE:
      if (!isActive) {
        nextSelected = nextSelected.filter(
          (id) => id !== UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
        );
      }
      break;

    case UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE:
      if (!isActive) {
        nextSelected = nextSelected.filter(
          (id) => id !== UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
        );
      }
      break;

    case UPGRADE_IDS.HEIRLOOM_PRESERVE:
      if (!isActive && !nextSelected.includes(UPGRADE_IDS.HEIRLOOM_EDGE)) {
        nextSelected = [...nextSelected, UPGRADE_IDS.HEIRLOOM_EDGE];
      }
      break;

    default:
      break;
  }

  return nextSelected;
};

export const filterEmbroideryZonesForSelectedUpgrades = (
  selected: string[],
  zones: EmbroideryZone[] | null | undefined,
) => {
  if (!zones?.length) {
    return zones ?? [];
  }

  if (!selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE)) {
    return zones;
  }

  return zones.filter((zone) => !CENTER_ZONE_IDS.has(zone.id));
};
