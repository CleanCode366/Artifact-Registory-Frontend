import React, { useState, type ChangeEvent } from "react";
import type { GeoInfo, UploadedImageData } from '@/types'
import { extractEXIFData } from '@utils/exifUtils';
import { saveImageToIndexedDB } from '@utils/indexedDB';
import { useCamera } from '@hooks/useCamera';
import { ErrorMessage } from './ErrorMessage';
import { GPSStatus } from './GPSStatus';
import { CameraView } from './CameraView';
import { ImagePreview } from './ImagePreview';
import { InitialView } from './InitialView';
import { UploadButton } from './UploadButton';

const UploaderImage: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasGeoData, setHasGeoData] = useState<boolean | null>(null);
  const [geoInfo, setGeoInfo] = useState<GeoInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const camera = useCamera();

  const handleStartCamera = async () => {
    try {
      setError(null);
      await camera.startCamera();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start camera");
    }
  };

  const handleCapturePhoto = async () => {
    try {
      const { photo: photoData, geoInfo: locationData } = await camera.capturePhoto();
      setPhoto(photoData);
      setGeoInfo(locationData);
      setHasGeoData(true);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Location")) {
        setError("Location access denied. Please enable location services and try again.");
        setHasGeoData(false);
      } else {
        setError(err instanceof Error ? err.message : "Failed to capture photo");
      }
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    
    try {
      const exifData = await extractEXIFData(file);
      
      if (exifData && exifData.hasGPS) {
        setHasGeoData(true);
        setGeoInfo(exifData);
        
        const reader = new FileReader();
        reader.onload = () => setPhoto(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setError("This image doesn't contain location data. Please use the camera to take a new photo with location enabled.");
        setHasGeoData(false);
      }
    } catch (err) {
      setError("Failed to read image metadata. Please try again.");
    }
  };

  const handleUpload = async () => {
    if (!photo || !geoInfo) return;

    setIsUploading(true);
    
    try {
      const imageData: UploadedImageData = {
        photo,
        geoInfo,
        timestamp: new Date().toISOString()
      };

      await saveImageToIndexedDB(imageData);
      alert("Image saved to IndexedDB!");
      resetPhoto();
    } catch (error) {
      setError("Failed to save image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    setHasGeoData(null);
    setGeoInfo(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-4">
      <div className="bg-secondary-background rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center">
        {error && <ErrorMessage message={error} />}
        <GPSStatus hasGeoData={hasGeoData} geoInfo={geoInfo} />

        {camera.isCapturing ? (
          <CameraView
            videoRef={camera.videoRef}
            canvasRef={camera.canvasRef}
            onCapture={handleCapturePhoto}
            onCancel={camera.stopCamera}
          />
        ) : photo ? (
          <ImagePreview photo={photo} onReset={resetPhoto} />
        ) : (
          <InitialView
            onStartCamera={handleStartCamera}
            onFileUpload={handleFileUpload}
          />
        )}
      </div>

      {photo && hasGeoData && (
        <UploadButton onUpload={handleUpload} disabled={isUploading} />
      )}
    </div>
  );
};

export default UploaderImage;