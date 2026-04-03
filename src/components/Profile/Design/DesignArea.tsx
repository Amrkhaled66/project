import { useState, useCallback, useRef } from "react";
import { CirclePlus, FlipHorizontal, RotateCcw } from "lucide-react";

import DesginContainer from "./DesginContainer";
import Canvas from "./Canvas/Canvas";
import AddPhotosModel from "./AddPhotosModel";

import { useDesign } from "src/context/desgin.context";
import Toast from "src/components/ui/Toast";
import Button from "src/components/ui/Button";
const DesignArea = () => {
  const { designData, update, resetDesign } = useDesign();

  const items = designData?.photos?.items ?? [];
  const backingColor = designData?.colors?.backing;

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAddPhotoModelOpen, setIsAddPhotoModelOpen] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* Refs                                                                    */
  /* ------------------------------------------------------------------------ */
  const previewDirtyRef = useRef(false);

  /* ------------------------------------------------------------------------ */
  /* Flip                                                                     */
  /* ------------------------------------------------------------------------ */

  const toggleFlipped = () => {
    previewDirtyRef.current = true;
    setIsFlipped((prev) => !prev);
  };

  /* ------------------------------------------------------------------------ */
  /* Update items                                                             */
  /* ------------------------------------------------------------------------ */
  const handleUpdateItems = useCallback(
    (newItems: any[]) => {
      previewDirtyRef.current = true;
      update((d) => {
        d.photos.items = newItems;
      });
    },
    [update],
  );

  /* ------------------------------------------------------------------------ */
  /* Delete item                                                              */
  /* ------------------------------------------------------------------------ */
  const handleDeleteItem = useCallback((id: string) => {
    previewDirtyRef.current = true;
    update((d) => {
      d.photos.items = d.photos.items.filter((i) => i.id !== id);
    });
  }, []);

  return (
    <DesginContainer
      className="!h-fit flex-1"
      header="Design Your Blanket"
      subHeader="Create a personalized blanket with your favorite memories"
      headerComponent={
        <div className="mx-auto flex items-center gap-3">
          <Button
            onClick={() => {
              previewDirtyRef.current = true;
              setIsAddPhotoModelOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs"
          >
            <CirclePlus className="size-4" />
            Add
          </Button>

          <Button
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
            className="flex items-center gap-1 px-3 py-1.5 text-xs"
            variant="outline"
          >
            <FlipHorizontal className="size-4" />
            Flip
          </Button>
          <Button
            className="flex items-center gap-1 px-3 py-1.5 text-xs"
            variant="danger"
            onClick={resetDesign}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Toolbar */}

        {/* Canvas */}
        <div className="flex w-full justify-center">
          <Canvas
            items={items}
            isFlipped={isFlipped}
            onDeleteItem={handleDeleteItem}
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
