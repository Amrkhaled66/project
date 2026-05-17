export type DesignViewerTone = "success" | "warning" | "error" | "info";

export type DesignViewerDetail = {
  id: number;
  title: string;
  tone: DesignViewerTone;
  duration: number;
};

const DESIGN_VIEWER_EVENT = "design-viewer:show";

export const DESIGN_VIEWER_SHOW_EVENT = DESIGN_VIEWER_EVENT;

export default function showDesignViewer(
  title: string,
  tone: DesignViewerTone = "success",
  duration = 1800,
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<DesignViewerDetail>(DESIGN_VIEWER_EVENT, {
      detail: {
        id: Date.now(),
        title,
        tone,
        duration,
      },
    }),
  );
}
