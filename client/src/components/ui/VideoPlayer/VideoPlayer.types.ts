import { IVideoDuration } from "@/types/interfaces/video.interface";
import { HTMLProps } from "react";

export interface VideoPlayerProps extends HTMLProps<HTMLVideoElement> {
  duration: IVideoDuration;
}
