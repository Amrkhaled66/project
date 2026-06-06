import { useEffect, useMemo, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "warning";
type ToastPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end";

type ToastItem = {
  id: number;
  title: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
};

type ToastContainerProps = {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
  top: "top-5 left-1/2 -translate-x-1/2",
  "top-start": "top-5 left-5",
  "top-end": "top-5 right-5",
  bottom: "bottom-5 left-1/2 -translate-x-1/2",
  "bottom-start": "bottom-5 left-5",
  "bottom-end": "bottom-5 right-5",
};

const TONE_STYLES: Record<
  ToastType,
  {
    accent: string;
    badge: string;
    ring: string;
    icon: typeof CheckCircle2;
    label: string;
  }
> = {
  success: {
    accent: "from-primary via-primary to-primary-container",
    badge: "bg-primary/10 text-primary",
    ring: "ring-primary/15",
    icon: CheckCircle2,
    label: "Success",
  },
  error: {
    accent: "from-secondary via-secondary to-[#8f1230]",
    badge: "bg-secondary/10 text-secondary",
    ring: "ring-secondary/15",
    icon: XCircle,
    label: "Error",
  },
  warning: {
    accent: "from-amber-500 via-amber-500 to-amber-600",
    badge: "bg-amber-50 text-amber-700",
    ring: "ring-amber-200",
    icon: AlertTriangle,
    label: "Warning",
  },
};

const toastStore = {
  listeners: new Set<(toasts: ToastItem[]) => void>(),
  toasts: [] as ToastItem[],
  nextId: 1,
  push(title: string, type: ToastType, position: ToastPosition, duration = 1800) {
    const toast: ToastItem = {
      id: this.nextId++,
      title,
      type,
      position,
      duration,
    };

    this.toasts = [...this.toasts, toast];
    this.emit();

    window.setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  },
  remove(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.emit();
  },
  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.add(listener);
    listener(this.toasts);

    return () => {
      this.listeners.delete(listener);
    };
  },
  emit() {
    this.listeners.forEach((listener) => listener(this.toasts));
  },
};

let root: Root | null = null;
let host: HTMLDivElement | null = null;

const groupToastsByPosition = (toasts: ToastItem[]) =>
  toasts.reduce<Record<ToastPosition, ToastItem[]>>(
    (groups, toast) => {
      groups[toast.position].push(toast);
      return groups;
    },
    {
      top: [],
      "top-start": [],
      "top-end": [],
      bottom: [],
      "bottom-start": [],
      "bottom-end": [],
    },
  );

const ToastCard = ({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: number) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const tone = TONE_STYLES[toast.type];
  const Icon = tone.icon;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_18px_40px_rgba(0,32,81,0.16)] ring-1 backdrop-blur-md transition-all duration-300 ${
        tone.ring
      } ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-[0.98] opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${tone.accent}`} />
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="absolute top-3 right-3 rounded-full p-1 text-subTitle/55 transition hover:bg-black/5 hover:text-subTitle"
        aria-label="Close toast"
      >
        <span className="block text-sm leading-none">x</span>
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div
          className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.badge}`}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.badge}`}
            >
              {tone.label}
            </span>
          </div>

          <p className="text-sm font-semibold leading-5 text-subTitle">
            {toast.title}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mainProfile/60">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone.accent}`}
          style={{
            animation: `toast-progress ${toast.duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

const ToastViewport = ({ toasts, onRemove }: ToastContainerProps) => {
  const grouped = useMemo(() => groupToastsByPosition(toasts), [toasts]);

  return (
    <>
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      {Object.entries(grouped).map(([position, items]) => {
        if (items.length === 0) {
          return null;
        }

        return (
          <div
            key={position}
            className={`pointer-events-none fixed z-[9999] flex w-[min(92vw,24rem)] flex-col gap-3 ${POSITION_CLASSES[position as ToastPosition]}`}
          >
            {items.map((toast) => (
              <ToastCard key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
          </div>
        );
      })}
    </>
  );
};

const ensureToastRoot = () => {
  if (root || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  host = document.createElement("div");
  host.id = "app-toast-root";
  document.body.appendChild(host);
  root = createRoot(host);
  root.render(
    <ToastRenderer />,
  );
};

const ToastRenderer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>(toastStore.toasts);

  useEffect(() => toastStore.subscribe(setToasts), []);

  return <ToastViewport toasts={toasts} onRemove={(id) => toastStore.remove(id)} />;
};

export default function Toast(
  title: string,
  type: ToastType,
  _background?: string,
  position: ToastPosition = "top",
) {
  ensureToastRoot();
  toastStore.push(title, type, position);
}
