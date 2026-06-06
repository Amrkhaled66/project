import { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

import {
  upgradeMap,
  upgradePreservationProfiles,
  type PreservationAxis,
  type UpgradeId,
} from "src/data/upgrades";

import PreservationAxisChip from "./PreservationAxisChip";
import PreservationProgress from "./PreservationProgress";
import DesignViewerFooter from "./DesignViewerFooter";
import {
  AXIS_MAX_SCORES,
  PRESERVATION_AXIS_ORDER,
  TOTAL_AUTHORITY_TARGET,
  TOTAL_AXIS_WEIGHT,
  TOTAL_INFLUENCE_WEIGHT,
} from "./preservationViewer.config";

type DesignViewerProps = {
  selectedUpgrades: string[];
  price: number;
  inCart: boolean;
  onAddToCart: () => void;
};

type SelectedElementContribution = {
  id: UpgradeId;
  name: string;
  axes: Partial<Record<PreservationAxis, number>>;
  totalInfluence: number;
  authorityBonus: number;
  autoAppliedByName?: string;
};

const percentFromRatio = (value: number) => Math.min(value * 100, 100);

const formatContributionSummary = (
  axes: Partial<Record<PreservationAxis, number>>,
) => {
  const parts = PRESERVATION_AXIS_ORDER.flatMap((axis) => {
    const value = axes[axis];
    return value ? [`${axis} +${value}`] : [];
  });

  return parts.length > 0 ? parts.join(" • ") : "No contribution.";
};

const DesignViewer = ({
  selectedUpgrades,
  price,
  inCart,
  onAddToCart,
}: DesignViewerProps) => {
  const viewerData = useMemo(() => {
    const axisScores = PRESERVATION_AXIS_ORDER.reduce(
      (acc, axis) => {
        acc[axis] = 0;
        return acc;
      },
      {} as Record<PreservationAxis, number>,
    );

    const selectedElementContributions: SelectedElementContribution[] = [];
    let totalInfluence = 0;
    let totalAuthorityBonus = 0;

    selectedUpgrades.forEach((upgradeId) => {
      const typedUpgradeId = upgradeId as UpgradeId;
      const profile = upgradePreservationProfiles[typedUpgradeId];
      const upgrade = upgradeMap[typedUpgradeId];

      if (!profile || !upgrade) {
        return;
      }

      PRESERVATION_AXIS_ORDER.forEach((axis) => {
        axisScores[axis] += profile.axes[axis] ?? 0;
      });

      totalInfluence += profile.totalInfluence;
      totalAuthorityBonus += profile.authorityBonus ?? 0;

      selectedElementContributions.push({
        id: typedUpgradeId,
        name: upgrade.name,
        axes: profile.axes,
        totalInfluence: profile.totalInfluence,
        authorityBonus: profile.authorityBonus ?? 0,
        autoAppliedByName: upgrade.autoAppliedBy
          ? upgradeMap[upgrade.autoAppliedBy]?.name
          : undefined,
      });
    });

    const axisProgress = PRESERVATION_AXIS_ORDER.reduce(
      (acc, axis) => {
        const maxScore = AXIS_MAX_SCORES[axis];
        acc[axis] = percentFromRatio(axisScores[axis] / maxScore);
        return acc;
      },
      {} as Record<PreservationAxis, number>,
    );

    const axisAverageProgress =
      PRESERVATION_AXIS_ORDER.reduce(
        (sum, axis) => sum + axisProgress[axis],
        0,
      ) / PRESERVATION_AXIS_ORDER.length;
    const influenceProgress = percentFromRatio(
      (totalInfluence + totalAuthorityBonus) / TOTAL_AUTHORITY_TARGET,
    );
    const totalProgress = Math.min(
      axisAverageProgress * TOTAL_AXIS_WEIGHT +
        influenceProgress * TOTAL_INFLUENCE_WEIGHT,
      100,
    );

    return {
      axisScores,
      axisProgress,
      totalScore: Math.round(totalProgress),
      totalProgress,
      totalInfluence,
      totalAuthorityBonus,
      selectedElementContributions,
    };
  }, [selectedUpgrades]);

  return (
    <section className="mb-4 overflow-hidden rounded-[22px] border border-[color:rgba(0,32,81,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(235,243,255,0.92))] shadow-[0_10px_30px_rgba(0,32,81,0.06)]">
      <div className="px-4 py-3 sm:px-4">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-[12px] bg-[color:rgba(187,0,39,0.08)] p-2 text-[color:var(--color-secondary)]">
              <ShieldCheck className="size-3.5" />
            </div>
            <div>
              <p className="font-header text-[0.58rem] font-semibold tracking-[0.18em] text-[color:var(--color-secondary)] uppercase">
                Preservation
              </p>
              <h2 className="font-header mt-0.5 text-base font-semibold text-[color:var(--color-primary)] sm:text-lg">
                Three-axis viewer
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[color:rgba(0,32,81,0.08)] bg-white/85 px-2.5 py-1 shadow-[0_8px_18px_rgba(0,32,81,0.05)] lg:self-auto">
            <span className="font-subTitle text-[0.58rem] font-semibold tracking-[0.14em] text-[color:var(--color-mainProfile-600)] uppercase">
              Total
            </span>
            <span className="font-header text-base font-bold text-[color:var(--color-primary)]">
              {viewerData.totalScore}%
            </span>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 lg:grid-cols-3">
          {PRESERVATION_AXIS_ORDER.map((axis, index) => {
            const contributors = viewerData.selectedElementContributions
              .filter((item) => (item.axes[axis] ?? 0) > 0)
              .map((item) => item.name);

            return (
              <PreservationAxisChip
                key={axis}
                axis={axis}
                score={viewerData.axisScores[axis]}
                maxScore={AXIS_MAX_SCORES[axis]}
                progress={viewerData.axisProgress[axis]}
                contributors={contributors}
                index={index}
              />
            );
          })}
        </div>

        <div className="mt-3 rounded-[18px] border border-[color:rgba(0,32,81,0.08)] bg-white/88 p-3 shadow-[0_8px_20px_rgba(0,32,81,0.06)]">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-header text-[0.56rem] font-semibold tracking-[0.16em] text-[color:var(--color-secondary)] uppercase">
                Total Preservation
              </p>
              <h3 className="font-header mt-0.5 text-sm font-semibold text-[color:var(--color-primary)]">
                Authority meter
              </h3>
            </div>

            <div className="rounded-xl bg-[color:rgba(0,32,81,0.04)] px-3 py-2 text-right">
              <p className="font-header text-xl font-bold text-[color:var(--color-primary)]">
                {viewerData.totalScore}%
              </p>
              <p className="font-subTitle text-[0.56rem] tracking-[0.14em] text-[color:var(--color-mainProfile-600)] uppercase">
                authority
              </p>
            </div>
          </div>

          <div className="mt-3">
            <PreservationProgress
              label="total meter"
              value={viewerData.totalScore}
              maxValue={100}
              progress={viewerData.totalProgress}
              emphasis="total"
            />
          </div>
        </div>

        {/* <div className="mt-3 rounded-[18px] border border-[color:rgba(0,32,81,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(245,248,255,0.96))] p-3 shadow-[0_8px_20px_rgba(0,32,81,0.05)]">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-header text-[0.56rem] font-semibold tracking-[0.16em] text-[color:var(--color-secondary)] uppercase">
                Selected Elements
              </p>
              <h3 className="font-header mt-0.5 text-sm font-semibold text-[color:var(--color-primary)]">
                Add order
              </h3>
            </div>
            <div className="text-right text-xs text-[color:var(--color-mainProfile-600)]">
              Influence{" "}
              {(viewerData.totalInfluence + viewerData.totalAuthorityBonus).toFixed(2)} /{" "}
              {TOTAL_AUTHORITY_TARGET.toFixed(2)}
            </div>
          </div>

          <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
            {viewerData.selectedElementContributions.length > 0 ? (
              viewerData.selectedElementContributions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[color:rgba(0,32,81,0.08)] bg-white/90 px-3 py-2.5 shadow-[0_6px_16px_rgba(0,32,81,0.04)]"
                >
                  <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-header text-[0.82rem] font-semibold text-[color:var(--color-primary)]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[0.74rem] leading-5 text-[color:var(--color-mainProfile-600)]">
                        {formatContributionSummary(item.axes)}
                      </p>
                      {item.autoAppliedByName ? (
                        <p className="mt-0.5 text-[0.64rem] font-semibold tracking-[0.06em] text-[color:var(--color-secondary)] uppercase">
                          Auto by {item.autoAppliedByName}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-right">
                      <p className="font-header text-sm font-bold text-[color:var(--color-primary)]">
                        +{Math.round((item.totalInfluence + item.authorityBonus) * 100)}
                      </p>
                      <p className="font-subTitle text-[0.54rem] tracking-[0.12em] text-[color:var(--color-mainProfile-600)] uppercase">
                        authority
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[color:rgba(0,32,81,0.18)] bg-white/70 px-3 py-4 text-[0.74rem] text-[color:var(--color-mainProfile-600)]">
                Add elements to move the meters.
              </div>
            )}
          </div>
        </div> */}

        <DesignViewerFooter
          price={price}
          inCart={inCart}
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
};

export default DesignViewer;
