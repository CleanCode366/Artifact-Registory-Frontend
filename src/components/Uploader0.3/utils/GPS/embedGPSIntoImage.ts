import decimalToDMS from "./decimalToDMS";
import piexifjs from "piexifjs";
import dmsToRational from "./dmsToRational";

const embedGPSIntoImage = (
  imageDataUrl: string, 
  latitude: number, 
  longitude: number, 
  timestamp?: Date
): string => {
  try {
    // console.log('Attempting to embed GPS coordinates:', { latitude, longitude });
    
    // Load existing EXIF data or create new
    type ExifSection = { [key: number]: any };
    let exifObj: {
      "0th": ExifSection;
      "Exif": ExifSection;
      "GPS": { [key: number]: any }; // Allow number indexing for GPS
      "1st": ExifSection;
      "thumbnail": any;
    };
    
    try {
      // Load EXIF and normalize to ensure required sections are present.
      const loaded = piexifjs.load(imageDataUrl) as any;
      exifObj = {
        "0th": (loaded && loaded["0th"]) || {},
        "Exif": (loaded && loaded["Exif"]) || {},
        "GPS": (loaded && loaded["GPS"]) || {},
        "1st": (loaded && loaded["1st"]) || {},
        "thumbnail": (loaded && loaded["thumbnail"]) || null
      };
    } catch {
      // Create new EXIF structure if none exists
      exifObj = {
        "0th": {},
        "Exif": {},
        "GPS": {},
        "1st": {},
        "thumbnail": null
      };
    }
    
    // Convert coordinates to DMS format
    const latDMS = decimalToDMS(latitude);
    const lonDMS = decimalToDMS(longitude);
    
    // Set GPS data in EXIF
    exifObj.GPS[piexifjs.GPSIFD.GPSLatitude] = dmsToRational(latDMS);
    exifObj.GPS[piexifjs.GPSIFD.GPSLatitudeRef] = latitude >= 0 ? 'N' : 'S';
    exifObj.GPS[piexifjs.GPSIFD.GPSLongitude] = dmsToRational(lonDMS);
    exifObj.GPS[piexifjs.GPSIFD.GPSLongitudeRef] = longitude >= 0 ? 'E' : 'W';
    
    // Add timestamp if provided
    if (timestamp) {
      const dateStr = timestamp.toISOString().split('T')[0].replace(/-/g, ':');
      const timeStr = timestamp.toTimeString().split(' ')[0];
      
      exifObj.GPS[piexifjs.GPSIFD.GPSDateStamp] = dateStr;
      exifObj.GPS[piexifjs.GPSIFD.GPSTimeStamp] = timeStr.split(':').map((t, i) => 
        i === 2 ? [Math.round(parseFloat(t) * 100), 100] : [parseInt(t), 1]
      );
    }
    
    // Add some standard EXIF data
    exifObj["0th"][piexifjs.ImageIFD.Make] = "Inscription App";
    exifObj["0th"][piexifjs.ImageIFD.Model] = "Web Camera";
    exifObj["0th"][piexifjs.ImageIFD.DateTime] = new Date().toISOString().replace('T', ' ').split('.')[0];
    
    // Convert EXIF object to binary
    const exifBytes = piexifjs.dump(exifObj);
    
    // Insert EXIF data into image
    const newImageDataUrl = piexifjs.insert(exifBytes, imageDataUrl);
    
    // console.log('GPS coordinates embedded successfully');
    return newImageDataUrl;
  } catch (error) {
    console.error('Error embedding GPS data:', error);
    return imageDataUrl; // Return original if embedding fails
  }
};

export default embedGPSIntoImage;