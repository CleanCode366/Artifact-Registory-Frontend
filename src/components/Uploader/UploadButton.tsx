import React from 'react';

interface UploadButtonProps {
  onUpload: () => void;
  disabled?: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload, disabled = false }) => (
  <button
    onClick={onUpload}
    disabled={disabled}
    className="mt-4 bg-primary hover:bg-primary-dark text-primary-text px-8 py-3 rounded-full font-medium transition cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Upload
  </button>
);
