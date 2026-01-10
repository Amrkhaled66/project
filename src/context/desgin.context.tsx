import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

import {
  useDesign as useDesignQuery,
  useUpdateDesign,
} from "src/hooks/queries/design.queries";

import { DesignData, sizeObj } from "src/types/design.types";
import { arrayMove } from "@dnd-kit/sortable";
import { toBlob } from "html-to-image";

/* -------------------------------------------------------------------------- */
/* Context                                                                     */
/* -------------------------------------------------------------------------- */
const DesignContext = createContext<DesignContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */
type DesignContextType = {
  designId: string;
  designData: DesignData;
  update: (fn: (draft: DesignData) => void) => void;

  isLoading: boolean;
  isError: boolean;

  canvasRef: React.RefObject<HTMLDivElement | null>;

  handleDragStart: () => void;
  handleDragEnd: (event: any) => void;
  isDragging: boolean;

  flushSave: () => Promise<void>;

  updateBlanketColor: (color: string | null) => void;
  updateBorderColor: (color: string | null) => void;
  updateBackingColor: (color: string | null) => void;
  updateBindingColor: (color: string | null) => void;
  updateBlocking: (colors: string[], random: boolean) => void;
  updateQualityPreserveColor: (color: string | null) => void;
  toggleUpgrade: (id: string) => void;
  updateCanvasSize: (sizeObj: sizeObj) => void;

  hasCornerstones: boolean;
  hasDoubleCorner: boolean;
  hasBlocking: boolean;
  hasEmbroidery: boolean;
  hasCustomPanel: boolean;
  hasQualityPreserve: boolean;
  hasBinding: boolean;
  hasFringe: boolean;
  hasChanged: boolean;
  price: string;
};

/* -------------------------------------------------------------------------- */
/* Initial State                                                               */
/* -------------------------------------------------------------------------- */
const initialDesignState: DesignData = {
  meta: { name: "Untitled Design", createdAt: null, updatedAt: null },
  canvas: { size: { name: "Lap", rows: 2, cols: 3 }, layout: [], zoom: 1 },
  colors: {
    blanket: "",
    border: "",
    backing: "",
    binding: "",
    blocking: { colors: [], random: false },
    qualityPreserve: "",
  },
  upgrades: {
    selected: [],
    props: {
      embroidery: { zones: null },
      cornerstones: { type: null, images: {} },
    },
  },
  text: { items: [] },
  photos: { items: [] },
  price: "0",
};

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */
export const DesignProvider = ({
  children,
  designId,
}: {
  children: ReactNode;
  designId: string;
}) => {
  const { data, isLoading, isError } = useDesignQuery(designId);
  const updateMutation = useUpdateDesign();

  /* ------------------------------------------------------------------------ */
  /* State                                                                    */
  /* ------------------------------------------------------------------------ */
  const [designData, setDesignData] = useState<DesignData>(initialDesignState);

  /* ------------------------------------------------------------------------ */
  /* Refs                                                                     */
  /* ------------------------------------------------------------------------ */
  const hydrated = useRef(false);
  const isDragging = useRef(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastSnapshot = useRef<string>("");
  /* ------------------------------------------------------------------------ */
  /* Reset hydration when designId changes                                    */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    hydrated.current = false;
    setDesignData(initialDesignState);
    lastSnapshot.current = "";
  }, [designId]);

  /* ------------------------------------------------------------------------ */
  /* Hydration from API (SAFE)                                                 */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    if (!data?.designData) return;
    if (hydrated.current) return;

    console.log(data.designData, "fetched");
    setDesignData(structuredClone(data.designData));
    lastSnapshot.current = JSON.stringify(data.designData);
    hydrated.current = true;
  }, [data?.designData, designId]);

  /* ------------------------------------------------------------------------ */
  /* Update helper                                                            */
  /* ------------------------------------------------------------------------ */
  const update = useCallback((fn: (draft: DesignData) => void) => {
    setDesignData((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Autosave (JSON ONLY, debounced)                                          */
  /* ------------------------------------------------------------------------ */

  const generatePreviewBlob = async (): Promise<Blob | null> => {
    if (!canvasRef?.current) return null;

    try {
      return await toBlob(canvasRef.current, {
        type: "image/webp",
        quality: 0.85,
        pixelRatio: 2,
        cacheBust: true,
      });
    } catch (error) {
      console.error("Failed to generate WebP preview", error);
      return null;
    }
  };
  useEffect(() => {
    const runAsync = async () => {
      if (!hydrated.current) return;

      const snapshot = JSON.stringify(designData);
      if (snapshot === lastSnapshot.current) return;

      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      const previewBlob = await generatePreviewBlob();
      saveTimeout.current = setTimeout(() => {
        updateMutation.mutate({
          id: designId,
          payload: { designData },
          preview: previewBlob,
        });

        lastSnapshot.current = snapshot;
      }, 5000);
    };

    runAsync();

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [designData, designId, updateMutation]);

  /* ------------------------------------------------------------------------ */
  /* Manual flush save (used before navigation)                               */
  /* ------------------------------------------------------------------------ */

  const flushSave = useCallback(async () => {
    if (!hydrated.current) return;

    console.log("previewBlob");
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
      saveTimeout.current = null;
    }
    // const previewBlob = await generatePreviewBlob();

    await updateMutation.mutateAsync({
      id: designId,
      payload: { designData },
      // preview: previewBlob,
    });

    lastSnapshot.current = JSON.stringify(designData);
  }, [designData, designId, updateMutation]);

  /* ------------------------------------------------------------------------ */
  /* Drag handlers                                                            */
  /* ------------------------------------------------------------------------ */
  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (event: any) => {
    isDragging.current = false;

    const { active, over } = event;
    if (!over) return;

    const type = active.data.current?.type;

    if (type === "grid-item") {
      update((d) => {
        const list = d.photos.items;
        const oldIndex = list.findIndex((i) => i.id === active.id);
        const newIndex = list.findIndex((i) => i.id === over.id);
        if (oldIndex >= 0 && newIndex >= 0) {
          d.photos.items = arrayMove(list, oldIndex, newIndex);
        }
      });
    }

    if (type === "corner-image") {
      const url = active.data.current?.image;
      const index = Number(String(over.id).replace("corner-", ""));
      update((d) => {
        d.upgrades.props.cornerstones.images[index] = url;
      });
    }
  };

  const snapshot = JSON.stringify(designData);
  const hasChanged = snapshot !== lastSnapshot.current;

  const toggleUpgrade = (id: string) =>
    update((d) => {
      const selected = d.upgrades.selected;
      const isActive = selected.includes(id);

      /* ---------------- Toggle ---------------- */
      d.upgrades.selected = isActive
        ? selected.filter((x) => x !== id)
        : [...selected, id];

      /* ---------------- Side Effects ---------------- */

      switch (id) {
        /* ---- CUSTOM PANEL ---- */
        case "customPanels": {
          if (isActive) {
            d.photos.items = d.photos.items.filter(
              (p) => p.type !== "custom_panael",
            );
          }
          break;
        }

        default:
          break;
      }
    });

  /* ------------------------------------------------------------------------ */
  /* Flags                                                                    */
  /* ------------------------------------------------------------------------ */
  const hasCornerstones = designData.upgrades.selected.some((u) =>
    ["cornerstonesSingle", "cornerstonesDouble"].includes(u),
  );

  /* ------------------------------------------------------------------------ */
  /* Context value                                                            */
  /* ------------------------------------------------------------------------ */
  const value: DesignContextType = useMemo(
    () => ({
      designId,
      designData,
      update,
      isLoading,
      isError,
      price: data?.price ?? "0",
      canvasRef,

      handleDragStart,
      handleDragEnd,
      isDragging: isDragging.current,

      flushSave,

      updateBlanketColor: (c) => update((d) => (d.colors.blanket = c)),
      updateBorderColor: (c) => update((d) => (d.colors.border = c)),
      updateBackingColor: (c) => update((d) => (d.colors.backing = c)),
      updateBindingColor: (c) => update((d) => (d.colors.binding = c)),
      updateBlocking: (colors, random) =>
        update((d) => {
          d.colors.blocking.colors = colors;
          d.colors.blocking.random = random;
        }),
      updateQualityPreserveColor: (c) =>
        update((d) => (d.colors.qualityPreserve = c)),
      toggleUpgrade: (id) =>
        update((d) => {
          const list = d.upgrades.selected;
          d.upgrades.selected = list.includes(id)
            ? list.filter((x) => x !== id)
            : [...list, id];
        }),
      updateCanvasSize: (sizeObj: sizeObj) =>
        update((d) => {
          d.canvas.size = structuredClone(sizeObj);
        }),

      hasCornerstones,
      hasDoubleCorner:
        hasCornerstones &&
        designData.upgrades.selected.includes("cornerstonesDouble"),
      hasBlocking: designData.upgrades.selected.includes("blocking"),
      hasEmbroidery: designData.upgrades.selected.includes("embroidery"),
      hasCustomPanel: designData.upgrades.selected.includes("customPanels"),
      hasQualityPreserve:
        designData.upgrades.selected.includes("quiltedPreserve"),
      hasBinding: designData.upgrades.selected.includes("binding"),
      hasFringe: designData.upgrades.selected.includes("fringe"),
      hasChanged,
    }),
    [designId, designData, isLoading, isError, flushSave],
  );

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */
export const useDesign = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) {
    throw new Error("useDesign must be used within DesignProvider");
  }
  return ctx;
};
