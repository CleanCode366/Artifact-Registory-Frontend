import { getEnvConfig } from "../config/env";
import { getCookie } from "../utils/Auth/auth";
import type { PostSchema, GeoInfo } from "../types/types";
import { X } from "lucide-react";

export const uploadInscription = async (
  photos: string[],
  formData: PostSchema,
  geoInfo: GeoInfo | null
) => {
  const form = new FormData();
  
  for (let i = 0; i < photos.length; i++) {
    const res = await fetch(photos[i]);
    const blob = await res.blob();
    form.append("files", blob, `inscription_${i + 1}.jpg`);
  }

  const postData: PostSchema = {
    ...formData,
    description: {
      ...formData.description,
      geoLocation: geoInfo?.latitude && geoInfo?.longitude
        ? `${geoInfo.latitude}, ${geoInfo.longitude}`
        : undefined
    }
  };

  const token = getCookie("token");
  const xsrfToken = getCookie("XSRF-TOKEN");
  form.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));

  const { backendApiUrl } = getEnvConfig();
  const response = await fetch(`${backendApiUrl}post/addPostWithFile`, {
    credentials: 'include',
    method: "POST",
    headers: { 
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": xsrfToken || ""
    },
    body: form
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} - ${errorText}`);
  }
};
