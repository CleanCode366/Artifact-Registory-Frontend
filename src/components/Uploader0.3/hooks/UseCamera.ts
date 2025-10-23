import { useState, useRef } from "react";
import startCameraStream from "../utils/Camera/startCameraStream";
import stopCameraStream from "../utils/Camera/stopCameraStream";
import getCurrentLocation from "../utils/Camera/getCurrentLocation";
import embedGPSIntoImage from "../utils/GPS/embedGPSIntoImage";
import verifyGPSInImage from "../utils/GPS/verifyGPSInImage";

export const useCamera = (onPhotoCapture: any) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const mediaStream = await startCameraStream();
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      setIsCapturing(false);
      throw new Error("Failed to access camera");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stopCameraStream(stream);
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = async (checkStoneCallback: any) => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      let photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      const isStone = await checkStoneCallback(photoDataUrl);
      if (!isStone) {
        stopCamera();
        return;
      }

      try {
        const locationData = await getCurrentLocation();
        
        if (locationData.latitude && locationData.longitude) {
          const imageWithGPS = embedGPSIntoImage(
            photoDataUrl,
            parseFloat(locationData.latitude),
            parseFloat(locationData.longitude),
            new Date()
          );
          
          verifyGPSInImage(imageWithGPS);
          photoDataUrl = imageWithGPS;
          
          onPhotoCapture(photoDataUrl, locationData, true);
        }
        stopCamera();
      } catch (error) {
        console.error('GPS embedding error:', error);
        onPhotoCapture(photoDataUrl, null, false);
        stopCamera();
      }
    }, 'image/jpeg', 0.8);
  };

  return { isCapturing, stream, videoRef, canvasRef, startCamera, stopCamera, capturePhoto };
};