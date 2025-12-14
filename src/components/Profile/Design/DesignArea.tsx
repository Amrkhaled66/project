import DesginContainer from "./DesginContainer";
import { CirclePlus, FlipHorizontal } from "lucide-react";
import Canvas from "./Canvas/Canvas";
import AddPhotosModel from "./AddPhotosModel";
import { useContext, useState, useCallback } from "react";
import { useDesign } from "src/context/desgin.context"; // Import the DesignContext
import { useCart } from "src/context/cart.context";
import Toast from "src/components/ui/Toast";

const DesignArea = () => {
  const { designData, update, handleDragStart, handleDragEnd } = useDesign();

  const items = designData?.photos?.items ?? [];
  const backingColor = designData?.colors?.backing;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAddPhotoModelOpen, setIsAddPhotoModelOpen] = useState(false);

  const toggleFlipped = () => {
    setIsFlipped((prev) => !prev);
  };

  // --------------------------------------------
  // ADD ITEM
  // --------------------------------------------
  const handleUpdateItems = useCallback((newItems: any) => {
    update((d) => {
      d.photos.items = newItems;
    });
  }, [update]);

  // --------------------------------------------
  // DELETE ITEM
  // --------------------------------------------
  const handleDeleteItem = (id: string) => {
    update((d) => {
      d.photos.items = d.photos.items.filter((i) => i.id !== id);
    });
  };

  // --------------------------------------------
  // Check if item exists
  // --------------------------------------------
  const isItemExits = (id: string) =>
    designData?.photos?.items.some((i) => i.id === id);

  return (
    <DesginContainer
      className="!h-fit flex-1"
      subHeader="Create a personalized blanket with your favorite memories"
      header="Design Your Blanket"
    >
      <div className="flex flex-col gap-4">
        {/* Top Toolbar */}
        <div className="mx-auto flex items-center gap-3 rounded-md bg-neutral-100 px-3 py-2 shadow-sm">
          <button
            onClick={() => setIsAddPhotoModelOpen(true)}
            className="bg-primary/90 hover:bg-primary flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-white transition-all"
          >
            <CirclePlus className="size-4" />
            Add
          </button>

          <button
            onClick={
              !backingColor
                ? () =>
                    Toast(
                      "Please select a backing color",
                      "warning",
                      "#fff3cd",
                      "top-end",
                    )
                : toggleFlipped
            }
            disabled={!backingColor}
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50"
          >
            <FlipHorizontal className="size-4" />
            Flip
          </button>
        </div>

        {/* Canvas */}
        <div className="flex w-full justify-center">
          <Canvas
            items={items}
            isFlipped={isFlipped}
            onDeleteItem={handleDeleteItem}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onUpdateItems={handleUpdateItems}
          />
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Click <strong>Add</strong> to start designing your blanket.
          </p>
        )}
      </div>

      {/* Add Photo Modal */}
      <AddPhotosModel
        itemsLength={items.length}
        isOpen={isAddPhotoModelOpen}
        onClose={() => setIsAddPhotoModelOpen(false)}
      />
    </DesginContainer>
  );
};

export default DesignArea;
