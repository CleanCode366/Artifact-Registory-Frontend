import React from 'react';
import type { RefObject } from "react";

export interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onCapture: () => void;
  onCancel: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  onCapture,
  onCancel
}) => (
  <div className="w-full">
    <video
      ref={videoRef}
      className="w-full h-60 object-cover rounded-lg mb-4"
      autoPlay
      muted
    />
    <canvas ref={canvasRef} className="hidden" />
    
    <div className="flex gap-3 justify-center">
      <button
        onClick={onCapture}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition cursor-pointer"
      >
        Capture Photo
      </button>
      <button
        onClick={onCancel}
        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </div>
);
