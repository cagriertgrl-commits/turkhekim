/**
 * Resmi Canvas ile sıkıştırır ve base64 data URL döndürür.
 * maxW/maxH aşılırsa orantılı küçültür.
 */
export function gorselSikistir(file, maxW, maxH, kalite = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { naturalWidth: w, naturalHeight: h } = img;
      const oran = Math.min(maxW / w, maxH / h, 1);
      w = Math.round(w * oran);
      h = Math.round(h * oran);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", kalite));
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}
