import DesginContainer from "./DesginContainer";
import MainDashButton from "src/components/ui/MainDashButton";
import GoastButton from "src/components/ui/GoastButton";
import { Sparkles, CirclePlus } from "lucide-react";
import Canvas from "./Canvas/Canvas";
import AddPhotosModel from "./AddPhotosModel";
import { useDesign } from "src/context/desgin.context";
import { useCart } from "src/context/cart.context";
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

  const { updateCornerImage } = useCart();

  return (
    <DesginContainer
      className="!h-fit flex-1"
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
        />

        <div className="w-full space-y-2">
          <p className="text-center text-sm font-light sm:text-lg">
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
              itemsLength={items.length}
              onClose={() => setIsAddPhotoModelOpen(false)}
              isOpen={isAddPhotoModelOpen}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              isItemExits={isItemExits}
              onUpdateConrnerImage={updateCornerImage}
            />

            <GoastButton
              className="flex items-center justify-center gap-2 !rounded-none"
              onClick={() => {
                // optional Auto Layout logic
              }}
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

export default DesignArea;
