import { getDifferenceInTime } from "./getDifferenceInTime";
import { getNoun } from "./getNoun";

const translations: Record<string, [string, string, string]> = {
  seconds: ["секунду", "секунды", "секунд"],
  minutes: ["минуту", "минуты", "минут"],
  hours: ["час", "часа", "часов"],
  days: ["день", "дня", "дней"],
  months: ["месяц", "месяца", "месяцев"],
  years: ["год", "года", "лет"],
};

export function getTimeAgo(stringedTime: string): string {
  const now = Date.now();
  const comparing = Date.parse(stringedTime);

  const difference = getDifferenceInTime(now, comparing);

  for (const [key, value] of Object.entries(difference).reverse()) {
    if (value !== 0) {
      return `${value} ${getNoun(value, translations[key][0], translations[key][1], translations[key][2])} назад`;
    }
  }

  return "";
}
