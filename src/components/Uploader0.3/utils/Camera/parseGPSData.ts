import type { GeoInfo } from "../../types/types";

const parseGPSData = (dataView: DataView, gpsOffset: number, isLittleEndian: boolean): GeoInfo | null => {
  try {
    const gpsEntries = isLittleEndian 
      ? dataView.getUint16(gpsOffset, true)
      : dataView.getUint16(gpsOffset, false);
    
    let latRef = null, lonRef = null;
    let currentOffset = gpsOffset + 2;
    
    for (let i = 0; i < gpsEntries; i++) {
      const tag = isLittleEndian 
        ? dataView.getUint16(currentOffset, true)
        : dataView.getUint16(currentOffset, false);
      
      if (tag === 1) latRef = String.fromCharCode(dataView.getUint8(currentOffset + 8));
      if (tag === 3) lonRef = String.fromCharCode(dataView.getUint8(currentOffset + 8));
      
      currentOffset += 12;
    }
    
    if (latRef && lonRef) {
      return { hasGPS: true, latRef, lonRef };
    }
    return null;
  } catch (error) {
    console.error('Error parsing GPS data:', error);
    return null;
  }
};

export default parseGPSData;