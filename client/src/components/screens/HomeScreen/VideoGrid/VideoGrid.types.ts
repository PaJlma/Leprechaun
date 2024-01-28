import { IPreparedVideo } from "@/types/interfaces/video.interface";
import { HTMLAttributes } from "react";

export interface VideoGridProps extends HTMLAttributes<HTMLDivElement> {
  videos: IPreparedVideo[];
  perRow: number;
}
