
const decimalToDMS = (decimal: number): [number, number, number] => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;
  
  return [degrees, minutes, Math.round(seconds * 100) / 100];
};

export default decimalToDMS;