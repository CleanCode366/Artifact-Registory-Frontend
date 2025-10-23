import type { GeoInfo } from "../types/types";


interface GPSStatusProps {
  hasGeoData: boolean;
  geoInfo: GeoInfo | null;
}

export const GPSStatus = ({ hasGeoData, geoInfo }: GPSStatusProps) => (
  <div className={`mb-4 p-3 rounded-lg text-sm ${
    hasGeoData 
      ? 'bg-green-900/50 border border-green-700 text-green-300' 
      : 'bg-yellow-900/50 border border-yellow-700 text-yellow-300'
  }`}>
    {hasGeoData ? (
      <div>
        ✅ GPS data available!
        {geoInfo?.latitude && geoInfo?.longitude && (
          <div className="mt-1 text-xs">
            <p>Coordinates: {geoInfo.latitude}, {geoInfo.longitude}</p>
            {geoInfo.accuracy && <p>Accuracy: ±{Math.round(geoInfo.accuracy)}m</p>}
            <p className="text-green-400 font-medium">📍 Embedded in image EXIF data</p>
          </div>
        )}
      </div>
    ) : (
      "⚠️ No GPS data found in image"
    )}
  </div>
);