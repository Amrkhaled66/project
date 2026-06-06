import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toBlob } from "html-to-image";

import { useDesign as useDesignQuery, useUpdateDesign } from "src/hooks/queries/design.queries";
import { createDesignUpdater } from "src/utils/designUpdater";
import { mergeDesignRecord } from "src/utils/designSelectors";
import type { Design } from "src/types/design.types";
import type { DesignData } from "src/types/design.types";
import type { DirtySection } from "src/types/desgin/editor.types";

export const useDesignEditorPersistence = ({
  designId,
  canvasRef,
  designData,
  onHydrate,
  onCommitted,
}: {
  designId: string;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  designData: DesignData;
  onHydrate: (data: DesignData) => void;
  onCommitted: () => void;
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useDesignQuery(designId);
  const updateMutation = useUpdateDesign();
  const hydratedRef = useRef(false);
  const updaterRef = useRef<ReturnType<
    typeof createDesignUpdater<DesignData & Record<string, unknown>>
  > | null>(null);

  useEffect(() => {
    hydratedRef.current = false;
    updaterRef.current = null;
  }, [designId]);

  useEffect(() => {
    if (!data?.designData || hydratedRef.current) {
      return;
    }

    onHydrate(data.designData);

    updaterRef.current = createDesignUpdater<
      DesignData & Record<string, unknown>
    >({
      designId,
      mutate: async ({ payload, preview }) => {
        const result = await updateMutation.mutateAsync({
          id: designId,
          payload,
          dirtySections: payload.dirtySections,
          preview: preview ?? null,
        });

        queryClient.setQueryData<Design | undefined>(
          ["design", designId],
          (previous) =>
            mergeDesignRecord(previous, payload.designData, result.price),
        );

        return result;
      },
      generatePreview: async () => {
        if (!canvasRef.current) {
          return null;
        }

        try {
          return await toBlob(canvasRef.current, {
            type: "image/webp",
            quality: 0.85,
            pixelRatio: 2,
            cacheBust: true,
          });
        } catch {
          return null;
        }
      },
      onCommitted,
    });

    updaterRef.current.hydrate(data.designData as DesignData & Record<string, unknown>);
    hydratedRef.current = true;
    onCommitted();
  }, [canvasRef, data?.designData, designId, onCommitted, onHydrate, queryClient, updateMutation]);

  const scheduleSave = (dirtySections: DirtySection[]) => {
    if (!hydratedRef.current || dirtySections.length === 0) {
      return;
    }

    updaterRef.current?.schedule(designData as any, dirtySections);
  };

  const hasPendingChanges = (current: DesignData) =>
    updaterRef.current?.hasPendingChanges(current as any) ?? false;

  const getSnapshot = () => updaterRef.current?.getSnapshot() as DesignData | undefined;

  return {
    designRecord: data,
    isLoading,
    isError,
    scheduleSave,
    hasPendingChanges,
    getSnapshot,
    hydratedRef,
  };
};
