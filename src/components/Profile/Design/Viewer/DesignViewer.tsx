import { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

import {
  upgradePreservationPoints,
  type PreservationAxis,
  type UpgradeId,
} from "src/data/upgrades";

import PreservationAxisChip from "./PreservationAxisChip";
import PreservationProgress from "./PreservationProgress";
import {
  MAX_TOTAL_POINTS,
  PRESERVATION_AXIS_ORDER,
} from "./preservationViewer.config";

type DesignViewerProps = {
  selectedUpgrades: string[];
};

const DesignViewer = ({ selectedUpgrades }: DesignViewerProps) => {
  const scores = useMemo(() => {
    return PRESERVATION_AXIS_ORDER.reduce(
      (acc, axis) => {
        acc[axis] = selectedUpgrades.reduce((total, upgradeId) => {
          return (
            total +
            (upgradePreservationPoints[upgradeId as UpgradeId]?.[axis] ?? 0)
          );
        }, 0);

        return acc;
      },
      {} as Record<PreservationAxis, number>,
    );
  }, [selectedUpgrades]);

  const totalStrength = PRESERVATION_AXIS_ORDER.reduce(
    (sum, axis) => sum + scores[axis],
    0,
  );
  const progress = Math.min((totalStrength / MAX_TOTAL_POINTS) * 100, 100);

  return (
    <section className="mb-4 overflow-hidden rounded-[22px] border border-[color:rgba(0,32,81,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(235,243,255,0.92))] shadow-[0_10px_30px_rgba(0,32,81,0.06)]">
      <div className="px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-[14px] bg-[color:rgba(187,0,39,0.08)] p-2.5 text-[color:var(--color-secondary)]">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <p className="font-header text-[0.62rem] font-semibold tracking-[0.24em] text-[color:var(--color-secondary)] uppercase">
                Preservation Strength
              </p>
              <h2 className="font-header mt-1 text-lg font-semibold text-[color:var(--color-primary)] sm:text-xl">
                The three axes of preservation
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[color:rgba(0,32,81,0.08)] bg-white/85 px-3 py-1.5 shadow-[0_8px_18px_rgba(0,32,81,0.05)] lg:self-auto">
            <span className="font-subTitle text-[0.62rem] font-semibold tracking-[0.18em] text-[color:var(--color-mainProfile-600)] uppercase">
              Total
            </span>
            <span className="font-header text-lg font-bold text-[color:var(--color-primary)]">
              {totalStrength}
            </span>
          </div>
        </div>

        <PreservationProgress
          totalStrength={totalStrength}
          maxTotalPoints={MAX_TOTAL_POINTS}
          progress={progress}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESERVATION_AXIS_ORDER.map((axis, index) => (
            <PreservationAxisChip
              key={axis}
              axis={axis}
              score={scores[axis]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignViewer;
