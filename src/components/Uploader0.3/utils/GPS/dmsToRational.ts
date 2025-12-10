const dmsToRational = (dms: [number, number, number]): [[number, number], [number, number], [number, number]] => {
  return [
    [Math.round(dms[0]), 1],
    [Math.round(dms[1]), 1],
    [Math.round(dms[2] * 100), 100] // Keep 2 decimal places for seconds
  ];
};

export default dmsToRational;