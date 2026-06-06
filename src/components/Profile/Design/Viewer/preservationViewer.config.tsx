import type { ReactElement } from "react";

import { PRESERVATION_AXES, type PreservationAxis } from "src/data/upgrades";

export const PRESERVATION_AXIS_ORDER = [
  PRESERVATION_AXES.STRUCTURE,
  PRESERVATION_AXES.DESIGN_HIERARCHY,
  PRESERVATION_AXES.PERFORMANCE,
] as const satisfies readonly PreservationAxis[];

export const AXIS_MAX_SCORES: Record<PreservationAxis, number> = {
  [PRESERVATION_AXES.STRUCTURE]: 8,
  [PRESERVATION_AXES.DESIGN_HIERARCHY]: 16,
  [PRESERVATION_AXES.PERFORMANCE]: 8,
};

export const TOTAL_AUTHORITY_TARGET = 0.75;
export const TOTAL_AXIS_WEIGHT = 0.55;
export const TOTAL_INFLUENCE_WEIGHT = 0.45;

export const preservationAxisVisuals: Record<
  PreservationAxis,
  {
    fill: string;
    panel: string;
    icon: ReactElement;
  }
> = {
  [PRESERVATION_AXES.STRUCTURE]: {
    fill: "var(--color-primary)",
    panel: "rgba(0, 32, 81, 0.05)",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 10l8-5 8 5"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10h12"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M7 10v7"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M12 10v7"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M17 10v7"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M5 17h14"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  [PRESERVATION_AXES.DESIGN_HIERARCHY]: {
    fill: "var(--color-secondary)",
    panel: "rgba(187, 0, 39, 0.05)",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8.25"
          stroke="currentColor"
          strokeWidth="2.15"
        />
        <path
          d="M15.9 8.1l-2.4 6.6-6.6 2.4 2.4-6.6 6.6-2.4Z"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.15" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  [PRESERVATION_AXES.PERFORMANCE]: {
    fill: "#c9a227",
    panel: "rgba(12, 35, 64, 0.06)",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 3h10M7 21h10"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M8 3c0 4.4 4 5.1 4 9s-4 4.6-4 9"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M16 3c0 4.4-4 5.1-4 9s4 4.6 4 9"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
        <path
          d="M11 12h2"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};
