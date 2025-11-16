const compressImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Try WebP first (best compression + transparency support)
        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          
          // Check if WebP is supported (some older browsers may not support it)
          if (webpDataUrl.startsWith('data:image/webp')) {
            resolve(webpDataUrl);
            return;
          }
        } catch (e) {
          // WebP not supported, fallback below
        }
        
        // Fallback: Check for transparency and use PNG or JPEG
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const hasTransparency = imageData.data.some((_, i) => 
          i % 4 === 3 && imageData.data[i] < 255
        );
        
        const mimeType = hasTransparency ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        
        resolve(compressedDataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
export default compressImage;