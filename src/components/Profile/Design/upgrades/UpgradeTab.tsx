import React, { useState } from "react";
import { upgradesTabs, upgrades } from "src/data/upgrades";
import { UpgradeOption } from "src/data/upgrades";
import UpgradeRow from "./UpgradeRow";

type Props = {
  selectedSet: Set<string>;
  onToggle: (id: string) => void;
  onOpen: (item: UpgradeOption) => void;
  size: string;
  priceMap: any;
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function UpgradeTab({
  selectedSet,
  onToggle,
  onOpen,
  size,
  priceMap,
}: Props) {
  const [openTab, setOpenTab] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {Object.entries(upgradesTabs).map(([key, tab]) => {
        const isOpen = openTab === key;

        const tabUpgrades = upgrades.filter((u) => tab.elments.includes(u.id));

        return (
          <div
            key={key}
            className={cn(
              "rounded-xl border border-neutral-200 transition-all duration-300",
            )}
          >
            {/* TAB HEADER */}
            <button
              onClick={() => setOpenTab(isOpen ? null : key)}
              className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-4 py-3 text-left text-sm font-semibold transition-colors"
            >
              {tab.label}

              <span
                className={cn(
                  "text-xs transition-transform duration-300 ease-out",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              >
                ▼
              </span>
            </button>

            {/* TAB BODY */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 p-3">
                  {tabUpgrades.map((item) => (
                    <UpgradeRow
                      key={item.id}
                      item={item}
                      checked={selectedSet.has(item.id)}
                      onToggle={onToggle}
                      onOpen={onOpen}
                      price={priceMap[item.id]?.[size]}
                      active={item.selected}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
