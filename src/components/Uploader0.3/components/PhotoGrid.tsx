interface PhotoGridProps {
  photos: string[];
  onReset: () => void;
}

export const PhotoGrid = ({ photos, onReset }: PhotoGridProps) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-2">
      {photos.map((photo, idx) => (
        <img
          key={idx}
          src={photo}
          alt={`Captured inscription ${idx + 1}`}
          className="w-full h-32 object-cover rounded-lg"
        />
      ))}
    </div>
    <button
      onClick={onReset}
      className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
    >
      Upload More Photos
    </button>
  </div>
);
