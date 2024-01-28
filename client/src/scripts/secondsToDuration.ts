import { IVideoDuration } from "@/types/interfaces/video.interface";

export function secondsToDuration(s: number): IVideoDuration {
  const hours = Math.floor(s / 60 / 60);
  const minutes = Math.floor(s / 60) - hours * 60;
  const seconds = s % 60;

  return {
    seconds,
    minutes,
    hours,
  };
}
