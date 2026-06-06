import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { arrayMove } from "@dnd-kit/sortable";

import { useDesignDerivedValue } from "src/hooks/useDesignDerivedValue";
import { useDesignEditorPersistence } from "src/hooks/useDesignEditorPersistence";
import { designReducer } from "src/utils/designReducer";
import { initialDesignState } from "src/utils/designInitialState";
import showDesignViewer from "src/utils/designViewer";
import type {
  DesignContextType,
  DesignDerivedValue,
  DesignEditorActionsValue,
  DesignEditorStateValue,
} from "src/types/desgin/editor.types";

const DesignEditorStateContext = createContext<
  DesignEditorStateValue | undefined
>(undefined);
const DesignEditorActionsContext = createContext<
  DesignEditorActionsValue | undefined
>(undefined);
const DesignDerivedContext = createContext<DesignDerivedValue | undefined>(
  undefined,
);

export const DesignProvider = ({
  children,
  designId,
}: {
  children: ReactNode;
  designId: string;
}) => {
  const [designData, dispatch] = useReducer(designReducer, initialDesignState);
  const [snapshotVersion, setSnapshotVersion] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const latestDesignDataRef = useRef(designData);

  useEffect(() => {
    dispatch({ type: "hydrate", designData: initialDesignState });
  }, [designId]);

  useEffect(() => {
    latestDesignDataRef.current = designData;
  }, [designData]);

  const handleCommitted = useCallback(() => {
    setSnapshotVersion((value) => value + 1);
  }, []);

  const {
    designRecord,
    isLoading,
    isError,
    scheduleSave,
    hasPendingChanges,
    getSnapshot,
    hydratedRef,
  } = useDesignEditorPersistence({
    designId,
    canvasRef,
    designData,
    onHydrate: (data) => dispatch({ type: "hydrate", designData: data }),
    onCommitted: handleCommitted,
  });

  const derivedValue = useDesignDerivedValue({
    designData,
    snapshot: getSnapshot(),
    snapshotVersion,
    isDragging,
  });

  useEffect(() => {
    scheduleSave(derivedValue.dirtySections);
  }, [derivedValue.dirtySections, scheduleSave]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hydratedRef.current) {
        return;
      }

      if (!hasPendingChanges(latestDesignDataRef.current)) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasPendingChanges, hydratedRef]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((event: any) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const type = active.data.current?.type;

    if (type === "grid-item") {
      const list = latestDesignDataRef.current.photos.items;
      const oldIndex = list.findIndex((item: any) => item.id === active.id);
      const newIndex = list.findIndex((item: any) => item.id === over.id);

      if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
        dispatch({
          type: "replace-photos",
          items: arrayMove(list, oldIndex, newIndex),
        });
        showDesignViewer("Photo layout updated");
      }
    }

    if (type === "corner-image") {
      const url = active.data.current?.image;
      const index = Number(String(over.id).replace("corner-", ""));

      if (url) {
        dispatch({ type: "set-corner-image", index, url });
        showDesignViewer(`Corner image applied to slot ${index + 1}`);
      }
    }
  }, []);

  const actionsValue = useMemo<DesignEditorActionsValue>(
    () => ({
      handleDragStart,
      handleDragEnd,
      updateBlanketColor: (color) =>
        dispatch({ type: "set-blanket-color", color }),
      updateBorderColor: (color) => dispatch({ type: "set-border-color", color }),
      updateBackingColor: (color) =>
        dispatch({ type: "set-backing-color", color }),
      updateBindingColor: (color) =>
        dispatch({ type: "set-binding-color", color }),
      updateBlocking: (colors, random) =>
        dispatch({ type: "set-blocking", colors, random }),
      updateQualityPreserveColor: (color) =>
        dispatch({ type: "set-quality-preserve-color", color }),
      toggleUpgrade: (id) => dispatch({ type: "toggle-upgrade", id }),
      updateCanvasSize: (size) => dispatch({ type: "set-canvas-size", size }),
      updatePanelSize: (panelSize) =>
        dispatch({ type: "set-panel-size", panelSize }),
      replacePhotos: (items) => dispatch({ type: "replace-photos", items }),
      appendPhotos: (items) => dispatch({ type: "append-photos", items }),
      removePhoto: (id) => dispatch({ type: "remove-photo", id }),
      setEmbroideryZones: (zones) =>
        dispatch({ type: "set-embroidery-zones", zones }),
      setCornerImage: (index, url) =>
        dispatch({ type: "set-corner-image", index, url }),
      removeCornerImage: (index) =>
        dispatch({ type: "remove-corner-image", index }),
      resetDesign: () => dispatch({ type: "reset" }),
    }),
    [handleDragEnd, handleDragStart],
  );

  const stateValue = useMemo<DesignEditorStateValue>(
    () => ({
      designId,
      designData,
      designRecord,
      isLoading,
      isError,
      canvasRef,
    }),
    [designData, designId, designRecord, isError, isLoading],
  );

  return (
    <DesignEditorStateContext.Provider value={stateValue}>
      <DesignEditorActionsContext.Provider value={actionsValue}>
        <DesignDerivedContext.Provider value={derivedValue}>
          {children}
        </DesignDerivedContext.Provider>
      </DesignEditorActionsContext.Provider>
    </DesignEditorStateContext.Provider>
  );
};

export const useDesignEditorState = () => {
  const context = useContext(DesignEditorStateContext);

  if (!context) {
    throw new Error("useDesignEditorState must be used within DesignProvider");
  }

  return context;
};

export const useDesignEditorActions = () => {
  const context = useContext(DesignEditorActionsContext);

  if (!context) {
    throw new Error("useDesignEditorActions must be used within DesignProvider");
  }

  return context;
};

export const useDesignDerived = () => {
  const context = useContext(DesignDerivedContext);

  if (!context) {
    throw new Error("useDesignDerived must be used within DesignProvider");
  }

  return context;
};

export const useDesign = (): DesignContextType => ({
  ...useDesignEditorState(),
  ...useDesignEditorActions(),
  ...useDesignDerived(),
});
