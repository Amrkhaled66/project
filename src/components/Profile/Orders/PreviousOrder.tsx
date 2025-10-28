// PreviousOrder.tsx
import { useState } from "react";
import orders from "src/data/orders";
import placeholder from "../../../../public/placeholder.png";
import MainDashButton from "src/components/ui/MainDashButton";
import { Link } from "react-router-dom";
import Model from "src/components/ui/Model";
import OrderModal from "./OrderModel";

const statusColor = (status?: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

const OrderCard = ({
  order,
  onOpen,
}: {
  order: (typeof orders)[number];
  onOpen: (id: number) => void;
}) => {
  return (
    <div
      key={order.id}
      className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/60 p-3 transition-colors hover:bg-neutral-50"
    >
      <img
        src={order.item.designImage || placeholder}
        alt="Order item"
        className="size-16 rounded-lg object-cover ring-1 ring-neutral-200"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold">#{order.id}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(order.status)}`}
          >
            {order.status.replaceAll("_", " ")}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-neutral-600">
          Placed on {order.date}
        </p>
        {order.item?.size && (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-800">
            Size: {order.item.size}, Quantity: {order.item.quantity}
          </p>
        )}
      </div>
      <button
        className="translate-x-1 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700 opacity-0 shadow-sm transition-all group-hover:translate-x-0 group-hover:opacity-100"
        onClick={() => onOpen(order.id)}
        aria-label={`View order ${order.id}`}
      >
        View
      </button>
    </div>
  );
};

const PreviousOrder = () => {
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const selectedOrder = orders.find((o) => o.id === openOrderId) || null;

  return (
    <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Previous Orders</h2>
        <span className="rounded-lg bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
          {orders.length} total
        </span>
      </div>

      <div className="flex max-h-[520px] flex-col gap-3 overflow-auto pr-1">
        {orders.slice(0,3).map((order) => (
          <OrderCard key={order.id} order={order} onOpen={setOpenOrderId} />
        ))}
      </div>

      <Link to="/profile/user-profile" className="mt-4 block">
        <MainDashButton text="View All Orders" />
      </Link>

      <Model isOpen={!!selectedOrder} onClose={() => setOpenOrderId(null)}>
        {selectedOrder && (
          <OrderModal order={selectedOrder} onClose={() => setOpenOrderId(null)} />
        )}
      </Model>
    </aside>
  );
};

export default PreviousOrder;
