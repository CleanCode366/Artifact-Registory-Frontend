import { getEnvConfig } from "../config/env";

export const checkStoneInscription = async (
  imageDataUrl: string,
  setIsChecking: (val: boolean) => void,
  setResult: (val: string | null) => void,
  setError: (val: string | null) => void
): Promise<boolean> => {
  setIsChecking(true);
  setResult(null);
  
  try {
    const res = await fetch(imageDataUrl);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append("file", blob, "inscription.jpg");

    const { backendDetectUrl } = getEnvConfig();
    const response = await fetch(`${backendDetectUrl}predict/`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data?.detail?.toLowerCase().includes("suspicious content")) {
      setResult("Suspicious content detected");
      setError("Upload restricted: Suspicious content detected in file.");
      return false;
    }

    if (data?.result === "Stone Inscription") {
      setResult(data.result);
      return true;
    }
    
    setResult(data?.result || "Not a Stone Inscription");
    setError("Upload restricted: Not a Stone Inscription.");
    return false;
  } catch (err) {
    setError("Failed to check inscription type.");
    return false;
  } finally {
    setIsChecking(false);
  }
};
