import DesginContainer from "./DesginContainer";
import MainDashButton from "src/components/ui/MainDashButton";
import GoastButton from "src/components/ui/GoastButton";
import { Sparkles, CirclePlus, FlipHorizontal, Trash2 } from "lucide-react";
import Canvas from "./Canvas/Canvas";
import AddPhotosModel from "./AddPhotosModel";
import { useDesign } from "src/context/desgin.context";
import { useCart } from "src/context/cart.context";
import { useState } from "react";
import Toast from "src/components/ui/Toast";

const DesignArea = () => {
  const {
    items,
    setItems,
    isAddPhotoModelOpen,
    setIsAddPhotoModelOpen,
    handleAddItem,
    handleDeleteItem,
    handleDragEnd,
    isItemExits,
    canvasRef,
  } = useDesign();

  const {
    cartItem: { backingColor },
  } = useCart();

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toggleFlipped = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <DesginContainer
      className="!h-fit flex-1"
      subHeader="Create a personalized blanket with your favorite memories"
      header="Design Your Blanket"
    >
      <div className="flex flex-col gap-4">
        {/* ⭐ Compact Toolbar */}
        <div className="mx-auto flex items-center gap-3 rounded-md bg-neutral-100 px-3 py-2 shadow-sm">
          <button
            onClick={() => setIsAddPhotoModelOpen(true)}
            className="flex items-center gap-1 rounded-md bg-primary/90 px-3 py-1.5 text-sm text-white transition-all hover:bg-primary"
          >
            <CirclePlus className="size-4" />
            Add
          </button>

          {/* <button
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-gray-600 transition-all hover:bg-gray-200"
            onClick={() => {
              // optional Auto Layout logic
            }}
          >
            <Sparkles className="size-4" />
            Auto
          </button> */}

          <button
            onClick={
              !backingColor
                ? () =>
                    Toast(
                      "Please select a backing color",
                      "warning",
                      "#fff3cd",
                      "top-end"
                    )
                : toggleFlipped
            }
            disabled={!backingColor}
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50"
          >
            <FlipHorizontal className="size-4" />
            Flip
          </button>

          {/* <button
            onClick={() => setItems([])}
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-gray-700 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" />
            Clear
          </button> */}
        </div>

        {/* Canvas Centered */}
        <div className="flex w-full justify-center">
          <Canvas
            ref={canvasRef}
            items={items}
            onUpdateItems={setItems}
            onDeleteItem={handleDeleteItem}
            onDragEnd={handleDragEnd}
            isFlipped={isFlipped}
          />
        </div>

        {/* Empty state hint */}
        {items.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Click <strong>Add</strong> to start designing your blanket.
          </p>
        )}
      </div>

      <AddPhotosModel
        itemsLength={items.length}
        onClose={() => setIsAddPhotoModelOpen(false)}
        isOpen={isAddPhotoModelOpen}
        onAddItem={handleAddItem}
        isItemExits={isItemExits}
      />
    </DesginContainer>
  );
};

export default DesignArea;
