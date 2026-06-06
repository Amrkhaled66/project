import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type PreservationProgressProps = {
  label: string;
  value: number;
  maxValue: number;
  progress: number;
  emphasis?: "axis" | "total";
};

const PreservationProgress = ({
  label,
  value,
  maxValue,
  progress,
  emphasis = "axis",
}: PreservationProgressProps) => {
  const isTotal = emphasis === "total";
  const previousProgressRef = useRef(progress);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    if (isTotal && progress > previousProgressRef.current) {
      setIsIncreasing(true);
      const timeoutId = window.setTimeout(() => setIsIncreasing(false), 900);
      previousProgressRef.current = progress;
      return () => window.clearTimeout(timeoutId);
    }
    previousProgressRef.current = progress;
  }, [isTotal, progress]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[0.58rem] tracking-[0.14em] text-[color:var(--color-mainProfile-600)] uppercase">
        <span>{label}</span>
        <span>
          {value}/{maxValue}
        </span>
      </div>

      <div
        className={
          isTotal
            ? "relative overflow-visible py-1"
            : "relative overflow-hidden"
        }
      >
        {/* Layer 1 — mega atmospheric bloom */}
        {isTotal && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 rounded-full"
            initial={false}
            animate={{
              opacity: isIncreasing ? [0, 0.75, 0] : 0,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.08) 55%, transparent 100%)",
              filter: "blur(16px)",
            }}
          />
        )}

        {/* Layer 2 — mid halo */}
        {isTotal && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 rounded-full"
            initial={false}
            animate={{
              opacity: isIncreasing ? [0, 1, 0] : 0,
              scaleY: isIncreasing ? [0.8, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(201,162,39,0.38) 0%, rgba(201,162,39,0.18) 50%, transparent 100%)",
              filter: "blur(6px)",
            }}
          />
        )}

        <div
          className={
            isTotal
              ? "relative h-2.5 overflow-hidden rounded-full bg-[color:rgba(0,32,81,0.12)]"
              : "h-2 overflow-hidden rounded-full bg-[color:rgba(0,32,81,0.12)]"
          }
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
              filter:
                isTotal && isIncreasing
                  ? [
                      "brightness(1.5) saturate(1.2)",
                      "brightness(1.15) saturate(1.1)",
                      "brightness(1)",
                    ]
                  : "brightness(1)",
              boxShadow: isTotal
                ? isIncreasing
                  ? [
                      "0 0 8px 2px rgba(201,162,39,0.95), 0 0 20px 5px rgba(201,162,39,0.55), 0 0 40px 8px rgba(201,162,39,0.25)",
                      "0 0 5px 1px rgba(201,162,39,0.55), 0 0 12px 3px rgba(201,162,39,0.28)",
                      "0 0 0 rgba(0,0,0,0)",
                    ]
                  : "0 0 0 rgba(0,0,0,0)"
                : "0 0 0 rgba(0,0,0,0)",
              transition: { duration: 0.85, ease: "easeOut" },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              background: isTotal
                ? "linear-gradient(90deg, var(--color-secondary), var(--color-primary), #c9a227)"
                : "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary-container))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreservationProgress;