// useDescriptionSuggestion.ts
import { useState } from "react";
import getCurrentLocation from "../utils/Camera/getCurrentLocation";
import { suggestionApiClient } from "@/utils/http/clients/suggestionApi.client";

export const useDescriptionSuggestion = (geoInfo: any) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSuggestion = async (lat?: string, lon?: string) => {
    setSuggestion(null);
    setIsFetching(true);

    try {
      let latitude = lat || geoInfo?.latitude;
      let longitude = lon || geoInfo?.longitude;

      if (!latitude || !longitude) {
        const loc = await getCurrentLocation();
        latitude = loc.latitude;
        longitude = loc.longitude;
      }

      if (!latitude || !longitude) throw new Error("No coordinates available");

      // Use axios client with POST (matching your original axios snippet)
      const res = await suggestionApiClient.post("", {
        lat: Number(latitude),   // send as number, not string — matches Postman payload
        lon: Number(longitude),
      });

      console.log("API response:", res.data); // Debug log to inspect response structure

      const outer = res.data;
      let text = "";

      if (outer.text) {
        const inner = JSON.parse(outer.text); // second parse if nested
        text = inner.description || "";
      } else {
        text = outer.description || outer.suggestion || "";
      }

      setSuggestion(text);
      return text;
    } catch (err) {
      const errorText = "Failed to get suggestion.";
      setSuggestion(errorText);
      return errorText;
    } finally {
      setIsFetching(false);
    }
  };

  return { suggestion, setSuggestion, isFetching, fetchSuggestion };
};