import { IVideoDuration } from "@/types/interfaces/video.interface";

export function videoDurationToString({ hours, minutes, seconds }: IVideoDuration): string {
  const minimalDuration = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  if (hours === 0) {
    return minimalDuration;
  }

  return `${hours}:${minimalDuration}`;
}
