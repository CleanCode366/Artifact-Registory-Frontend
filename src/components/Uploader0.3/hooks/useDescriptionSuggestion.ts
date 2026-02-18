import { useState } from "react";
import getCurrentLocation from "../utils/Camera/getCurrentLocation";
import { getEnvConfig } from "../config/env";

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

      const { webhookUrl } = getEnvConfig();
      const url = `${webhookUrl}?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Service returned ${res.status}`);

      let text = "";
      const outer = await res.json(); // first parse

      if (outer.text) {
        const inner = JSON.parse(outer.text); // second parse
        text = inner.description;
      } else {
        text = outer.description || outer.suggestion || "";
      }

      setSuggestion(text);

    } catch (err) {
      setSuggestion("Failed to get suggestion.");
    } finally {
      setIsFetching(false);
    }
  };

  return { suggestion, setSuggestion, isFetching, fetchSuggestion };
};