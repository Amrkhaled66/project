import { useRef, useState, useEffect } from "react";
import DesginContainer from "./DesginContainer";
import MainDashButton from "src/components/ui/MainDashButton";
import GoastButton from "src/components/ui/GoastButton";
import { Sparkles, CirclePlus } from "lucide-react";
import Canvas, { CanvasHandle } from "./Canvas/Canvas";
import { BlanketSizeId } from "src/data/blanketSizes";
import AddPhotosModel from "./AddPhotosModel";
import { arrayMove } from "@dnd-kit/sortable";
import { GridItemType } from "./Canvas/GridItem";
import { useCart } from "src/context/cart";

const STORAGE_KEY = "blanket-design-items";

const DesginArea = ({
  selectedSizeId,
  borderColor,
  blanketColor,
}: {
  selectedSizeId: BlanketSizeId;
  borderColor: string | null;
  blanketColor: string | null;
}) => {
  const [isAddPhotoModelOpen, setIsAddPhotoModelOpen] = useState(false);
  const [items, setItems] = useState<GridItemType[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log(saved);
    if (saved) {
      return JSON.parse(saved) as GridItemType[];
    } else {
      return [];
    }
  });
  const { updateDesign } = useCart();
  const canvasRef = useRef<CanvasHandle>(null);

  useEffect(() => {
    console.log(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // useEffect(() => {
  //   setItems([]);
  // }, [selectedSizeId]);
  // 🧠 Snapshot logic
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (canvasRef.current) {
        const image = await canvasRef.current.getSnapshot();
        updateDesign(image);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [items, blanketColor, borderColor, selectedSizeId]);

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
    <DesginContainer
      className="!h-fit"
      subHeader="Create a personalized blanket with your favorite memories"
      header="Design Your Blanket"
    >
      <div className="flex flex-col items-center justify-between gap-y-10">
        <Canvas
          ref={canvasRef}
          items={items}
          onUpdateItems={setItems}
          onDeleteItem={handleDeleteItem}
          onDragEnd={handleDragEnd}
          blanketColor={blanketColor}
          borderColor={borderColor}
          selectedSizeId={selectedSizeId}
        />
        <div className="w-full space-y-2">
          <p className="text-center text-sm sm:text-lg font-light">
            Upload photos to customize your blanket design
          </p>
          <div className="grid w-full gap-x-2 gap-y-3 sm:grid-cols-2">
            <MainDashButton
              text="Add Photos"
              className="!rounded-none"
              onClick={() => setIsAddPhotoModelOpen(true)}
              icon={<CirclePlus />}
            />
            <AddPhotosModel
              onClose={() => setIsAddPhotoModelOpen(false)}
              isOpen={isAddPhotoModelOpen}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              isItemExits={isItemExits}
            />
            <GoastButton
              className="flex items-center justify-center gap-2 !rounded-none"
              onClick={() => {}}
            >
              <Sparkles />
              Auto Layout
            </GoastButton>
          </div>
        </div>
      </div>
    </DesginContainer>
  );
};

export default DesginArea;
