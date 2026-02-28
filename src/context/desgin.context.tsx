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

import { createDesignUpdater } from "src/utils/designUpdater";
import { calculateDesignPrice } from "src/utils/calcDesignPrice";

import { BLANKET_SIZES } from "src/data/blanketSizes";
import { UPGRADE_IDS } from "src/data/upgrades";

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
  startingSize: BLANKET_SIZES[0].id,
  canvas: {
    size: BLANKET_SIZES[0].id,
    rows: BLANKET_SIZES[0].rows,
    cols: BLANKET_SIZES[0].cols,
  },
  colors: {
    blanket: "",
    border: "",
    backing: "",
    binding: "",
    blocking: {
      colors: [],
      random: false,
    },
    qualityPreserve: "",
  },

  upgrades: {
    selected: [],
    props: {
      embroidery: {
        zones: null,
      },
      cornerstones: {
        type: null,
        images: {},
      },
    },
  },

  text: {
    items: [],
  },

  photos: {
    items: [],
  },

  price: "0.00",
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

  const updaterRef = useRef<ReturnType<
    typeof createDesignUpdater<DesignData & Record<string, unknown>>
  > | null>(null);

  /* ------------------------------------------------------------------------ */
  /* Reset on designId change                                                  */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    hydrated.current = false;
    updaterRef.current = null;
    setDesignData(initialDesignState);
  }, [designId]);

  /* ------------------------------------------------------------------------ */
  /* Preview Generator                                                        */
  /* ------------------------------------------------------------------------ */
  const generatePreviewBlob = async (): Promise<Blob | null> => {
    if (!canvasRef.current) return null;

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
  };

  /* ------------------------------------------------------------------------ */
  /* Hydration from API                                                        */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    if (!data?.designData) return;
    if (hydrated.current) return;

    const cloned = structuredClone(data.designData);
    setDesignData(cloned);

    updaterRef.current = createDesignUpdater<
      DesignData & Record<string, unknown>
    >({
      designId,
      mutate: updateMutation.mutate,
      generatePreview: generatePreviewBlob,
    });

    updaterRef.current.hydrate(cloned as any);
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
  /* Autosave (debounced, diff-based)                                          */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    if (!hydrated.current) return;
    updaterRef.current?.schedule(designData as any);
  }, [designData]);

  /* ------------------------------------------------------------------------ */
  /* Manual flush save                                                         */
  /* ------------------------------------------------------------------------ */
  const flushSave = useCallback(async () => {
    if (!hydrated.current) return;
    await updaterRef.current?.flush(designData as any);
  }, [designData]);

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

  /* ------------------------------------------------------------------------ */
  /* Flags                                                                    */
  /* ------------------------------------------------------------------------ */
  const hasCornerstones = designData.upgrades.selected.some((u: any) =>
    [
      UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
      UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
    ].includes(u),
  );

  const hasChanged =
    updaterRef.current?.hasPendingChanges(designData as any) || false;

  /* ------------------------------------------------------------------------ */
  /* toggle updrade                                                           */
  /* ------------------------------------------------------------------------ */
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
        case UPGRADE_IDS.HEIRLOOM_PANEL: {
          if (isActive) {
            d.photos.items = d.photos.items.filter(
              (p) => p.type !== UPGRADE_IDS.HEIRLOOM_PANEL,
            );
          }
          break;
        }
        case UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE: {
          if (
            selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE) &&
            !isActive
          ) {
            d.upgrades.selected = d.upgrades.selected.filter(
              (u) => u !== UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
            );
          }
        }

        case UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE: {
          if (
            selected.includes(UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE) &&
            !isActive
          ) {
            d.upgrades.selected = d.upgrades.selected.filter(
              (u) => u !== UPGRADE_IDS.HEIRLOOM_CORNER_SINGLE,
            );
          }
        }

        case UPGRADE_IDS.HEIRLOOM_PRESERVE:
          {
            if (!isActive) {
              d.upgrades.selected.push(UPGRADE_IDS.HEIRLOOM_EDGE);
            }
          }

          break;

        default:
          break;
      }
    });

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
      price: calculateDesignPrice(designData).toString(),
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
      toggleUpgrade,
      updateCanvasSize: (sizeObj: sizeObj) =>
        update((d) => {
          d.canvas.size = sizeObj.size;
          d.canvas.rows = sizeObj.rows;
          d.canvas.cols = sizeObj.cols;
        }),

      hasCornerstones,
      hasDoubleCorner:
        hasCornerstones &&
        designData.upgrades.selected.includes(
          UPGRADE_IDS.HEIRLOOM_CORNER_DOUBLE,
        ),
      hasBlocking: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_BLOCK,
      ),
      hasEmbroidery: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_SCRIPT,
      ),
      hasCustomPanel: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_PANEL,
      ),
      hasQualityPreserve: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_PRESERVE,
      ),
      hasBinding: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_EDGE,
      ),
      hasFringe: designData.upgrades.selected.includes(
        UPGRADE_IDS.HEIRLOOM_SEAL,
      ),
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
