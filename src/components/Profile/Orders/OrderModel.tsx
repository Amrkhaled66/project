import Order from "src/types/Order";
import placeholder from "../../../../public/placeholder.png";

interface Props {
  order: Order;
  onClose: () => void;
}

const OrderModal = ({ order, onClose }: Props) => {
  const { item } = order;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="w-full rounded-2xl border overflow-y-auto max-h-[80vh] border-neutral-200 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 id="order-modal-title" className="text-lg font-semibold">
            Order #{order.id}
          </h2>
          <p className="text-xs text-neutral-600">Placed on {order.date}</p>
          <p className="text-xs text-neutral-600">Status: {order.status}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-xl border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm hover:bg-neutral-50"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Design Preview */}
        {item.designImage && (
          <div>
            <p className="mb-1 text-sm font-medium text-neutral-700">Design Preview</p>
            <img
              src={placeholder}
              alt="Design"
              className="w-full max-h-64 rounded-xl object-cover border border-neutral-200"
            />
          </div>
        )}

        {/* Item Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900">Item Details</h3>
          <div className="flex items-center gap-4">
            <div
              className="size-14 rounded-lg bg-neutral-100 ring-1 ring-neutral-200"
              style={{ backgroundColor: item.color || "#eee" }}
              title={`Blanket Color: ${item.color}`}
            />
            <div className="flex-1 text-sm text-neutral-800 space-y-1">
              <p>Size: <span className="font-medium">{item.size}</span></p>
              <p>Quantity: <span className="font-medium">{item.quantity}</span></p>
              {item.borderColor && (
                <p>
                  Border Color:{" "}
                  <span
                    className="inline-block size-4 rounded-full border"
                    style={{ backgroundColor: item.borderColor }}
                  />
                </p>
              )}
              {item.upgrades.length > 0 && (
                <p>
                  Upgrades:{" "}
                  <span className="font-medium">
                    {item.upgrades.map((u) => u.name).join(", ")}
                  </span>
                </p>
              )}
              <p>Total Price: <span className="font-semibold">${item.totalPrice}</span></p>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <p className="text-sm text-neutral-600">
          Estimated Delivery:{" "}
          <span className="font-medium text-neutral-800">
            {order.estimatedDeliveryDate}
          </span>
        </p>

        {/* Payment Method */}
        <p className="text-sm text-neutral-600">
          Payment Option:{" "}
          <span className="font-medium text-neutral-800">{order.paymentOption}</span>
        </p>
      </div>
    </section>
  );
};

export default OrderModal;
