import React from "react";
import type { GeoInfo, PostSchema } from "../types/types";
import FormField from "./FormField";
import SuggestionControls from "./SuggestionControls";

interface InscriptionFormProps {
  formData: PostSchema;
  onChange: (field: string, value: any) => void;
  suggestion: string | null;
  onSuggestionClose: () => void;
  isFetchingSuggestion: boolean;
  onFetchSuggestion: (lat?: string, lon?: string) => void;
  geoInfo: GeoInfo | null;
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({
  formData,
  onChange,
  suggestion,
  onSuggestionClose,
  isFetchingSuggestion,
  onFetchSuggestion,
  geoInfo
}) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Title"
        value={formData.description.title || ""}
        onChange={(value) => onChange("description.title", value)}
        placeholder="Stone Inscription Title"
      />
      
      <FormField
        label="Subject"
        value={formData.description.subject || ""}
        onChange={(value) => onChange("description.subject", value)}
        placeholder="Ancient History"
      />
      
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description.description || ""}
          onChange={(e) => onChange("description.description", e.target.value)}
          placeholder="This inscription belongs to the 12th century temple walls."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
          rows={3}
        />
        
        <SuggestionControls
          isFetching={isFetchingSuggestion}
          onFetch={onFetchSuggestion}
          geoInfo={geoInfo}
          suggestion={suggestion}
          onUseSuggestion={(text) => onChange("description.description", text)}
        />

        {suggestion && (
          <div className="mt-3 p-3 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-200">
            <div className="flex justify-between items-start">
              <strong className="text-xs text-gray-300">Suggested description</strong>
              <button
                onClick={onSuggestionClose}
                className="text-xs text-gray-400 hover:text-gray-200"
              >
                Close
              </button>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-xs">{suggestion}</p>
          </div>
        )}
      </div>
      
      {/* <FormField
        label="Script Language (comma separated)"
        value={formData.description.scriptLanguage?.join(", ") || ""}
        onChange={(value) => onChange("description.scriptLanguage", value.split(",").map(s => s.trim()).filter(Boolean))}
        placeholder="Devanagari, Tamil"
      /> */}
      
      <FormField
        label="Language (comma separated)"
        value={formData.description.language?.join(", ") || ""}
        onChange={(value) => onChange("description.language", value.split(",").map(s => s.trim()).filter(Boolean))}
        placeholder="Sanskrit, Prakrit"
      />
      
      <FormField
        label="Topic"
        value={formData.topic || ""}
        onChange={(value) => onChange("topic", value)}
        placeholder="Temple Inscriptions"
      />
      
      <FormField
        label="Script (comma separated)"
        value={formData.script?.join(", ") || ""}
        onChange={(value) => onChange("script", value.split(",").map(s => s.trim()).filter(Boolean))}
        placeholder="Grantha, Brahmi"
      />
      
      <FormField
        label="Type"
        value={formData.type || ""}
        onChange={(value) => onChange("type", value)}
        placeholder="Stone"
      />
    </div>
  );
};

export default InscriptionForm;