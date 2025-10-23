import extractEXIFData from "../utils/Camera/extractEXIFData";


export const useFileUpload = (onUpload: any, checkStoneCallback: any) => {
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newPhotos: string[] = [];
    const errorMessages: string[] = [];

    for (const [idx, file] of Array.from(files).entries()) {
      try {
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = async () => {
            const photoDataUrl = reader.result as string;
            const isStone = await checkStoneCallback(photoDataUrl);
            
            if (!isStone) {
              errorMessages.push(`File ${idx + 1} is not a stone inscription.`);
              return resolve();
            }
            
            newPhotos.push(photoDataUrl);
            
            const exifData = await extractEXIFData(file);
            if (exifData?.hasGPS) {
              onUpload(newPhotos, exifData, true);
            } else {
              onUpload(newPhotos, null, false);
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      } catch (err) {
        errorMessages.push(`Failed to read file ${idx + 1}.`);
      }
    }

    return { newPhotos, errorMessages };
  };

  return { handleFileUpload };
};