import { ORDER_STATUS } from "src/utils/defaultSettings";
import { X } from "lucide-react";
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
    console.log(order)

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
              ORDER_STATUS[
                order.status as keyof typeof ORDER_STATUS
              ].color
            }`}
          >
            {order.status}
          </span>
        </div>

        <button className="p-1 drop-shadow-xl bg-white rounded-full" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {/* ================= Content ================= */}
      <div className="space-y-6 p-6">
        {order.items?.map((item: any, index: number) => {
          const design = item.designSnapshot;

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
                  src={import.meta.env.VITE_API_URL + design?.previewImage}
                  alt="Design"
                  className="mx-auto aspect-square max-h-72 border"
                />
              </div>
              {/* Basic Info */}
              <div className="space-y-2">
                <Row label="Design Name" value={design?.name} />

                <Row
                  label="Size"
                  value={
                    design?.canvas?.size
                      ? `${design.canvas.size.name} (${design.canvas.size.rows}×${design.canvas.size.cols})`
                      : undefined
                  }
                />
              </div>
              {/* Colors */}
              <div className="space-y-2">
                <ColorRow
                  label="Blanket Color"
                  color={design?.colors?.blanket}
                />
                <ColorRow label="Border Color" color={design?.colors?.border} />
              </div>
              {/* Embroidery */}
              {design?.upgrades?.props?.embroidery?.zones?.length > 0 && (
                <div>
                  <p className="mb-1 text-sm font-medium">Embroidery</p>

                  <ul className="space-y-1 text-xs text-neutral-700">
                    {design.upgrades.props.embroidery.zones.map((zone: any) => (
                      <li key={zone.id}>
                        <span className="font-medium">{zone.id}</span>:{" "}
                        {zone.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {(!order.items || order.items.length === 0) && (
          <p className="text-sm text-neutral-500">
            No items found in this order.
          </p>
        )}
      </div>
    </section>
  );
};

export default OrderModal;
