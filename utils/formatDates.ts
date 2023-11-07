import formatMinutes from "./formateMinutes";

const formatDates = (date: string, minutes: number) => {
  const resDate = new Date(date);
  let startHours: number | string = resDate.getHours();
  let startMin: number | string = resDate.getMinutes();

  const { min, hours } = formatMinutes(minutes);

  let resMin: number | string = startMin + min;
  let resHours: number | string = hours + startHours;

  if (resMin >= 60) {
    resHours += 1;
    resMin -= 60;
  }

  if (resHours >= 24) resHours -= 24;

  if (startHours.toString().length === 1) startHours = `0${startHours}`;
  if (resHours.toString().length === 1) resHours = `0${resHours}`;
  if (resMin.toString().length === 1) resMin = `0${resMin}`;
  if (startMin.toString().length === 1) startMin = `0${startMin}`;

  return `${startHours}:${startMin} - ${resHours}:${resMin}`;
};

export default formatDates;
