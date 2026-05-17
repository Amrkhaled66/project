import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import {
  DESIGN_VIEWER_SHOW_EVENT,
  type DesignViewerDetail,
  type DesignViewerTone,
} from "src/utils/designViewer";

const toneStyles: Record<
  DesignViewerTone,
  {
    accent: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    barColor: string;
  }
> = {
  success: {
    accent: "Applied",
    icon: CheckCircle2,
    iconColor: "#4ade80",   // green — kept distinct for clarity
    barColor: "#4ade80",
  },
  warning: {
    accent: "Attention",
    icon: TriangleAlert,
    iconColor: "#fbbf24",   // amber
    barColor: "#fbbf24",
  },
  error: {
    accent: "Issue",
    icon: AlertCircle,
    iconColor: "#ef4444",   // brand red
    barColor: "#ef4444",
  },
  info: {
    accent: "Update",
    icon: Info,
    iconColor: "#93c5fd",   // light blue — complements navy
    barColor: "#ef4444",    // brand red for info bar
  },
};

const DesignViewer = () => {
  const [viewer, setViewer] = useState<DesignViewerDetail | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearViewerTimer = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleShow = (event: Event) => {
      const customEvent = event as CustomEvent<DesignViewerDetail>;
      const nextViewer = customEvent.detail;

      clearViewerTimer();
      setViewer(nextViewer);

      timeoutRef.current = window.setTimeout(() => {
        setViewer((current) =>
          current?.id === nextViewer.id ? null : current,
        );
      }, nextViewer.duration);
    };

    window.addEventListener(DESIGN_VIEWER_SHOW_EVENT, handleShow);

    return () => {
      clearViewerTimer();
      window.removeEventListener(DESIGN_VIEWER_SHOW_EVENT, handleShow);
    };
  }, []);

  const tone = viewer ? toneStyles[viewer.tone] : toneStyles.success;
  const Icon = viewer ? tone.icon : Sparkles;

  return (
    <div className="pointer-events-none fixed top-5 left-1/2 z-[120] flex w-full -translate-x-1/2 justify-center px-4">
      <AnimatePresence mode="wait">
        {viewer && (
          <motion.div
            key={viewer.id}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
            className="relative w-full max-w-sm overflow-hidden rounded-lg"
            style={{
              background: "#002051",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* Left accent bar — brand red */}
            <div
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ backgroundColor: "#ef4444" }}
            />

            {/* Subtle top shimmer */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex items-center gap-3 pl-5 pr-4 py-3.5">
              {/* Icon container */}
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-md"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Icon className="size-4" style={{ color: tone.iconColor }} />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {/* Brand-red label */}
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#ef4444" }}
                  >
                    {tone.accent}
                  </span>
                  <span
                    className="size-1 rounded-full"
                    style={{ backgroundColor: "#ef4444", opacity: 0.6 }}
                  />
                </div>
                <p className="truncate  font-medium leading-snug text-white/90">
                  {viewer.title}
                </p>
              </div>
            </div>

            {/* Progress bar — brand red */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px]"
              style={{ backgroundColor: "#ef4444", opacity: 0.4 }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: viewer.duration / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignViewer;