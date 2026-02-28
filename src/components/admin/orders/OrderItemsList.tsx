import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getImageLink from "src/utils/getImageLink";
import { Design } from "src/types/design.types";
import { UPGRADE_IDS } from "src/data/upgrades";
type Props = {
  items: Design[];
};

const OrderItemsList = ({ items }: Props) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Order Items ({items.length})
      </h2>

      {items.map((item: Design) => {
        const { designData } = item;

        return (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            {/* Header with Name and Price */}
            <div className="mb-6 flex items-start justify-between border-b pb-4">
              <div className="flex items-start gap-4">
                {item.previewImage && (
                  <img
                    src={getImageLink(item.previewImage)}
                    alt={item.name}
                    className="h-24 w-24 cursor-pointer rounded-lg border border-gray-200 object-cover transition-transform hover:scale-105"
                    onClick={() =>
                      setZoomedImage(getImageLink(item.previewImage || ""))
                    }
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  {item.previewImage && (
                    <p className="mt-1 text-sm text-gray-500">Design Preview</p>
                  )}
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">
                ${item.price}
              </div>
            </div>

            {/* Size Information */}
            <div className="mb-6">
              <h4 className="mb-3 text-base font-semibold text-gray-900">
                Size
              </h4>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Canvas Size:</span>
                  <span className="font-medium text-gray-900">
                    {designData.canvas.size}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({designData.canvas.rows} × {designData.canvas.cols})
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrades Section */}
            {designData.upgrades.selected.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  Upgrades ({designData.upgrades.selected.length})
                </h4>
                <div className="space-y-4">
                  {designData.upgrades.selected.map(
                    (upgrade: string, i: number) => (
                      <div
                        key={i}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="mb-3 font-medium text-gray-900 capitalize">
                          {upgrade}
                        </div>

                        {/* Embroidery Details */}
                        {upgrade === UPGRADE_IDS.HEIRLOOM_SCRIPT &&
                          designData.upgrades.props.embroidery?.zones && (
                            <div className="space-y-3">
                              <div className="text-sm font-medium text-gray-700">
                                Embroidery Zones:
                              </div>
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
                                    className="rounded border border-gray-300 bg-white p-3"
                                  >
                                    <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <span className="text-gray-600">
                                          Position:
                                        </span>
                                        <span className="ml-2 font-medium">
                                          {zone.id}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Font:
                                        </span>
                                        <span className="ml-2 font-medium">
                                          {zone.font}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mb-2 text-sm">
                                      <span className="text-gray-600">
                                        Text:
                                      </span>
                                      <span className="ml-2 font-medium">
                                        {zone.text}
                                      </span>
                                    </div>
                                    <div className="mb-2 flex items-center gap-2 text-sm">
                                      <span className="text-gray-600">
                                        Color:
                                      </span>
                                      <div
                                        className="h-5 w-5 rounded border border-gray-300"
                                        style={{ backgroundColor: zone.color }}
                                      />
                                      <span className="font-medium">
                                        {zone.color}
                                      </span>
                                    </div>
                                    {zone.notes && (
                                      <div className="text-sm">
                                        <span className="text-gray-600">
                                          Notes:
                                        </span>
                                        <span className="ml-2 text-gray-700 italic">
                                          {zone.notes}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          )}

                        {/* Custom Panel Details */}
                        {/* {upgrade === "customPanel" &&
                          designData.upgrades && (
                            <div className="space-y-2 text-sm">
                              {designData.upgrades.props.customPanel.text && (
                                <div>
                                  <span className="text-gray-600">Text:</span>
                                  <span className="ml-2 font-medium">
                                    {designData.upgrades.props.customPanel.text}
                                  </span>
                                </div>
                              )}
                              {designData.upgrades.props.customPanel.image && (
                                <div>
                                  <span className="text-gray-600">Image:</span>
                                  <span className="ml-2 font-medium">
                                    Included
                                  </span>
                                </div>
                              )}
                            </div>
                          )} */}

                        {/* Cornerstones Details */}
                        {(upgrade === UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE ||
                          upgrade === UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE) &&
                          designData.upgrades.props.cornerstones?.type && (
                            <div className="text-sm">
                              <span className="text-gray-600">Type:</span>
                              <span className="ml-2 font-medium capitalize">
                                {designData.upgrades.props.cornerstones.type}
                              </span>
                            </div>
                          )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-1 text-xs font-medium text-gray-600 uppercase">
                  Photos
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {designData.photos.items.length}
                </div>
              </div>
              {/* <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-1 text-xs font-medium text-gray-600 uppercase">
                  Text Items
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {designData.upgrades.selected.length}
                </div>
              </div> */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3 text-xs font-medium text-gray-600 uppercase">
                  Colors
                </div>
                <div className="space-y-2">
                  {Object.entries(designData.colors || {})
                    .filter(([_, value]) => value)
                    .map(([key, value]) => {
                      if (key === "blocking") {
                        console.log(value);
                        return (
                          <div
                            key={key}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div
                              className="h-5 w-5 rounded border border-gray-300"
                              style={{ backgroundColor: value as string }}
                            />
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">
                              {value &&
                              typeof value === "object" &&
                              !value.random ? (
                                value.colors[0]
                              ) : typeof value === "object" ? (
                                <div className="flex items-center gap-1">
                                  {value &&
                                    value.colors.map(
                                      (color: string, index: number) => (
                                        <div
                                          key={index}
                                          className="h-5 w-5 rounded border border-gray-300"
                                          style={{ backgroundColor: color }}
                                        />
                                      ),
                                    )}
                                </div>
                              ) : (
                                value
                              )}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className="h-5 w-5 rounded border border-gray-300"
                            style={{ backgroundColor: value as string }}
                          />
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium">
                            {value?.toString()}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative max-h-[90vh] max-w-[90vw]"
            >
              <img
                src={zoomedImage}
                alt="Zoomed preview"
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 rounded-full bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-100"
                onClick={() => setZoomedImage(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
