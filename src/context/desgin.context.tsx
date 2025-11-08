import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
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
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<GridItemType[]>([]);
  const [isAddPhotoModelOpen, setIsAddPhotoModelOpen] = useState(false);
  const { updateDesign, cartItem } = useCart();
  const canvasRef = useRef<CanvasHandle>(null);
  const hasMountedRef = useRef(false);

  const selectedSizeId = cartItem.size?.id ?? "Lap";
  const borderColor = cartItem.borderColor ?? null;
  const blanketColor = cartItem.color ?? null;

  // Load saved items
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

  // Save items to localStorage
  useEffect(() => {
    if (hasMountedRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      hasMountedRef.current = true;
    }
  }, [items]);

  // Update snapshot
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (canvasRef.current) {
        const image = await canvasRef.current.getSnapshot();
        updateDesign(image);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [items, blanketColor, borderColor, selectedSizeId]);

  // Handlers
  const handleAddItem = ({ id, image }: GridItemType) =>
    setItems((prev) => [...prev, { id, image }]);

  const handleDeleteItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };



  const isItemExits = (id: string) => items.some((item) => item.id === id);
  return (
    <DesignContext.Provider
      value={{
        items,
        setItems,
        isAddPhotoModelOpen,
        setIsAddPhotoModelOpen,
        handleAddItem,
        handleDeleteItem,
        handleDragEnd,
        isItemExits,
        canvasRef,

      }}
    >
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
