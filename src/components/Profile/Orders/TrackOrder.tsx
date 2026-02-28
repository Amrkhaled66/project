import { useLatestOrder } from "src/hooks/queries/orders.queries";
import placeholder from "../../../../public/placeholder.png";
import Skeleton from "react-loading-skeleton";
import { PackageSearch } from "lucide-react";
import { ORDER_STATUS } from "src/utils/defaultSettings";
import priceFormmater from "src/utils/priceFormmater";
import getImageLink from "src/utils/getImageLink";
import Button from "src/components/ui/Button";
import Model from "src/components/ui/Model";
import OrderModal from "./OrderModel";
import { useState } from "react";
export default function TrackOrder() {
  const { data: order, isLoading } = useLatestOrder();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  /* -------------------- LOADING -------------------- */
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton height={30} width={200} />
        <Skeleton className="mt-4 h-20" />
        <Skeleton className="mt-4 h-60" />
      </div>
    );
  }

  /* -------------------- EMPTY -------------------- */
  if (!order) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <div className="rounded-full bg-neutral-100 p-4">
          <PackageSearch className="h-8 w-8 text-neutral-500" />
        </div>

        <h2 className="text-lg font-semibold">No Active Orders</h2>

        <p className="max-w-[240px] text-sm text-neutral-600">
          Once you place an order, you’ll be able to track it here in real time.
        </p>
      </div>
    );
  }

  /* -------------------- DERIVED DATA -------------------- */

  // Build steps dynamically from enum UI map
  const steps = Object.entries(ORDER_STATUS)
    .filter(([status]) => !["CANCELLED", "REFUNDED"].includes(status))
    .sort(([, a], [, b]) => a.stepOrder - b.stepOrder)
    .map(([key, config]) => ({
      key,
      ...config,
    }));

  // Current step index
  const currentIndex = steps.findIndex((step) => step.key === order.status);

  // Progress percentage
  const progress =
    currentIndex >= 0 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  const image = order.designs[0]?.previewImage || placeholder;

  const placedDate = new Date(order.createdAt).toLocaleDateString();

  const statusUI = ORDER_STATUS[order.status];

  /* -------------------- UI -------------------- */
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* ==================== HEADER ==================== */}
      <div className="flex items-start gap-4 p-6">
        <img
          src={getImageLink(image)}
          alt="Order"
          className="size-20 object-cover ring-1 ring-neutral-200"
        />

        <div className="w-full min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="w-1/2 font-semibold">Order #{order.id}</h2>

            <div className="flex flex-col gap-2">
              {statusUI && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-center text-[10px] font-medium text-nowrap ${statusUI.color}`}
                >
                  {statusUI.label}
                </span>
              )}
              <Button
                variant="primary"
                onClick={() => setOpenOrderId(order.id)}
                className="text-xs"
              >
                View
              </Button>
            </div>
          </div>

          <p className="mt-1 text-sm text-neutral-600">
            Placed on {placedDate}
          </p>

          <p className="mt-2 line-clamp-2 text-sm text-neutral-800">
            {priceFormmater(order.totalPrice)}
          </p>
        </div>
      </div>

      {/* ==================== TRACKER ==================== */}
      <div className="border-t border-neutral-200 p-6">
        <h3 className="mb-4 text-sm font-semibold text-neutral-900">
          Order Status
        </h3>

        <div className="relative ml-10 h-72">
          {/* Static Track */}
          <div className="absolute top-3 bottom-3 left-0 w-0.5 bg-neutral-200" />

          {/* Progress Fill */}
          <div
            className="absolute top-3 left-0 w-0.5 rounded-full bg-neutral-900 transition-all"
            style={{ height: `${progress}%` }}
          />

          {/* Steps */}
          <ul
            className="relative grid h-full"
            style={{ gridTemplateRows: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = i <= currentIndex;

              return (
                <li key={step.key} className="relative">
                  {/* Dot */}
                  <span
                    className={`absolute top-1/2 -left-[7px] size-3.5 -translate-y-1/2 rounded-full shadow ring-2 ring-white ${
                      done ? "bg-neutral-900" : "bg-neutral-300"
                    }`}
                  />

                  {/* Label + Icon */}
                  <div className="ml-4 flex items-center gap-2">
                    <span
                      className={`flex size-7 items-center justify-center rounded-lg border ${
                        done
                          ? "border-neutral-300 bg-white text-neutral-900"
                          : "border-neutral-200 bg-neutral-50 text-neutral-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          done ? "text-neutral-900" : "text-neutral-500"
                        }`}
                      >
                        {step.label}
                      </span>

                      <span className="text-xs text-neutral-500">
                        {i === currentIndex
                          ? "In progress"
                          : done
                            ? "Completed"
                            : "Pending"}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Model isOpen={!!openOrderId} onClose={() => setOpenOrderId(null)}>
        {order && (
          <OrderModal order={order} onClose={() => setOpenOrderId(null)} />
        )}
      </Model>

      {/* ==================== FOOTER ==================== */}
      {/* <div className="flex items-center justify-between border-t bg-neutral-50 p-4">
        <p className="text-xs text-neutral-600">Need help?</p>

        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800">
          Contact Support
        </button>
      </div> */}
    </div>
  );
}
