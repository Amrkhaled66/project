import { BLANKET_SIZES, type BlanketSize } from "src/data/blanketSizes";
import { getBuyNewBuildKey } from "src/utils/buyNewBuild";

import BuyNewBuildCard from "./BuyNewBuildCard";

type BuyNewBuildGridProps = {
  isPending: boolean;
  onCheckout: (size: BlanketSize) => void;
  selectedBuild: string | null;
};

export default function BuyNewBuildGrid({
  isPending,
  onCheckout,
  selectedBuild,
}: BuyNewBuildGridProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {BLANKET_SIZES.map((size, index) => {
        const buildKey = getBuyNewBuildKey(size);

        return (
          <BuyNewBuildCard
            key={size.id}
            index={index}
            isLoading={isPending && selectedBuild === buildKey}
            onCheckout={onCheckout}
            size={size}
          />
        );
      })}
    </section>
  );
}
