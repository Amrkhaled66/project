import placeholder from "../../../../public/placeholder.png";
import {statusColors} from "src/utils/defaultSettings";

interface Props {
  order: any;
  onClose: () => void;
}

const OrderModal = ({ order, onClose }: Props) => {
  const cart =
    typeof order.cartSnapshot === "string"
      ? JSON.parse(order.cartSnapshot)
      : order.cartSnapshot;

  const placedDate = new Date(order.createdAt).toLocaleDateString();


  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-neutral-200 p-6">
        <div className="space-y-1">
          <h2 id="order-modal-title" className="text-xl font-semibold">
            Order #{order.id}
          </h2>
          <p className="text-xs text-neutral-500">Placed on {placedDate}</p>

          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium mt-1 capitalize ${
              statusColors[order.status as keyof typeof statusColors] || "bg-neutral-100 text-neutral-700"
            }`}
          >
            {order.status}
          </span>
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
      <div className="p-6 space-y-8">
        {/* Design Preview */}
        <div>
          <p className="mb-2 text-sm font-medium text-neutral-700">Design Preview</p>

          <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
            <img
              src={order.designImage || placeholder}
              alt="Design"
              className="w-full object-cover max-h-72"
            />
          </div>
        </div>

        {/* Item Details */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Item Details</h3>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 space-y-3">
            {/* Row 1 */}
            <div className="flex justify-between text-sm text-neutral-700">
              <span>Size</span>
              <span className="font-medium">{cart.size?.name}</span>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between text-sm text-neutral-700">
              <span>Quantity</span>
              <span className="font-medium">{cart.quantity}</span>
            </div>

            {/* Border Color */}
            {cart.borderColor && (
              <div className="flex justify-between text-sm text-neutral-700">
                <span>Border Color</span>
                <span
                  className="size-5 rounded-full border inline-block"
                  style={{ backgroundColor: cart.borderColor }}
                />
              </div>
            )}

            {/* Blanket Color */}
            <div className="flex justify-between text-sm text-neutral-700">
              <span>Blanket Color</span>
              <span
                className="size-5 rounded-full border inline-block"
                style={{ backgroundColor: cart.color }}
              />
            </div>

            {/* Upgrades */}
            {cart.upgrades?.length > 0 && (
              <div>
                <span className="block text-sm text-neutral-700 mb-1">Upgrades</span>

                <div className="flex flex-wrap gap-2">
                  {cart.upgrades.map((u: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-[11px] bg-neutral-200 text-neutral-800"
                    >
                      {u.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm">
              <span className="text-neutral-700">Total Price</span>
              <span className="font-semibold text-neutral-900">${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderModal;
