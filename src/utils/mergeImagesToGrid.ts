type MergeResult = {
  blob: Blob;
  previewUrl: string;
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // IMPORTANT for canvas
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const getGrid = (count: number) => {
  if (count === 1) return { rows: 1, cols: 1 };
  if (count === 2) return { rows: 1, cols: 2 };
  return { rows: 2, cols: 2 }; // 3 or 4
};

export async function mergeImagesToGrid(
  imageUrls: string[],
): Promise<MergeResult> {
  if (imageUrls.length === 0 || imageUrls.length > 4) {
    throw new Error("mergeImagesToGrid supports 1–4 images only");
  }

  const images = await Promise.all(
    imageUrls.map((url) => loadImage(url)),
  );

  const count = images.length;

  // Grid rules
  let rows = 1;
  let cols = 1;

  if (count === 2) {
    rows = 1;
    cols = 2;
  } else if (count === 3 || count === 4) {
    rows = 2;
    cols = 2;
  }

  const cellWidth = Math.max(...images.map((img) => img.width));
  const cellHeight = Math.max(...images.map((img) => img.height));

  const canvas = document.createElement("canvas");
  canvas.width = cellWidth * cols;
  canvas.height = cellHeight * rows;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  images.forEach((img, index) => {
    // SPECIAL CASE: 3 images → last one full width
    if (count === 3 && index === 2) {
      ctx.drawImage(
        img,
        0,                  // x
        cellHeight,         // y (second row)
        canvas.width,       // full width
        cellHeight,         // one row height
      );
      return;
    }

    const row = Math.floor(index / cols);
    const col = index % cols;

    ctx.drawImage(
      img,
      col * cellWidth,
      row * cellHeight,
      cellWidth,
      cellHeight,
    );
  });

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob(
      (b) => resolve(b as Blob),
      "image/png",
      1,
    ),
  );

  const previewUrl = URL.createObjectURL(blob);

  return { blob, previewUrl };
}
