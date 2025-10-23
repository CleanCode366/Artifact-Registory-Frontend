export const InfoFooter = () => (
  <div className="bg-gray-800/50 p-3 rounded-lg text-xs text-gray-400">
    <p className="mb-1">📍 <strong>GPS EXIF Embedding:</strong></p>
    <ul className="list-disc list-inside space-y-1 text-xs">
      <li>Camera photos: GPS coordinates embedded directly in image EXIF data</li>
      <li>Uploaded files: Existing GPS EXIF data preserved and detected</li>
      <li>Standard EXIF format compatible with all photo applications</li>
    </ul>
  </div>
);