import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import MainDashButton from "src/components/ui/MainDashButton";
import Model from "src/components/ui/Model";
import OrderModal from "./OrderModel";

import { useLatestThreeOrders } from "src/hooks/queries/orders.queries";
import { ORDER_STATUS } from "src/utils/defaultSettings";

/* ---------------- Skeleton ---------------- */
const OrderSkeleton = () => (
  <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/60 p-3">
    <Skeleton height={64} width={64} className="rounded-lg" />
    <div className="flex-1 space-y-2">
      <Skeleton height={14} width="40%" />
      <Skeleton height={12} width="60%" />
      <Skeleton height={12} width="50%" />
    </div>
  </div>
);

/* ---------------- Order Card ---------------- */
const OrderCard = ({
  order,
  onOpen,
}: {
  order: any;
  onOpen: (id: string) => void;
}) => {
  const item = order.items?.[0];
  const design = item?.designSnapshot;

  return (
    <div className="group relative flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/60 p-3 transition hover:bg-neutral-50">
      <img
        src={design?.previewImage}
        alt="Order preview"
        className="size-16 rounded-lg object-cover ring-1 ring-neutral-200"
      />

      <div className="min-w-0 flex-1">
        <div className="flex w-full items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">
            #{order.id.slice(0, 8)}
          </h3>

          <span
            className={`rounded-full px-2 py-0.5 text-center text-[8px] font-medium ${
              ORDER_STATUS[order.status as keyof typeof ORDER_STATUS]?.color
            }`}
          >
            {order.status.replaceAll("_", " ")}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-neutral-600">
          Placed on
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "—"}
        </p>

        {design?.canvas?.size && (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-800">
            Size: {design.canvas.size.name} ({design.canvas.size.rows}×
            {design.canvas.size.cols})
          </p>
        )}
      </div>

      <button
        onClick={() => onOpen(order.id)}
        className="absolute right-2 bottom-0 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700 opacity-0 transition group-hover:opacity-100"
      >
        View
      </button>
    </div>
  );
};

/* ---------------- Main Component ---------------- */
const PreviousOrder = () => {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const {
    data: latestOrders = [],
    isLoading,
    isError,
  } = useLatestThreeOrders();

  const selectedOrder =
    latestOrders.find((o: any) => o.id === openOrderId) || null;

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Previous Orders</h2>

        {isLoading ? (
          <Skeleton width={40} height={18} />
        ) : (
          <span className="rounded-lg bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
            {latestOrders.length} total
          </span>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-500">Failed to load orders.</p>
      )}

      {/* Data */}
      {!isLoading && !isError && (
        <div className="flex max-h-[520px] flex-col gap-3 overflow-auto pr-1">
          {latestOrders.map((order: any) => (
            <OrderCard key={order.id} order={order} onOpen={setOpenOrderId} />
          ))}

          {latestOrders.length === 0 && (
            <p className="text-xs text-neutral-500">No previous orders yet.</p>
          )}
        </div>
      )}

      {/* View All */}
      {latestOrders.length > 0 && (
        <Link to="/profile/user-profile" className="mt-4 block">
          <MainDashButton text="View All Orders" />
        </Link>
      )}

      {/* Modal */}
      <Model isOpen={!!selectedOrder} onClose={() => setOpenOrderId(null)}>
        {selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setOpenOrderId(null)}
          />
        )}
      </Model>
    </aside>
  );
};

export default PreviousOrder;
