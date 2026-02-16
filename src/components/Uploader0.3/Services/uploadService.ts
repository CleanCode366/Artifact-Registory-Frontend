import { coreBackendClient } from "@/utils/http/clients/coreBackend.client";
import { getEnvConfig } from "../config/env";
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

  // const token = getCookie("token");
  // const xsrfToken = getCookie("XSRF-TOKEN");
  // form.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));

  const { backendApiUrl } = getEnvConfig();

  // Attach JSON metadata as a blob so backend can read multipart payload
  form.append("post", new Blob([JSON.stringify(postData)], { type: "application/json" }));

  console.log("uploadInscription: sending upload", {
    filesCount: photos.length,
    postDataPreview: { ...postData, description: { ...postData.description, englishTranslation: undefined } },
    url: `${backendApiUrl}post/addPostWithFile`
  });

  const response = await coreBackendClient.post(`${backendApiUrl}post/addPostWithFile`, form, {
    // Let axios set Content-Type with boundary for FormData
    // withCredentials is enabled on client
  });

  console.log("uploadInscription: response:", { status: response?.status, data: response?.data });

  const respBody = response?.data;
  if (typeof respBody === 'object' && respBody !== null && 'ok' in respBody) {
    if (!respBody.ok) {
      const msg = respBody.message || JSON.stringify(respBody);
      throw new Error(`${response.status || 'HTTP?'} - ${msg}`);
    }
    return respBody.data ?? respBody;
  }

  // If backend returns a raw object
  if (typeof respBody === 'object' && respBody !== null) {
    return respBody;
  }

  throw new Error('Unexpected response shape from addPostWithFile');
};
