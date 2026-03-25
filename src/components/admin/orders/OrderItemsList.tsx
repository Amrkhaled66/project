import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLANKET_SIZES } from "src/data/blanketSizes";
import {
  getUpgradePrice,
  upgradeMap,
  UPGRADE_IDS,
} from "src/data/upgrades";
import getImageLink from "src/utils/getImageLink";
import priceFormmater from "src/utils/priceFormmater";
import { Design } from "src/types/design.types";

type Props = {
  items: Design[];
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 flex items-center gap-2">
    <span className="text-[11px] font-bold tracking-[0.12em] text-gray-400 uppercase">
      {children}
    </span>
    <div className="h-px flex-1 bg-gray-100" />
  </div>
);

const InfoChip = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const OrderItemsList = ({ items }: Props) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Order Items
        </h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.map((item: Design) => {
        const { designData } = item;
        const canvasSize = BLANKET_SIZES.find(
          (size) => size.id === designData.canvas.size,
        );
        const startingSize = BLANKET_SIZES.find(
          (size) => size.id === designData.startingSize,
        );
        const sizeDifference =
          canvasSize && startingSize ? canvasSize.price - startingSize.price : 0;
        const hasSizeDifference =
          !!canvasSize &&
          !!startingSize &&
          designData.canvas.size !== designData.startingSize;
        const shippingPrice = canvasSize?.shippingPrice ?? 0;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            {/* ── Item Header ── */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 bg-gray-50/60 px-6 py-5">
              <div className="flex items-center gap-4">
                {item.previewImage && (
                  <div
                    className="group relative h-20 w-20 shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                    onClick={() =>
                      setZoomedImage(getImageLink(item.previewImage || ""))
                    }
                  >
                    <img
                      src={getImageLink(item.previewImage)}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm0 0l4 4"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  {item.previewImage && (
                    <p className="mt-0.5 text-xs text-gray-400">Design Preview</p>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-2xl font-extrabold tracking-tight text-gray-900">
                  ${item.price}
                </div>
                <div className="mt-0.5 text-xs text-gray-400">total</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100 px-6">
              {/* ── Size ── */}
              <div className="py-5">
                <SectionLabel>Size</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  <InfoChip label="Canvas" value={designData.canvas.size} />
                  <InfoChip
                    label="Grid"
                    value={`${designData.canvas.rows} × ${designData.canvas.cols}`}
                  />
                  {hasSizeDifference && (
                    <>
                      <InfoChip label="Starting" value={designData.startingSize} />
                      <div className="flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm">
                        <span className="text-amber-500 font-semibold">
                          +{priceFormmater(sizeDifference)} upsize
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Shipping ── */}
              <div className="py-5">
                <SectionLabel>Shipping</SectionLabel>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="ml-auto font-semibold text-gray-900">
                    {priceFormmater(shippingPrice)}
                  </span>
                </div>
              </div>

              {/* ── Upgrades ── */}
              {designData.upgrades.selected.length > 0 && (
                <div className="py-5">
                  <SectionLabel>
                    Upgrades ({designData.upgrades.selected.length})
                  </SectionLabel>
                  <div className="space-y-3">
                    {designData.upgrades.selected.map(
                      (upgrade: string, i: number) => {
                        const matchedUpgrade =
                          upgradeMap[upgrade as keyof typeof upgradeMap];
                        const upgradePrice = matchedUpgrade
                          ? getUpgradePrice(
                              matchedUpgrade.id,
                              designData.canvas.size,
                            )
                          : 0;

                        return (
                          <div
                            key={i}
                            className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                          >
                            {/* Upgrade Title Row */}
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                                <span className="font-semibold text-gray-900">
                                  {matchedUpgrade?.name || upgrade}
                                </span>
                              </div>
                              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
                                {priceFormmater(upgradePrice)}
                              </span>
                            </div>

                            {/* Embroidery Zones */}
                            {upgrade === UPGRADE_IDS.HEIRLOOM_SCRIPT &&
                              designData.upgrades.props.embroidery?.zones && (
                                <div className="space-y-2">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Embroidery Zones
                                  </p>
                                  {designData.upgrades.props.embroidery.zones.map(
                                    (
                                      zone: {
                                        id: string;
                                        font: string;
                                        text: string;
                                        color: string;
                                        notes: string;
                                      },
                                      zoneIndex: number,
                                    ) => (
                                      <div
                                        key={zoneIndex}
                                        className="rounded-lg border border-gray-200 bg-white p-3 text-sm"
                                      >
                                        <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1">
                                          <span>
                                            <span className="text-gray-400">Position: </span>
                                            <span className="font-medium text-gray-800">
                                              {zone.id}
                                            </span>
                                          </span>
                                          <span>
                                            <span className="text-gray-400">Font: </span>
                                            <span className="font-medium text-gray-800">
                                              {zone.font}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="mb-2">
                                          <span className="text-gray-400">Text: </span>
                                          <span className="font-medium text-gray-800">
                                            {zone.text}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-400">Color:</span>
                                          <div
                                            className="h-4 w-4 rounded-full border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: zone.color }}
                                          />
                                          <span className="font-mono text-xs text-gray-600">
                                            {zone.color}
                                          </span>
                                        </div>
                                        {zone.notes && (
                                          <div className="mt-2 rounded bg-amber-50 px-2 py-1 text-xs text-amber-700 italic">
                                            {zone.notes}
                                          </div>
                                        )}
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}

                            {/* Cornerstone Type */}
                            {(upgrade === UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE ||
                              upgrade === UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE) &&
                              designData.upgrades.props.cornerstones?.type && (
                                <div className="text-sm">
                                  <span className="text-gray-400">Type: </span>
                                  <span className="font-medium capitalize text-gray-800">
                                    {designData.upgrades.props.cornerstones.type}
                                  </span>
                                </div>
                              )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {/* ── Photos & Colors ── */}
              <div className="py-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Photos */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <SectionLabel>Photos</SectionLabel>
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {designData.photos.items.length}
                      </span>
                      <span className="mb-1 text-sm text-gray-400">
                        {designData.photos.items.length === 1 ? "photo" : "photos"}
                      </span>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <SectionLabel>Colors</SectionLabel>
                    <div className="space-y-2">
                      {Object.entries(designData.colors || {})
                        .filter(([_, value]) => value)
                        .map(([key, value]) => {
                          if (key === "blocking") {
                            const isObj =
                              value && typeof value === "object";
                            const colors = isObj
                              ? (value as any).colors
                              : [value as string];
                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="w-16 capitalize text-gray-400">
                                  {key}
                                </span>
                                <div className="flex items-center gap-1">
                                  {colors.map((c: string, ci: number) => (
                                    <div
                                      key={ci}
                                      className="h-5 w-5 rounded-full border border-gray-300 shadow-sm"
                                      style={{ backgroundColor: c }}
                                      title={c}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span className="w-16 capitalize text-gray-400">
                                {key}
                              </span>
                              <div
                                className="h-5 w-5 rounded-full border border-gray-300 shadow-sm"
                                style={{ backgroundColor: value as string }}
                                title={value?.toString()}
                              />
                              <span className="font-mono text-xs text-gray-600">
                                {value?.toString()}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* ── Zoom Modal ── */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, type: "spring", damping: 22 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedImage}
                alt="Zoomed preview"
                className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-lg backdrop-blur-sm hover:bg-white"
                onClick={() => setZoomedImage(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderItemsList;