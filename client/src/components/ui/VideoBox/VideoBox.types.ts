import { IPreparedVideo } from "@/types/interfaces/video.interface";
import { LinkProps } from "react-router-dom";

export interface VideoBoxProps extends Omit<LinkProps, "to"> {
  info: IPreparedVideo;
}
