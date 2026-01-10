import TrackOrder from "src/components/Profile/Orders/TrackOrder";
import PreviousOrder from "src/components/Profile/Orders/PreviousOrder";

import { useLatestOrder } from "src/hooks/queries/orders.queries";
import Skeleton from "react-loading-skeleton";

const Orders = () => {
  const { data: lastOrder, isLoading } = useLatestOrder();

  return (
    <div className="space-y-6">
      {/* Fancy header */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50">
        <div className="absolute inset-0 -z-10 opacity-40 blur-2xl [background:radial-gradient(120px_120px_at_20%_10%,#06b6d4,transparent),radial-gradient(160px_160px_at_80%_20%,#9333ea,transparent),radial-gradient(140px_140px_at_50%_100%,#22c55e,transparent)]" />

        <div className="flex flex-col items-start gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Order Tracking
            </h1>
            <p className="text-sm text-neutral-600">
              Track your latest order and browse your past purchases.
            </p>
          </div>

          {/* Right side: last order summary */}
          {isLoading ? (
            <Skeleton width={180} height={32} />
          ) : lastOrder ? (
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/70 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <span className="font-medium">Last order:</span>
              {/* <span className="rounded-lg bg-neutral-900 px-2 py-1 text-white">
                #{lastOrder.id}
              </span> */}
              <span className="text-neutral-500">
                • Placed on {new Date(lastOrder.createdAt).toLocaleDateString()}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TrackOrder />
        <PreviousOrder />
      </div>
    </div>
  );
};

export default Orders;
