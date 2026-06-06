import { useMemo } from "react";

import { getDesignDerivedValue, getDirtySections } from "src/utils/designSelectors";
import type { DesignData } from "src/types/design.types";

export const useDesignDerivedValue = ({
  designData,
  snapshot,
  snapshotVersion,
  isDragging,
}: {
  designData: DesignData;
  snapshot: DesignData | undefined;
  snapshotVersion: number;
  isDragging: boolean;
}) => {
  const dirtySections = useMemo(
    () => getDirtySections(snapshot, designData),
    [designData, snapshot, snapshotVersion],
  );
  const hasChanged = dirtySections.length > 0;

  return useMemo(
    () =>
      getDesignDerivedValue({
        designData,
        dirtySections,
        hasChanged,
        isDragging,
      }),
    [designData, dirtySections, hasChanged, isDragging],
  );
};
