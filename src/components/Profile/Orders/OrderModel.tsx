import { ORDER_STATUS } from "src/utils/defaultSettings";
import { X } from "lucide-react";
import getImageLink from "src/utils/getImageLink";
import { DesignData } from "src/types/design.types";
interface Props {
  order: any;
  onClose: () => void;
}

/* ---------- Small Helpers ---------- */
const Row = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex justify-between text-sm">
    <span className="text-neutral-600">{label}</span>
    <span className="font-medium">{value ?? "—"}</span>
  </div>
);

const ColorRow = ({ label, color }: { label: string; color?: string }) =>
  color ? (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-600">{label}</span>
      <span
        className="inline-block size-5 rounded-full border"
        style={{ backgroundColor: color }}
      />
    </div>
  ) : null;

/* ---------- Component ---------- */
const OrderModal = ({ order, onClose }: Props) => {
  const placedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : "—";
  console.log(order);

  return (
    <section className="max-h-[85vh] w-full overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-xl">
      {/* ================= Header ================= */}
      <div className="flex items-start justify-between border-b p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            Order #{order.id.slice(0, 8)}
          </h2>

          <p className="text-xs text-neutral-500">Placed on {placedDate}</p>

          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${
              ORDER_STATUS[order.status as keyof typeof ORDER_STATUS].color
            }`}
          >
            {order.status}
          </span>
        </div>

        <button
          className="rounded-full bg-white p-1 drop-shadow-xl"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      {/* ================= Content ================= */}
      <div className="space-y-6 p-6">
        {order.designs?.map((item: any, index: number) => {
          const design: DesignData = item.designData;

          return (
            <div
              key={item.id}
              className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            >
              {/* Item Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Item #{index + 1}
                </h3>

                {design?.price && (
                  <span className="text-sm font-medium text-neutral-800">
                    ${design.price}
                  </span>
                )}
              </div>
              {/* Content */}{" "}
              <div>
                <img
                  src={getImageLink(item?.previewImage)}
                  alt="Design"
                  className="mx-auto aspect-square max-h-72 border"
                />
              </div>
              {/* Basic Info */}
              <div className="space-y-2">
                <Row label="Design Name" value={design?.canvas.size} />
                <Row
                  label="Size"
                  value={
                    design?.canvas?.size
                      ? `${design.canvas.size} (${design.canvas.rows}×${design.canvas.cols})`
                      : undefined
                  }
                />
              </div>
              {/* Colors */}
              <div>
                <p className="font-semibold">Colors</p>

                <div className="space-y-2">
                  {Object.entries(design.colors || {})
                    .filter(([_, value]) => value)
                    .map(([key, value]) => {
                      if (key === "blocking") {
                        const isObject =
                          typeof value === "object" && value !== null;
                        const hasRandom =
                          isObject &&
                          "random" in value &&
                          (value as any).random;
                        const hasColors =
                          isObject &&
                          "colors" in value &&
                          Array.isArray((value as any).colors);

                        return (
                          <div key={key}>
                            <div style={{ backgroundColor: value as string }} />
                            {isObject && !hasRandom && hasColors ? (
                              <ColorRow
                                label={key}
                                color={(value as any).colors[0]}
                              />
                            ) : isObject && hasColors ? (
                              <div className="flex items-center gap-1">
                                {(value as any).colors.map(
                                  (color: string, idx: number) => (
                                    <ColorRow
                                      key={idx}
                                      label={key}
                                      color={color}
                                    />
                                  ),
                                )}
                              </div>
                            ) : typeof value === "string" ? (
                              value
                            ) : null}
                          </div>
                        );
                      } else {
                        return <ColorRow label={key} color={value as string} />;
                      }
                    })}
                </div>
              </div>
              {/* Upgrades */}
              {design.upgrades.selected.length > 0 && (
                <div>
                  <p className="font-semibold">Selected Elements:</p>
                  <div className="grid grid-cols-2 space-y-1">
                    {design.upgrades.selected.map((upgrade: string) => (
                      <span key={upgrade} className="text-sm">
                        {upgrade}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {(!order.designs || order.designs.length === 0) && (
          <p className="text-sm text-neutral-500">
            No items found in this order.
          </p>
        )}
      </div>
    </section>
  );
};

export default OrderModal;
