const formatMinutes = (minutes: number) => {
  return { min: minutes % 60, hours: Math.trunc(minutes / 60) };
};

export default formatMinutes;
