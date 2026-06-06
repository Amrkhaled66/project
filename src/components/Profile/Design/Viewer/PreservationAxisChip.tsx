import { motion } from "framer-motion";

import type { PreservationAxis } from "src/data/upgrades";

import PreservationProgress from "./PreservationProgress";
import { preservationAxisVisuals } from "./preservationViewer.config";

type PreservationAxisChipProps = {
  axis: PreservationAxis;
  score: number;
  maxScore: number;
  progress: number;
  contributors: string[];
  index: number;
};

const PreservationAxisChip = ({
  axis,
  score,
  maxScore,
  progress,
  contributors,
  index,
}: PreservationAxisChipProps) => {
  const styles = preservationAxisVisuals[axis];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="rounded-[18px] border border-white/90 bg-white/88 p-3 shadow-[0_8px_20px_rgba(0,32,81,0.06)]"
    >
      <div className="flex items-start gap-2.5">
        <div
          className="rounded-[12px] p-2"
          style={{
            backgroundColor: styles.panel,
            color: styles.fill,
          }}
        >
          <span className="block size-4">{styles.icon}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-header text-[0.56rem] font-semibold tracking-[0.16em] text-[color:var(--color-mainProfile-600)] uppercase">
                Axis
              </p>
              <h3 className="font-header mt-0.5 text-[0.82rem] font-semibold text-[color:var(--color-primary)] sm:text-sm">
                {axis}
              </h3>
            </div>

            <div className="text-right">
              <p className="font-header text-lg font-bold text-[color:var(--color-primary)]">
                {score}
              </p>
              <p className="font-subTitle text-[0.56rem] tracking-[0.14em] text-[color:var(--color-mainProfile-600)] uppercase">
                pts
              </p>
            </div>
          </div>

          <div className="mt-2">
            <PreservationProgress
              label="meter"
              value={score}
              maxValue={maxScore}
              progress={progress}
            />
          </div>

          <div className="mt-2">
            <p className="font-subTitle text-[0.56rem] font-semibold tracking-[0.14em] text-[color:var(--color-mainProfile-600)] uppercase">
              Contributors
            </p>
            <p className="mt-1 line-clamp-2 text-[0.75rem] leading-5 text-[color:var(--color-primary)]">
              {contributors.length > 0 ? contributors.join(" • ") : "None yet."}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PreservationAxisChip;
