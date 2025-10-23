import { Camera, Upload } from "lucide-react";

interface PhotoUploadAreaProps {
  onStartCamera: () => void;
  onUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoUploadArea = ({ 
  onStartCamera, 
  onUploadClick, 
  fileInputRef, 
  onFileChange 
}: PhotoUploadAreaProps) => (
  <div className="space-y-4">
    <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
      <Camera size={48} className="text-orange-500 mb-4" />
      <p className="text-gray-400 text-center text-sm">
        Capture photos with embedded GPS coordinates
      </p>
    </div>
    <div className="flex gap-3">
      <button
        onClick={onStartCamera}
        className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
      >
        <Camera size={16} />
        Take Photo
      </button>
      <button
        onClick={onUploadClick}
        className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
      >
        <Upload size={16} />
        Upload
      </button>
    </div>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      multiple
      onChange={onFileChange}
      className="hidden"
    />
  </div>
);