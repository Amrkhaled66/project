import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cornerImages as defaultCorners } from "src/data/images";
import UploadImage from "src/components/ui/UploadImage";

export default function CornersPool() {
  const [customImages, setCustomImages] = useState<string[]>([]);

  const handleUpload = (images: string[]) => {
    setCustomImages((prev) => [...prev, ...images]);
  };

  const allImages = [...defaultCorners, ...customImages];

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-neutral-200 p-3">
      {/* Upload Button */}
      <UploadImage onUpload={handleUpload} />
      {/* Default + Custom Draggable Images */}
      {allImages.map((src, i) => (
        <CornerImage key={i} id={`${src}-${i}`} src={src} />
      ))}
    </div>
  );
}

function CornerImage({ id, src }: { id: string; src: string }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id,
    data: { image: src, type: "corner-image" },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={src}
      style={style}
      className="size-16 cursor-grab rounded border object-cover shadow-sm active:cursor-grabbing"
    />
  );
}
