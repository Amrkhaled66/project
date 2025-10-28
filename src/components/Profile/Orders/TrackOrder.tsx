import React from "react";
import orders from "src/data/orders";
import placeholder from "../../../../public/placeholder.png";

type Order = {
  id: string | number;
  date: string;
  status?: string; // "placed" | "confirmed" | "packed" | "shipped" | "out_for_delivery" | "delivered"
  eta?: string; // e.g. "Oct 10, 2025"
  items?: Array<{ title?: string; qty?: number; image?: string }>;
};

const steps = [
  { key: "placed", label: "Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
] as const;

function stepIndexFromStatus(status?: string) {
  const idx = steps.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 1; // default to "Confirmed" if unknown
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function progressPercent(currentIndex: number, total: number) {
  // Grow the inner line to reach the current step position.
  if (total <= 1) return 0;
  return clamp01(currentIndex / (total - 1)) * 100;
}

/* ---------- Tiny inline SVG icons (no external deps) ---------- */
type IconProps = { className?: string };
const ReceiptIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 3h10l2 2v14l-2-1-2 1-2-1-2 1-2-1-2 1V5l2-2z" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
);
const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const BoxIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5v-7z" />
    <path d="M12 3v18M3 8.5l9 5.5 9-5.5" />
  </svg>
);
const TruckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 7h11v8H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="17.5" cy="17.5" r="1.5" />
  </svg>
);
const NavIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2v20M2 12h20" />
    <path d="M12 6l3 6-3 6-3-6z" />
  </svg>
);
const HomeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const ICONS: Record<string, React.FC<IconProps>> = {
  placed: ReceiptIcon,
  confirmed: CheckIcon,
  packed: BoxIcon,
  shipped: TruckIcon,
  out_for_delivery: NavIcon,
  delivered: HomeIcon,
};
/* -------------------------------------------------------------- */

const TrackOrder: React.FC = () => {
  const order: Order | undefined = orders?.[0];

  if (!order) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">No active orders</h2>
          <p className="text-sm text-neutral-600">
            Once you place an order, you’ll be able to track it here in real time.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = stepIndexFromStatus(order.status);
  const itemImage = order.items?.[0]?.image || (placeholder as unknown as string);
  const itemTitle = order.items?.[0]?.title || "Your items";
  const pct = progressPercent(currentIndex, steps.length);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 p-6">
        <img
          src={itemImage}
          alt="Order item"
          className="size-20 rounded-xl object-cover ring-1 ring-neutral-200"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-semibold">Order #{order.id}</h2>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                currentIndex >= steps.length - 1
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {steps[currentIndex]?.label || "Confirmed"}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-600">Placed on {order.date}</p>
          <p className="mt-1 text-sm text-neutral-600">
            {order.eta ? `Estimated delivery: ${order.eta}` : "We’ll share an ETA soon"}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-800">{itemTitle}</p>
        </div>
      </div>

      {/* Simplified vertical tracker */}
      <div className="border-t border-neutral-200 p-6">
        <h3 className="mb-4 text-sm font-semibold text-neutral-900">Order Status</h3>

        <div className="relative">
          {/* Track area; adjust height to your layout */}
          <div className="relative ml-10 h-72 md:h-80">
            {/* Outer track (static) */}
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-neutral-200" />

            {/* Inner progress (only height grows) */}
            <div
              className="absolute left-0 top-3 w-0.5 rounded-full bg-neutral-900 transition-[height] duration-500 ease-out"
              style={{ height: `calc(${pct}% - 0px)` }}
              aria-hidden
            />

            {/* Steps (labels + icons to the side) */}
            <ul
              className="grid h-full"
              style={{ gridTemplateRows: `repeat(${steps.length}, 1fr)` }}
            >
              {steps.map((step, idx) => {
                const isDone = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const Icon = ICONS[step.key] ?? ReceiptIcon;

                return (
                  <li key={step.key} className="relative">
                    {/* Dot pinned to the track */}
                    <span
                      className={[
                        "absolute -left-2 top-1/2 size-3.5 -translate-y-1/2 rounded-full ring-2 ring-white shadow",
                        isDone || isCurrent ? "bg-neutral-900" : "bg-neutral-300",
                      ].join(" ")}
                      aria-hidden
                    />

                    {/* Icon + Title to the right of the line */}
                    <div className="ml-4 flex items-center gap-2">
                      <span
                        className={[
                          "flex size-7 items-center justify-center rounded-lg border",
                          isDone || isCurrent
                            ? "border-neutral-300 bg-white text-neutral-900"
                            : "border-neutral-200 bg-neutral-50 text-neutral-400",
                        ].join(" ")}
                        aria-hidden
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      <div className="flex flex-col">
                        <span
                          className={[
                            "text-sm font-medium",
                            isDone || isCurrent ? "text-neutral-900" : "text-neutral-500",
                          ].join(" ")}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {isCurrent ? "in progress" : isDone ? "completed" : "pending"}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50/70 p-4">
        <div className="text-xs text-neutral-600">Need help with this order?</div>
        <button
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 active:scale-[.99]"
          onClick={() => {
            // open support widget, or navigate to support
          }}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;
