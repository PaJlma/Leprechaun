import { IPreparedVideo } from "@/types/interfaces/video.interface";
import { HTMLAttributes } from "react";

export interface VideoInformationProps extends HTMLAttributes<HTMLDivElement> {
  info: IPreparedVideo;
}
