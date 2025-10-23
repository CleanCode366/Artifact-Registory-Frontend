import type { GeoInfo } from "../../types/types";

const getCurrentLocation = (): Promise<GeoInfo> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          hasGPS: true,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
          accuracy
        });
      },
      () => reject(new Error("Location access denied"))
    );
  });
};

export default getCurrentLocation;