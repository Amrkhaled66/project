import { useLatestOrder } from "src/hooks/queries/orders.queries";
import placeholder from "../../../../public/placeholder.png";
import Skeleton from "react-loading-skeleton";
import {
  PackageSearch 
} from "lucide-react";
import { steps } from "src/utils/defaultSettings";
export default function TrackOrder() {
  const { data: order, isLoading } = useLatestOrder();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton height={30} width={200} />
        <Skeleton className="mt-4 h-20" />
        <Skeleton className="mt-4 h-60" />
      </div>
    );
  }

  console.log(order)
if (!order) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col items-center text-center gap-3">
      <div className="rounded-full bg-neutral-100 p-4">
        <PackageSearch className="h-8 w-8 text-neutral-500" />
      </div>

      <h2 className="text-lg font-semibold">No Active Orders</h2>

      <p className="text-sm text-neutral-600 max-w-[240px]">
        Once you place an order, you’ll be able to track it here in real time.
      </p>
    </div>
  );
}

  const cart =
    typeof order.cartSnapshot === "string"
      ? JSON.parse(order.cartSnapshot)
      : order.cartSnapshot;

  const index = steps.findIndex((s) => s.key === order.status);
  const progress = (index / (steps.length - 1)) * 100;

  const image = order.designImage || placeholder;

  const placedDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-start gap-4 p-6">
        <img
          src={image}
          alt="Order"
          className="size-20 rounded-xl object-cover ring-1 ring-neutral-200"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-xl font-semibold">Order #{order.id}</h2>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                order.status === "delivered"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {steps[index]?.label}
            </span>
          </div>

          <p className="mt-1 text-sm text-neutral-600">Placed on {placedDate}</p>

          <p className="mt-2 line-clamp-2 text-sm text-neutral-800">
            {cart?.size?.name} — ${order.totalPrice}
          </p>
        </div>
      </div>

      {/* TRACKER */}
      <div className="border-t border-neutral-200 p-6">
        <h3 className="mb-4 text-sm font-semibold text-neutral-900">
          Order Status
        </h3>

        <div className="relative ml-10 h-72">
          {/* Static Track */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-neutral-200" />

          {/* Progress Fill */}
          <div
            className="absolute left-0 top-3 w-0.5 bg-neutral-900 rounded-full transition-all"
            style={{ height: `${progress}%` }}
          />

          {/* Steps */}
          <ul
            className="grid h-full relative"
            style={{ gridTemplateRows: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = i <= index;

              return (
                <li key={step.key} className="relative">
                  {/* Dot */}
                  <span
                    className={`absolute -left-[7px] top-1/2 size-3.5 -translate-y-1/2 rounded-full ring-2 ring-white shadow ${
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
                        {i === index
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

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t bg-neutral-50 p-4">
        <p className="text-xs text-neutral-600">Need help?</p>

        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800">
          Contact Support
        </button>
      </div>
    </div>
  );
}

