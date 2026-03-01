import { useState, useCallback, useEffect, useRef } from "react";
import { CirclePlus, FlipHorizontal } from "lucide-react";

import DesginContainer from "./DesginContainer";
import Canvas from "./Canvas/Canvas";
import AddPhotosModel from "./AddPhotosModel";

import { useDesign } from "src/context/desgin.context";
import Toast from "src/components/ui/Toast";
const DesignArea = () => {
  const { designData, update } = useDesign();

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
  const handleDeleteItem = (id: string) => {
    previewDirtyRef.current = true;
    update((d) => {
      d.photos.items = d.photos.items.filter((i) => i.id !== id);
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Upload preview on unmount                                                */
  /* ------------------------------------------------------------------------ */
  // useEffect(() => {
  //   return () => {
  //     console.log(designData)
  //   };
  // }, [location.pathname]);

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */
  return (
    <DesginContainer
      className="!h-fit flex-1"
      header="Design Your Blanket"
      subHeader="Create a personalized blanket with your favorite memories"
    >
      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="mx-auto flex items-center gap-3  shadow-xl bg-neutral-50 rounded-xl px-3 py-2 ">
          <button
            onClick={() => {
              previewDirtyRef.current = true;
              setIsAddPhotoModelOpen(true);
            }}
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
