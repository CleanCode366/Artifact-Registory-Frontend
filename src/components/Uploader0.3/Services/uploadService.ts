import { getEnvConfig } from "../config/env";
import { getCookie } from "../utils/Auth/auth";
import type { PostSchema, GeoInfo } from "../types/types";

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
  form.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));

  const { backendApiUrl } = getEnvConfig();
  const response = await fetch(`${backendApiUrl}post/addPostWithFile`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} - ${errorText}`);
  }
};
