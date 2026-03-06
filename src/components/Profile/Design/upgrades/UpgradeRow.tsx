import { UpgradeOption } from "src/data/upgrades";

import React from "react";
import priceFormmater from "src/utils/priceFormmater";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
type UpgradeTabProps = {
  selectedSet: Set<string>;
  onToggle: (id: string) => void;
  onOpen: (item: UpgradeOption) => void;
  size: string;
  priceMap: any;
};

type UpgradeRowProps = {
  item: UpgradeOption;
  checked: boolean;
  onToggle: (id: string) => void;
  onOpen: (item: UpgradeOption) => void;
  price: number | undefined;
  active?: boolean;
};

const UpgradeRow = React.memo(function UpgradeRow({
  item,
  checked,
  onToggle,
  onOpen,
  price,
  active,
}: UpgradeRowProps) {
  return (
    <label
      className={cn(
        "block cursor-pointer rounded-xl border p-2 transition-all",
        "hover:-translate-y-[1px] hover:shadow-sm",
        checked || active
          ? "border-neutral-900 bg-neutral-50"
          : "border-neutral-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={active || checked}
              onChange={() => {
                active ? null : onToggle(item.id);
              }}
              className="mt-0.5 accent-black"
            />

            <div className="min-w-0">
              <p className="text-sm text-neutral-900">{item.name}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {typeof price === "number" && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-semibold",
                checked
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-neutral-50 text-neutral-900",
              )}
            >
              {priceFormmater(price)}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen(item);
            }}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border",
              "border-neutral-200 bg-neutral-900 text-xs font-semibold text-white",
              "transition-all hover:text-white",
            )}
            aria-label={`More info about ${item.name}`}
            title={`More info about ${item.name}`}
          >
            i
          </button>
        </div>
      </div>
    </label>
  );
});

export default UpgradeRow;
