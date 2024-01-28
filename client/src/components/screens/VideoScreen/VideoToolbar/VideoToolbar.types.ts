import { IPreparedVideo } from "@/types/interfaces/video.interface";
import { HTMLAttributes } from "react";

export interface VideoToolbarProps extends HTMLAttributes<HTMLDivElement> {
  info: IPreparedVideo;
}
