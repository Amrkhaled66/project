import { useState } from "react";
import placeholder from "../../../../public/placeholder.png";
import MainDashButton from "src/components/ui/MainDashButton";
import { Link } from "react-router-dom";
import Model from "src/components/ui/Model";
import OrderModal from "./OrderModel";

import { useLatestThreeOrders } from "src/hooks/queries/orders.queries";
import Skeleton from "react-loading-skeleton";
import { statusColors } from "src/utils/defaultSettings";

const OrderSkeleton = () => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/60 p-3">
      <Skeleton height={64} width={64} className="rounded-lg" />

      <div className="min-w-0 flex-1">
        <Skeleton height={14} width={"40%"} />

        <div className="mt-1">
          <Skeleton height={12} width={"60%"} />
        </div>

        <div className="mt-1">
          <Skeleton height={12} width={"50%"} />
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({
  order,
  onOpen,
}: {
  order: any;
  onOpen: (id: number) => void;
}) => {
  return (
    <div
      key={order.id}
      className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/60 p-3 transition-colors hover:bg-neutral-50"
    >
      <img
        src={order.designImage || placeholder}
        alt="Order item"
        className="size-16 rounded-lg object-cover ring-1 ring-neutral-200"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold">#{order.id}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              statusColors[order.status as keyof typeof statusColors]
            }`}
          >
            {order.status?.replaceAll("_", " ")}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-neutral-600">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>

        {order.cartSnapshot?.size && (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-800">
            Size: {order.cartSnapshot.size.name}, Quantity:{" "}
            {order.cartSnapshot.quantity || 1}
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

  const {
    data: latestOrders = [],
    isLoading,
    isError,
  } = useLatestThreeOrders();

  const selectedOrder =
    latestOrders.find((order: any) => order.id === openOrderId) || null;

  return (
    <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
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

      {/* ⚡ LOADING STATE — Skeleton */}
      {isLoading && (
        <div className="flex max-h-[520px] flex-col gap-3 overflow-auto pr-1">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      )}

      {/* ❌ ERROR STATE */}
      {isError && (
        <p className="text-sm text-red-500">Failed to load orders.</p>
      )}

      {/* ✅ DATA STATE */}
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

      {!(latestOrders.length === 0) && (
        <Link to="/profile/user-profile" className="mt-4 block">
          <MainDashButton text="View All Orders" />
        </Link>
      )}

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
