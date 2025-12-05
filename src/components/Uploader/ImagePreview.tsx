import React from 'react';

interface ImagePreviewProps {
  photo: string;
  onReset: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ photo, onReset }) => (
  <div className="w-full">
    <img
      src={photo}
      alt="Captured"
      className="w-full h-60 object-cover rounded-lg mb-4"
    />
    <div className="flex gap-3 justify-center">
      <button
        onClick={onReset}
        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer"
      >
        Take Another
      </button>
    </div>
  </div>
);
