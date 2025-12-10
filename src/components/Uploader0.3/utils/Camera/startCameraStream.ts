const startCameraStream = async (): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({
    video: { 
      facingMode: "environment",
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    }
  });
};

export default startCameraStream;