import type { GeoInfo } from "../types/types";


interface SuggestionControlsProps {
  isFetching: boolean;
  onFetch: (lat?: string, lon?: string) => void;
  geoInfo: GeoInfo | null;
  suggestion: string | null;
  onUseSuggestion: (text: string) => void;
}

const SuggestionControls: React.FC<SuggestionControlsProps> = ({
  isFetching,
  onFetch,
  geoInfo,
  suggestion,
  onUseSuggestion
}) => {
  const handleUseSuggestion = async () => {
    if (!suggestion) return;
    onUseSuggestion(suggestion);
    try {
      await navigator.clipboard.writeText(suggestion);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => onFetch()}
        disabled={isFetching}
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
      >
        {isFetching ? "Suggesting…" : "Suggest Description"}
      </button>
      
      <button
        onClick={() => {
          if (geoInfo?.latitude && geoInfo?.longitude) {
            onFetch(geoInfo.latitude, geoInfo.longitude);
          } else {
            onFetch();
          }
        }}
        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
      >
        Use current location
      </button>
      
      {suggestion && (
        <button
          onClick={handleUseSuggestion}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
        >
          Use suggestion
        </button>
      )}
    </div>
  );
};

export default SuggestionControls;