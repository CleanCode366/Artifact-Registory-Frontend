import React, { type ChangeEvent } from 'react';

interface InitialViewProps {
  onStartCamera: () => void;
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InitialView: React.FC<InitialViewProps> = ({
  onStartCamera,
  onFileUpload
}) => (
  <div className="w-full">
    <div className="w-full h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl mb-4">
      <p className="text-gray-500 text-sm text-center">
        Take a photo with location data<br />
        or upload an image with GPS info
      </p>
    </div>

    <div className="w-full mb-4">
      <button
        onClick={onStartCamera}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition cursor-pointer mb-3"
      >
        Open Camera
      </button>
      
      <div className="text-center text-sm text-primary-text mb-3">
        or
      </div>

      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="hidden"
        />
        <div className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer text-center">
          Upload Image with GPS
        </div>
      </label>
    </div>

    <p className="text-xs text-gray-500 mb-4 text-center">
      📍 Only images with location data are accepted<br />
      Supported formats: JPG, PNG, TIFF<br />
      Maximum size: 5MB per file
    </p>
  </div>
);
