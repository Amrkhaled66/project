import { DesignData } from "src/types/design.types";
import { BLANKET_SIZES } from "src/data/blanketSizes";
import { upgrades } from "src/data/upgrades";
import { priceMap } from "src/data/upgrades";
export function calculateDesignPrice(designData : DesignData ): number {
  if (!designData) return 0;

  // ------------------
  // Size price
  // ------------------
  const startingSizeName = designData.startingSize;
  const sizeName = designData.canvas?.size;
  const curentSize = BLANKET_SIZES.find((s) => s.id === sizeName) || BLANKET_SIZES[0];
  const StartingSize = BLANKET_SIZES.find((s) => s.id === startingSizeName) || BLANKET_SIZES[0];
  const basePrice = curentSize.price - StartingSize.price;

  // ------------------
  // Upgrades price
  // ------------------
  const selected = designData.upgrades?.selected ?? [];

  let totalUpgrades = 0;
  for (const id of selected) {
    const upgrade = upgrades.find((u) => u.id === id);
    if (upgrade) totalUpgrades += priceMap[upgrade.id][sizeName];
  }

  return Number((basePrice + totalUpgrades).toFixed(2));
}
