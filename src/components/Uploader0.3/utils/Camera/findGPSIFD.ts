import type { GeoInfo } from "../../types/types";
import parseGPSData from "./parseGPSData";

const findGPSIFD = (dataView: DataView, ifdOffset: number, isLittleEndian: boolean): GeoInfo | null => {
  try {
    const numEntries = isLittleEndian 
      ? dataView.getUint16(ifdOffset, true)
      : dataView.getUint16(ifdOffset, false);
    
    let currentOffset = ifdOffset + 2;
    
    for (let i = 0; i < numEntries; i++) {
      const tag = isLittleEndian 
        ? dataView.getUint16(currentOffset, true)
        : dataView.getUint16(currentOffset, false);
      
      if (tag === 0x8825) {
        const gpsOffset = isLittleEndian 
          ? dataView.getUint32(currentOffset + 8, true)
          : dataView.getUint32(currentOffset + 8, false);
        
        return parseGPSData(dataView, ifdOffset - 4 + gpsOffset, isLittleEndian);
      }
      currentOffset += 12;
    }
    return null;
  } catch (error) {
    console.error('Error finding GPS IFD:', error);
    return null;
  }
};

export default findGPSIFD;