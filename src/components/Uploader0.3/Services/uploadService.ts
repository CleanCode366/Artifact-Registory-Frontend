import { coreBackendClient } from "@/utils/http/clients/coreBackend.client";
import type { PostSchema, GeoInfo } from "../types/types";

export const uploadInscription = async (
  photos: string[],
  formData: PostSchema,
  geoInfo: GeoInfo | null
) => {
  try {
    console.log("[UPLOAD] Starting inscription upload...");
    console.log("[UPLOAD] Total photos:", photos.length);

    const form = new FormData();

    // Convert photo URLs → Blob and append to FormData
    for (let i = 0; i < photos.length; i++) {
      console.log(`[UPLOAD] Processing photo ${i + 1}/${photos.length}`);

      const res = await fetch(photos[i]);

      if (!res.ok) {
        throw new Error(`Failed to fetch photo at index ${i}`);
      }

      const blob = await res.blob();
      form.append("files", blob, `inscription_${i + 1}.jpg`);
    }

    const postData: PostSchema = {
      ...formData,
      description: {
        ...formData.description,
        geoLocation:
          geoInfo?.latitude && geoInfo?.longitude
            ? `${geoInfo.latitude}, ${geoInfo.longitude}`
            : undefined,
      },
    };

    // Attach metadata JSON as blob
    form.append(
      "post",
      new Blob([JSON.stringify(postData)], {
        type: "application/json",
      })
    );

    console.log("[UPLOAD] Sending request to backend...");

    const response = await coreBackendClient.post(
      "post/addPostWithFile",
      form
    );

    console.log("[UPLOAD] Raw response:", response);

    if (!response?.data) {
      throw new Error("Empty response from server");
    }

    const { data } = response.data;
    console.log("[UPLOAD] Parsed response data:", data);

    // Case 1: Structured response with `ok`
    if (typeof data === "object" && data !== null && "ok" in data) {
      if (!data.ok) {
        const errorMessage =
          (data as any).error_message ||
          "Backend returned failure without message";

        console.error("[UPLOAD] Backend rejected upload:", {
          status: response.status,
          error: errorMessage,
        });

        throw new Error(
          `${response.status || "HTTP?"} - ${errorMessage}`
        );
      }

      console.log("[UPLOAD] Upload successful (structured response)");
      return data;
    }

    // Case 2: Raw object response
    if (typeof data === "object" && data !== null) {
      console.log("[UPLOAD] Upload successful (raw object response)");
      return data;
    }

    console.error("[UPLOAD] Unexpected response format:", data);
    throw new Error("Unexpected server response format");

  } catch (error: any) {
    console.error("[UPLOAD] Upload failed:", error);

    // Axios error with backend response
    if (error?.response?.data) {
      const backendError = error.response.data;

      const meaningfulMessage =
        backendError.error_message ||   // your backend field
        backendError.message ||         // fallback common field
        "Request failed";

      throw new Error(meaningfulMessage);
    }

    // Network or unknown error
    throw new Error(
      error?.message || "Unexpected server error. Please try again later."
    );
  }

};
