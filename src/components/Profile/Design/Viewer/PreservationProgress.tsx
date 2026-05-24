import { motion } from "framer-motion";

type PreservationProgressProps = {
  totalStrength: number;
  maxTotalPoints: number;
  progress: number;
};

const PreservationProgress = ({
  totalStrength,
  maxTotalPoints,
  progress,
}: PreservationProgressProps) => {
  return (
    <>
      <div className="mt-3 mb-3 flex items-center justify-between text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mainProfile-600)] uppercase">
        <span>Combined Progress</span>
        <span>
          {totalStrength}/{maxTotalPoints}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[color:rgba(0,32,81,0.12)]">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary-container))",
          }}
        />
      </div>
    </>
  );
};

export default PreservationProgress;
