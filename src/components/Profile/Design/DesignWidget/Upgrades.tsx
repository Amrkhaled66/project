import React, { useEffect, useMemo, useState, useCallback } from "react";
import DesginContainer from "../DesginContainer";
import priceFormmater from "src/utils/priceFormmater";
import Model from "src/components/ui/Model";
import { useDesign } from "src/context/desgin.context";
import { priceMap, upgrades, UpgradeOption } from "src/data/upgrades";
import UpgradeTab from "src/components/Profile/Design/upgrades/UpgradeTab";

type AddonsCheckboxProps = {
  selectedUpgrades: string[];
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

  // preload upgrade images
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

  // image loading handling
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
      <DesginContainer header="Heirloom Preservation Elements™">
        <UpgradeTab
          selectedSet={selectedSet}
          onToggle={handleToggle}
          onOpen={handleOpen}
          size={size}
          priceMap={priceMap}
        />
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
                    <img
                      key={activeUpgrade.img}
                      src={activeUpgrade.img}
                      alt={activeUpgrade.name}
                      loading="eager"
                      decoding="async"
                      className="h-56 w-full object-cover"
                    />

                    {isImageLoading && (
                      <div className="absolute inset-0 flex h-56 w-full items-center justify-center bg-white/70 text-sm text-neutral-600 backdrop-blur-[1px]">
                        Loading image...
                      </div>
                    )}

                    <div className="absolute right-3 bottom-3 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      {typeof priceMap[activeUpgrade.id]?.[size] === "number"
                        ? priceFormmater(
                            priceMap[activeUpgrade.id]?.[size] ?? 0,
                          )
                        : "Selected"}
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

              {/* Footer */}
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