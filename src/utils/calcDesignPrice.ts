import { DesignData } from "src/types/design.types";
import { BLANKET_SIZES } from "src/data/blanketSizes";
import { upgrades } from "src/data/upgrades";
export function calculateDesignPrice(designData : DesignData ): number {
  if (!designData) return 0;

  // ------------------
  // Size price
  // ------------------
  const sizeName = designData.canvas?.size?.name;
  const size = BLANKET_SIZES.find((s) => s.id === sizeName);
  const basePrice = size?.price ?? 0;

  // ------------------
  // Upgrades price
  // ------------------
  const selected = designData.upgrades?.selected ?? [];

  let totalUpgrades = 0;
  for (const id of selected) {
    const upgrade = upgrades.find((u) => u.id === id);
    if (upgrade) totalUpgrades += upgrade.price;
  }
  console.log(totalUpgrades)

  return Number((basePrice + totalUpgrades).toFixed(2));
}
