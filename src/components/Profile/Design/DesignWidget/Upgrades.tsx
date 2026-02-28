import React, { useEffect, useMemo, useState, useCallback } from "react";
import { upgrades, UpgradeOption } from "src/data/upgrades";
import DesginContainer from "../DesginContainer";
import priceFormmater from "src/utils/priceFormmater";
import Model from "src/components/ui/Model";
import { useDesign } from "src/context/desgin.context";
import { priceMap } from "src/data/upgrades";
import { BLANKET_SIZE_IDS } from "src/data/blanketSizes";

type AddonsCheckboxProps = {
  selectedUpgrades: string[];
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type UpgradeRowProps = {
  item: UpgradeOption;
  checked: boolean;
  onToggle: (id: string) => void;
  onOpen: (item: UpgradeOption) => void;
  price: number;
};

const UpgradeRow = React.memo(function UpgradeRow({
  item,
  checked,
  onToggle,
  onOpen,
  price,
}: UpgradeRowProps) {
  return (
    <label
      className={cn(
        "block cursor-pointer rounded-xl border p-2 transition-all",
        "hover:-translate-y-[1px] hover:shadow-sm",
        checked ? "border-neutral-900 bg-neutral-50" : "border-neutral-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(item.id)}
              className="mt-0.5 accent-black"
            />

            <div className="min-w-0">
              <p className="text-sm text-neutral-900">{item.name}</p>

              {/* {item.description && (
                <p className="mt-1 text-xs leading-snug text-neutral-600">
                  {item.description}
                </p>
              )} */}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
        </div>
      </div>
    </label>
  );
});

export default function AddonsCheckbox({
  selectedUpgrades,
}: AddonsCheckboxProps) {
  const {
    toggleUpgrade,
    designData: {
      canvas: { size },
    },
  } = useDesign();

  const [activeUpgrade, setActiveUpgrade] = useState<UpgradeOption | null>(
    null,
  );
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Preload images (once)
  useEffect(() => {
    upgrades.forEach((u) => {
      if (!u.img) return;
      const img = new Image();
      img.src = u.img;
    });
  }, []);

  const selectedSet = useMemo(
    () => new Set(selectedUpgrades),
    [selectedUpgrades],
  );

  const handleOpen = useCallback((item: UpgradeOption) => {
    requestAnimationFrame(() => setActiveUpgrade(item));
  }, []);

  const handleClose = useCallback(() => {
    setActiveUpgrade(null);
    setIsImageLoading(false);
  }, []);

  const handleToggle = useCallback(
    (id: string) => {
      toggleUpgrade(id);
    },
    [toggleUpgrade],
  );

  // ✅ Reliable image loading (works even if cached)
  useEffect(() => {
    const src = activeUpgrade?.img;
    if (!src) {
      setIsImageLoading(false);
      return;
    }

    setIsImageLoading(true);

    const probe = new Image();
    probe.decoding = "async";
    probe.src = src;

    const done = () => setIsImageLoading(false);

    if (probe.complete) {
      // Cached image: onload might not fire consistently, so finish immediately
      done();
      return;
    }

    probe.onload = done;
    probe.onerror = done;

    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [activeUpgrade?.img]);

  const activeIsSelected = activeUpgrade
    ? selectedSet.has(activeUpgrade.id)
    : false;

  return (
    <>
      <DesginContainer header="Upgrades" className="">
        <div className="space-y-2">
          {upgrades.map((item) => {
            return (
              <UpgradeRow
                key={item.id}
                item={item}
                checked={selectedSet.has(item.id)}
                onToggle={handleToggle}
                onOpen={handleOpen}
                price={priceMap[item.id][size]}
              />
            );
          })}
        </div>
      </DesginContainer>

      <Model isOpen={!!activeUpgrade} onClose={handleClose}>
        <div className="max-h-[85vh] w-[min(640px,92vw)] overflow-hidden rounded-2xl bg-white shadow-2xl">
          {activeUpgrade && (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-neutral-100 p-5">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-neutral-900">
                    {activeUpgrade.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Close
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[70vh] overflow-y-auto p-5">
                {activeUpgrade.img ? (
                  <div className="relative overflow-hidden rounded-xl border border-neutral-100">
                    {/* ✅ Always render the image (no permanent opacity lock) */}
                    <img
                      key={activeUpgrade.img} // forces remount if src changes
                      src={activeUpgrade.img}
                      alt={activeUpgrade.name}
                      loading="eager"
                      decoding="async"
                      className="h-56 w-full object-cover"
                    />

                    {/* Loading overlay (doesn't hide image forever) */}
                    {isImageLoading && (
                      <div className="absolute inset-0 flex h-56 w-full items-center justify-center bg-white/70 text-sm text-neutral-600 backdrop-blur-[1px]">
                        Loading image...
                      </div>
                    )}

                    {/* Price badge bottom-right */}
                    <div className="absolute right-3 bottom-3 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      {priceFormmater(priceMap[activeUpgrade.id][size])}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-56 w-full items-center justify-center rounded-xl bg-neutral-50 text-sm text-neutral-500">
                    No image available
                  </div>
                )}

                <p className="mt-1 text-sm text-neutral-600">
                  {activeUpgrade.brief
                    ? activeUpgrade.brief
                    : "Upgrade details"}
                </p>
              </div>

              {/* Footer: Add/Remove */}
              <div className="flex items-center justify-between gap-3 border-t border-neutral-100 p-5">
                <span className="text-xs text-neutral-500">
                  This will be applied to your design.
                </span>

                <button
                  type="button"
                  onClick={() => handleToggle(activeUpgrade.id)}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-sm font-semibold transition-all",
                    activeIsSelected
                      ? "border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                      : "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800",
                  )}
                >
                  {activeIsSelected ? "Remove upgrade" : "Add upgrade"}
                </button>
              </div>
            </>
          )}
        </div>
      </Model>
    </>
  );
}
