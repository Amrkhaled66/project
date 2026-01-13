// import { useRef, useState } from "react";
// import { Loader2 } from "lucide-react";

// import compressImage from "src/utils/CompressImage";
// import { Upload } from "lucide-react";

// export default function UploadImage({
//   onUpload,
// }: {
//   onUpload: (files: string[]) => void;
// }) {
//   const fileRef = useRef<HTMLInputElement | null>(null);
//   const [isCompressing, setIsCompressing] = useState(false);

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     setIsCompressing(true);

//     try {
//       const compressionPromises: Promise<File>[] = [];

//       for (let i = 0; i < files.length; i++) {
//         // Compress each image to 600x600 max with 85% quality
//         compressionPromises.push(compressImage(files[i], 600, 600, 0.85));
//       }

//       const compressedImages = await Promise.all(compressionPromises);
//       onUpload(compressedImages);
//     } catch (error) {
//       console.error("Failed to compress images:", error);
//       alert("Failed to process some images. Please try again.");
//     } finally {
//       setIsCompressing(false);
//       // Reset input so same files can be uploaded again
//       if (fileRef.current) {
//         fileRef.current.value = "";
//       }
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => fileRef.current?.click()}
//         disabled={isCompressing}
//         className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         {isCompressing ? (
//           <Loader2 className="size-5 animate-spin text-neutral-500" />
//         ) : (
//           <Upload className="size-5" />
//         )}
//       </button>

//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         multiple
//         className="hidden"
//         onChange={handleUpload}
//         disabled={isCompressing}
//       />
//     </>
//   );
// }
