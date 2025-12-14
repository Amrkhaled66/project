import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import {
  useDesign as useDesignQuery,
  useUpdateDesign,
} from "src/hooks/queries/design.queries";
import { DesignData, sizeObj } from "src/types/design.types";
import { arrayMove } from "@dnd-kit/sortable";
import * as htmlToImage from "html-to-image";

// --------------------------------------------------
// Context
// --------------------------------------------------
const DesignContext = createContext<DesignContextType | undefined>(undefined);

// --------------------------------------------------
// Types
// --------------------------------------------------
type DesignContextType = {
  designId: string;
  designData: DesignData;
  data: any;
  update: (fn: (draft: DesignData) => void) => void;
  isLoading: boolean;
  isError: boolean;

  canvasRef: React.RefObject<HTMLDivElement | null>;

  handleDragStart: () => void;
  handleDragEnd: (event: any) => void;
  isDragging: boolean;

  updateBlanketColor: (color: string | null) => void;
  updateBorderColor: (color: string | null) => void;
  updateBackingColor: (color: string | null) => void;
  updateBindingColor: (color: string | null) => void;
  updateBlocking: (colors: string[], random: boolean) => void;
  updateQualityPreserveColor: (color: string | null) => void;
  toggleUpgrade: (id: string) => void;
  updateCanvasSize: (sizeObj: sizeObj) => void;

  hasCornerstones: boolean;
  hasBlocking: boolean;
  hasEmbroidery: boolean;
  hasCustomPanel: boolean;
  hasQualityPreserve: boolean;
  hasBinding: boolean;
  hasFringe: boolean;
};

// --------------------------------------------------
// Provider
// --------------------------------------------------
export const DesignProvider = ({
  children,
  designId,
}: {
  children: ReactNode;
  designId: string;
}) => {
  const { data, isLoading, isError } = useDesignQuery(designId);
  const updateMutation = useUpdateDesign();

  // --------------------------------------------------
  // State
  // --------------------------------------------------
  const [designData, setDesignData] = useState<DesignData>({
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
        blocking: { colors: [], random: false },
        binding: { color: null },
        customPanel: { text: "", image: null, options: {} },
        cornerstones: { type: null, images: {} },
      },
    },
    text: { items: [] },
    preview: { image: null },
    photos: { items: [] },
    price: "0",
  });

  // --------------------------------------------------
  // Refs
  // --------------------------------------------------
  const hydrated = useRef(false);
  const isDragging = useRef(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastSnapshot = useRef<string>("");
  const isSaving = useRef(false);

  // --------------------------------------------------
  // Hydration - Fixed Logic
  // --------------------------------------------------
  useEffect(() => {
    if (hydrated.current) return;
    if (!data?.designData) return;

    setDesignData(structuredClone(data.designData));
    lastSnapshot.current = JSON.stringify(data.designData);
    hydrated.current = true;
  }, [data?.designData]);

  // --------------------------------------------------
  // Update helper
  // --------------------------------------------------
  const update = useCallback((fn: (draft: DesignData) => void) => {
    setDesignData((prev) => {
      const copy = structuredClone(prev);
      fn(copy);
      return copy;
    });
  }, []);

  // --------------------------------------------------
  // Preview generator (DOM → Image)
  // --------------------------------------------------
  const generatePreview = useCallback(async () => {
    if (!canvasRef.current) return null;

    try {
      // Wait a tick for DOM to update with new image data
      await new Promise((resolve) => setTimeout(resolve, 100));

      return await htmlToImage.toJpeg(canvasRef.current, {
        quality: 0.85,
        cacheBust: true, // Force fresh render
      });
    } catch (err) {
      console.error("Preview generation failed", err);
      return null;
    }
  }, []);

  // --------------------------------------------------
  // Autosave + Preview Update - Fixed Race Condition
  // --------------------------------------------------
  useEffect(() => {
    if (!hydrated.current) return;
    const snapshot = JSON.stringify(designData);
    if (snapshot === lastSnapshot.current) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      if (isSaving.current) return;
      isSaving.current = true;

      const previewImage = await generatePreview();
      if (!previewImage) {
        isSaving.current = false;
        return;
      }

      setDesignData((prev) => {
        setDesignData((prev) => {
          const next = {
            ...prev,
            preview: { image: previewImage },
          };

          updateMutation.mutate({
            id: designId,
            payload: next,
          });

          lastSnapshot.current = JSON.stringify(next);
          isSaving.current = false;

          return next;
        });

        const next = {
          ...prev,
          preview: { image: previewImage },
        };

        updateMutation.mutate({
          id: designId,
          payload: next,
        });

        lastSnapshot.current = JSON.stringify(next);
        isSaving.current = false;

        return next;
      });
    }, 600);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [designData, designId]);

  // --------------------------------------------------
  // Drag handlers
  // --------------------------------------------------
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

  // --------------------------------------------------
  // Flags
  // --------------------------------------------------
  const hasCornerstones = designData.upgrades?.selected.some((u) =>
    ["cornerstonesSingle", "cornerstonesDouble"].includes(u),
  );

  // --------------------------------------------------
  // Context value
  // --------------------------------------------------
  const value: DesignContextType = {
    designId,
    designData,
    update,
    isLoading,
    isError,
    data,
    canvasRef,

    handleDragStart,
    handleDragEnd,
    isDragging: isDragging.current,

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
    hasBlocking: designData.upgrades?.selected.includes("blocking"),
    hasEmbroidery: designData.upgrades?.selected.includes("embroidery"),
    hasCustomPanel: designData.upgrades?.selected.includes("customPanels"),
    hasQualityPreserve:
      designData.upgrades?.selected.includes("quiltedPreserve"),
    hasBinding: designData.upgrades?.selected.includes("binding"),
    hasFringe: designData.upgrades?.selected.includes("fringe"),
  };

  useEffect(() => {
    console.log("🟡 STATE photos.items:", designData.photos.items);
  }, [designData.photos.items]);

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};

// --------------------------------------------------
// Hook
// --------------------------------------------------
export const useDesign = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) {
    throw new Error("useDesign must be used within DesignProvider");
  }
  return ctx;
};
