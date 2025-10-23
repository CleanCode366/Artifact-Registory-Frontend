import type { GeoInfo } from "../../types/types";
import parseEXIFForGPS from "./parseEXIFData";

const extractEXIFData = (file: File): Promise<GeoInfo | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const dataView = new DataView(arrayBuffer);
        
        let offset = 2;
        const maxOffset = Math.min(65535, dataView.byteLength);
        
        while (offset < maxOffset) {
          const marker = dataView.getUint16(offset);
          if (marker === 0xFFE1) {
            const length = dataView.getUint16(offset + 2);
            const exifData = arrayBuffer.slice(offset + 4, offset + 4 + length - 2);
            resolve(parseEXIFForGPS(new DataView(exifData)));
            return;
          }
          offset += 2 + dataView.getUint16(offset + 2);
        }
        resolve(null);
      } catch (error) {
        console.error('Error extracting EXIF data:', error);
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsArrayBuffer(file);
  });
};

export default extractEXIFData;