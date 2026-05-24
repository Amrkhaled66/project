import { motion } from "framer-motion";

import type { PreservationAxis } from "src/data/upgrades";

import { preservationAxisVisuals } from "./preservationViewer.config";

type PreservationAxisChipProps = {
  axis: PreservationAxis;
  score: number;
  index: number;
};

const PreservationAxisChip = ({
  axis,
  score,
  index,
}: PreservationAxisChipProps) => {
  const styles = preservationAxisVisuals[axis];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/80 px-3 py-2 shadow-[0_6px_16px_rgba(0,32,81,0.05)]"
    >
      <div
        className="rounded-full p-2"
        style={{
          backgroundColor: styles.panel,
          color: styles.fill,
        }}
      >
        <span className="block size-4">{styles.icon}</span>
      </div>
      <span className="font-header text-[0.68rem] font-semibold tracking-[0.14em] text-[color:var(--color-primary)] uppercase">
        {axis}
      </span>
      <span className="font-header text-sm font-bold text-[color:var(--color-primary)]">
        {score}
      </span>
    </motion.div>
  );
};

export default PreservationAxisChip;
