import piexifjs from 'piexifjs';

const verifyGPSInImage = (imageDataUrl: string): { hasGPS: boolean; coordinates?: { lat: number; lon: number } } => {
  try {
    const exifObj = piexifjs.load(imageDataUrl) as {
      GPS?: { [key: number]: any }
    };

    if (
      exifObj.GPS &&
      exifObj.GPS[piexifjs.GPSIFD.GPSLatitude] &&
      exifObj.GPS[piexifjs.GPSIFD.GPSLongitude]
    ) {
      const latRational = exifObj.GPS[piexifjs.GPSIFD.GPSLatitude];
      const lonRational = exifObj.GPS[piexifjs.GPSIFD.GPSLongitude];
      const latRef = exifObj.GPS[piexifjs.GPSIFD.GPSLatitudeRef];
      const lonRef = exifObj.GPS[piexifjs.GPSIFD.GPSLongitudeRef];

      // Convert rational to decimal
      const latDecimal =
        latRational[0][0] / latRational[0][1] +
        latRational[1][0] / latRational[1][1] / 60 +
        latRational[2][0] / latRational[2][1] / 3600;

      const lonDecimal =
        lonRational[0][0] / lonRational[0][1] +
        lonRational[1][0] / lonRational[1][1] / 60 +
        lonRational[2][0] / lonRational[2][1] / 3600;

      return {
        hasGPS: true,
        coordinates: {
          lat: latRef === 'S' ? -latDecimal : latDecimal,
          lon: lonRef === 'W' ? -lonDecimal : lonDecimal,
        },
      };
    }

    return { hasGPS: false };
  } catch (error) {
    console.error('Error verifying GPS data:', error);
    return { hasGPS: false };
  }
};

export default verifyGPSInImage;