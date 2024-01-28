export interface IDifferenceInTime {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
  years: number;
}

export function getDifferenceInTime(time1: number, time2: number): IDifferenceInTime {
  const interval = new Date(time1 - time2);

  return {
    seconds: interval.getUTCSeconds(),
    minutes: interval.getUTCMinutes(),
    hours: interval.getUTCHours(),
    days: interval.getUTCDate() - 1,
    months: interval.getUTCMonth(),
    years: interval.getUTCFullYear() - 1970,
  };
}
