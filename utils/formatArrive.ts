import formatMinutes from "./formateMinutes";

const formatArrive = (minutes: number) => {
  const { hours, min } = formatMinutes(minutes);

  return `${hours}ч ${min}м`;
};

export default formatArrive;
