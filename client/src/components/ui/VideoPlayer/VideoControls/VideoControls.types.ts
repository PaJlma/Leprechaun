import { HTMLAttributes, MouseEventHandler } from "react";

export interface VideoControlsProps extends HTMLAttributes<HTMLDivElement> {
  videoElement: HTMLVideoElement;
  isPlaying: boolean;
  played: number;
  isFullscreen: boolean;
}
