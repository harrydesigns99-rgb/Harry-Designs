/**
 * Image Optimizer Utility
 * Automatically resizes and compresses image files (using HTML Canvas)
 * so they can safely fit in browser localStorage without exceeding quotas
 * while retaining crisp high-resolution quality.
 */

export function optimizeImageFile(file, maxWidth = 1000, maxHeight = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    // Direct pass-through for vector SVGs
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = (e) => reject(e);
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();

      img.onerror = () => {
        // Fallback to raw dataURL if image decode fails
        resolve(dataUrl);
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down proportionally if larger than maximum target bounds
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          // Crisp rendering smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Use JPEG for portraits & photos for superior compression
          const isTransparentPng = file.type === 'image/png';
          const exportType = isTransparentPng ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(exportType, quality);

          resolve(optimizedDataUrl);
        } catch {
          // If canvas fails (e.g., tainted or memory), fallback gracefully
          resolve(dataUrl);
        }
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}

