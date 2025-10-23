const stopCameraStream = (stream: MediaStream): void => {
  stream.getTracks().forEach(track => track.stop());
};
export default stopCameraStream;