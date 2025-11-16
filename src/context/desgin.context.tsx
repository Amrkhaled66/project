// src/context/design.context.tsx

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { arrayMove } from "@dnd-kit/sortable";
import { GridItemType } from "src/components/Profile/Design/Canvas/GridItem";
import { useCart } from "src/context/cart.context";
import { CanvasHandle } from "src/components/Profile/Design/Canvas/Canvas";

const STORAGE_KEY = "blanket-design-items";

type DesignContextType = {
  items: GridItemType[];
  setItems: React.Dispatch<React.SetStateAction<GridItemType[]>>;
  isAddPhotoModelOpen: boolean;
  setIsAddPhotoModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddItem: (item: GridItemType) => void;
  handleDeleteItem: (id: string) => void;
  handleDragEnd: (event: any) => void;
  isItemExits: (id: string) => boolean;
  canvasRef: React.MutableRefObject<CanvasHandle | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<GridItemType[]>([]);
  const [isAddPhotoModelOpen, setIsAddPhotoModelOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // 🔥 NEW

  const { updateDesign, cartItem, updateCornerImage } = useCart();

  const canvasRef = useRef<CanvasHandle>(null);
  const hasMountedRef = useRef(false);

  const selectedSizeId = cartItem.size?.id ?? "Lap";
  const borderColor = cartItem.borderColor ?? null;
  const blanketColor = cartItem.color ?? null;

  // -------------------------------------------------------
  // Load from localStorage on mount
  // -------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved) as GridItemType[]);
      } catch {
        setItems([]);
      }
    }
  }, []);

  // -------------------------------------------------------
  // Save items (ignore base64)
  // -------------------------------------------------------
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const filtered = items.filter((item) => !item.image.startsWith("data:"));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }, [items]);

  // -------------------------------------------------------
  // Memoized Handlers
  // -------------------------------------------------------
  const handleAddItem = useCallback(
    (item: GridItemType) => {
      setItems((prev) => [...prev, item]);
    },
    [setItems]
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const isItemExits = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;

      setIsDragging(false); // 🔥 Dragging finished — now allow updates again

      if (!over) return;

      const activeType = active.data.current?.type;
      const overId = over.id;

      // Corner image drag
      if (activeType === "corner-image") {
        const cornerIndex = Number(overId.replace("corner-", ""));
        const imageUrl = active.data.current?.image;

        updateCornerImage(cornerIndex, imageUrl);
        return;
      }

      // Grid item sorting
      if (activeType === "grid-item") {
        if (active.id !== over.id) {
          setItems((prev) => {
            const oldIndex = prev.findIndex((i) => i.id === active.id);
            const newIndex = prev.findIndex((i) => i.id === over.id);
            return arrayMove(prev, oldIndex, newIndex);
          });
        }
      }
    },
    [setItems, updateCornerImage]
  );

  // -------------------------------------------------------
  // Optimized Snapshot Generator
  // -------------------------------------------------------
  const upgradesKey = useMemo(
    () => cartItem.upgrades.map((u) => u.id).join(","),
    [cartItem.upgrades]
  );

  useEffect(() => {
    if (isDragging) return; // 🔥 Skip snapshot during drag

    const timeout = setTimeout(async () => {
      if (canvasRef.current) {
        const image = await canvasRef.current.getSnapshot();
        updateDesign(image);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    items,
    blanketColor,
    borderColor,
    selectedSizeId,
    upgradesKey,
    isDragging, // NEW
  ]);

  // -------------------------------------------------------
  // Memoized Provider Value
  // -------------------------------------------------------
  const value = useMemo(
    () => ({
      items,
      setItems,
      isAddPhotoModelOpen,
      setIsAddPhotoModelOpen,
      handleAddItem,
      handleDeleteItem,
      handleDragEnd,
      isItemExits,
      canvasRef,
      isDragging, // 🔥 expose dragging state
      setIsDragging, // 🔥 expose setter
    }),
    [
      items,
      isAddPhotoModelOpen,
      handleAddItem,
      handleDeleteItem,
      handleDragEnd,
      isItemExits,
      isDragging,
    ]
  );

  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
};
